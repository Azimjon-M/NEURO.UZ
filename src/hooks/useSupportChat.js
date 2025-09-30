// src/hooks/useSupportChat.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupportChatHistory, startSupportChat } from '@/services/support';

const CHAT_PATH = import.meta.env.VITE_WS_CHAT_PATH || '/ws/chat';

function wsBaseSmart() {
    // 1) Agar VITE_WS_BASE bo‘lsa, o‘shani oling
    const env = import.meta.env.VITE_WS_BASE;
    if (env) return env.replace(/\/$/, '');

    // 2) Aks holda VITE_SUPPORT_API’dan hostni ajratib oling va ws/wss ga o‘giring
    const sup = import.meta.env.VITE_SUPPORT_API;
    if (sup) {
        try {
            const u = new URL(sup);
            const proto = u.protocol === 'https:' ? 'wss:' : 'ws:';
            return `${proto}//${u.host}`;
        } catch {
            /* pass */
        }
    }

    // 3) Fallback: sahifa hosti
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${scheme}://${window.location.host}`;
}

export default function useSupportChat({
    autoResume = true,
    reconnect = true,
    maxRetries = 6,
    debug = false,
} = {}) {
    const [sessionId, setSessionId] = useState(null);
    const [token, setToken] = useState(null);
    const [status, setStatus] = useState('idle'); // idle|starting|queued|open|closed|error
    const [assignedAgent, setAssignedAgent] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const wsRef = useRef(null);
    const queueRef = useRef([]);
    const retryRef = useRef(0);
    const timerRef = useRef(null);
    const closedByUserRef = useRef(false);
    const connIdRef = useRef(0);
    const wsBase = wsBaseSmart();
    const wsUrlRef = useRef(null); // backend start() qaytargan websocket_url (agar bo‘lsa)

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    const safeClose = () => {
        try {
            wsRef.current?.close();
        } catch (err) {
            console.log(err);
        }
        wsRef.current = null;
    };
    const flushQueue = () => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        if (!queueRef.current.length) return;
        try {
            for (const payload of queueRef.current) ws.send(payload);
        } catch (e) {
            if (debug) console.log('[WS] flush error:', e);
        }
        queueRef.current = [];
    };

    const connect = useCallback(
        (sid, tkn) => {
            if (!sid || !tkn) return;
            clearTimer();
            safeClose();

            // 1) start() javobida websocket_url kelsa – ana shu bo‘yicha ulanamiz
            let url = wsUrlRef.current;
            if (url) {
                // to‘liq emas ("/ws/chat/...") bo‘lsa, wsBase bilan to‘ldiramiz
                if (!/^wss?:\/\//i.test(url)) {
                    url = `${wsBase}${url.startsWith('/') ? '' : '/'}${url}`;
                }
            } else {
                // 2) Aks holda o‘zimiz yasaymiz
                url = `${wsBase}${CHAT_PATH}/${sid}/?token=${encodeURIComponent(
                    tkn
                )}`;
            }

            if (debug) console.log('[WS] connecting:', url);
            const ws = new WebSocket(url);
            wsRef.current = ws;
            const myConnId = ++connIdRef.current;

            ws.onopen = () => {
                if (connIdRef.current !== myConnId) return;
                if (debug) console.log('[WS] open');
                setConnected(true);
                setStatus('open');
                retryRef.current = 0;
                flushQueue();
            };
            ws.onmessage = (ev) => {
                if (connIdRef.current !== myConnId) return;
                try {
                    const msg = JSON.parse(ev.data);
                    if (msg && typeof msg.text !== 'undefined') {
                        setMessages((prev) => [...prev, msg]);
                    }
                } catch (e) {
                    if (debug) console.log('[WS] parse error:', e);
                }
            };
            ws.onerror = (e) => {
                if (connIdRef.current !== myConnId) return;
                if (debug) console.log('[WS] error:', e);
                setStatus((s) => (s === 'idle' ? 'error' : s));
            };
            ws.onclose = (e) => {
                if (connIdRef.current !== myConnId) return;
                if (debug) console.log('[WS] close:', e.code, e.reason);
                setConnected(false);

                const authRejected = e?.code === 4401;
                if (closedByUserRef.current || authRejected || !reconnect)
                    return;

                if (sessionId && token && retryRef.current < maxRetries) {
                    const attempt = ++retryRef.current;
                    const delay = Math.min(
                        15000,
                        1000 * Math.pow(2, attempt - 1)
                    );
                    if (debug)
                        console.log(
                            `[WS] reconnect in ${delay}ms (try ${attempt}/${maxRetries})`
                        );
                    timerRef.current = setTimeout(
                        () => connect(sessionId, token),
                        delay
                    );
                }
            };
        },
        [wsBase, reconnect, maxRetries, debug, sessionId, token]
    );

    const fetchHistory = useCallback(
        async (sid, tkn) => {
            try {
                const { data } = await getSupportChatHistory(sid, tkn);
                if (data?.status) setStatus(data.status);
                if (data?.assigned_agent !== undefined)
                    setAssignedAgent(data.assigned_agent);
                if (Array.isArray(data?.messages)) setMessages(data.messages);
                else if (Array.isArray(data)) setMessages(data);
            } catch (err) {
                if (debug) console.log('[HTTP] history error:', err);
            }
        },
        [debug]
    );

    useEffect(() => {
        if (!autoResume) return;
        try {
            const sid = sessionStorage.getItem('support_session_id');
            const tkn = sessionStorage.getItem('support_client_token');
            if (sid && tkn) {
                setSessionId(sid);
                setToken(tkn);
                setStatus('queued');
            }
        } catch (e) {
            if (debug) console.log('[resume] error:', e);
        }
    }, [autoResume, debug]);

    useEffect(() => {
        if (!sessionId || !token) return;
        closedByUserRef.current = false;
        fetchHistory(sessionId, token);
        connect(sessionId, token);
        return () => {
            clearTimer();
            safeClose();
        };
    }, [sessionId, token, fetchHistory, connect]);

    const startChat = useCallback(
        async ({ full_name, age, gender, phone }) => {
            setStatus('starting');
            try {
                const { data } = await startSupportChat({
                    full_name,
                    age,
                    gender,
                    phone,
                });
                const sid = data?.session_id || null;
                const tkn = data?.client_token || null;

                setSessionId(sid);
                setToken(tkn);
                setStatus(data?.status || 'queued');
                setAssignedAgent(data?.assigned_agent || null);

                // backenddan kelsa — keyingi connect uchun saqlab qo‘yamiz
                wsUrlRef.current = data?.websocket_url || null;

                try {
                    sessionStorage.setItem('support_session_id', sid || '');
                    sessionStorage.setItem('support_client_token', tkn || '');
                } catch (e) {
                    if (debug) console.log('[start] storage error:', e);
                }

                return data;
            } catch (err) {
                if (debug) console.log('[HTTP] start error:', err);
                setStatus('error');
                throw err;
            }
        },
        [debug]
    );

    const sendMessage = useCallback(
        (text) => {
            const s = (text ?? '').trim();
            if (!s) return;

            const payload = JSON.stringify({ action: 'message', text: s });
            const ws = wsRef.current;

            if (ws && ws.readyState === WebSocket.OPEN) {
                try {
                    ws.send(payload);
                } catch (e) {
                    if (debug) console.log('[WS] send error:', e);
                }
                return;
            }
            queueRef.current.push(payload);
            if (
                !ws ||
                ws.readyState === WebSocket.CLOSING ||
                ws.readyState === WebSocket.CLOSED
            ) {
                if (sessionId && token) connect(sessionId, token);
            }
        },
        [connect, debug, sessionId, token]
    );

    const clearSession = useCallback(() => {
        closedByUserRef.current = true;
        clearTimer();
        safeClose();
        queueRef.current = [];
        wsUrlRef.current = null;
        try {
            sessionStorage.removeItem('support_session_id');
            sessionStorage.removeItem('support_client_token');
        } catch (e) {
            if (debug) console.log('[clear] storage error:', e);
        }
        setSessionId(null);
        setToken(null);
        setAssignedAgent(null);
        setMessages([]);
        setConnected(false);
        setStatus('idle');
        retryRef.current = 0;
    }, [debug]);

    return {
        sessionId,
        token,
        assignedAgent,
        status,
        connected,
        messages,
        startChat,
        sendMessage,
        clearSession,
    };
}
