// src/hooks/useSupportChat.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupportChatHistory, startSupportChat } from '@/services/support';

const CHAT_PATH = import.meta.env.VITE_WS_CHAT_PATH || '/ws/chat';

// Storage kalitlari
const K_SID = 'support_session_id';
const K_TKN = 'support_client_token';
const K_URL = 'support_websocket_url';

// localStorage / sessionStorage safe getterlari
const getLS = () => {
    try {
        return window.localStorage;
    } catch {
        return null;
    }
};
const getSS = () => {
    try {
        return window.sessionStorage;
    } catch {
        return null;
    }
};

// WS bazasini topish (VITE_WS_BASE > VITE_SUPPORT_API host > window.location)
function wsBaseSmart() {
    const env = import.meta.env.VITE_WS_BASE;
    if (env) return env.replace(/\/$/, '');
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
    const wsUrlRef = useRef(null); // backend start() qaytargan websocket_url (optional)

    // --- helpers ---
    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const safeClose = useCallback(() => {
        try {
            wsRef.current?.close();
        } catch (err) {
            if (debug) console.log(err);
        }
        wsRef.current = null;
    }, [debug]);

    const flushQueue = useCallback(() => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        if (!queueRef.current.length) return;
        try {
            for (const payload of queueRef.current) ws.send(payload);
        } catch (e) {
            if (debug) console.log('[WS] flush error:', e);
        }
        queueRef.current = [];
    }, [debug]);

    const connect = useCallback(
        (sid, tkn) => {
            if (!sid || !tkn) return;
            clearTimer();
            safeClose();

            let url = wsUrlRef.current;
            if (url) {
                if (!/^wss?:\/\//i.test(url)) {
                    url = `${wsBase}${url.startsWith('/') ? '' : '/'}${url}`;
                }
            } else {
                url = `${wsBase}${CHAT_PATH}/${sid}/?token=${encodeURIComponent(
                    tkn
                )}`;
            }

            const ws = new WebSocket(url);
            wsRef.current = ws;
            const myConnId = ++connIdRef.current;

            ws.onopen = () => {
                if (connIdRef.current !== myConnId) return;
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
        [
            wsBase,
            reconnect,
            maxRetries,
            debug,
            sessionId,
            token,
            clearTimer,
            safeClose,
            flushQueue,
        ]
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

    // === CHANGES: mark ===
    // LS -> hook state sync helper (bir xil kodni qayta yozmaslik uchun)
    const syncFromStorage = useCallback(() => {
        try {
            const L = getLS();
            const sid = L?.getItem(K_SID) || null;
            const tkn = L?.getItem(K_TKN) || null;
            const wsu = L?.getItem(K_URL) || null;

            // Hech narsa o‘zgarmagan bo‘lsa qaytamiz
            if (sid === sessionId && tkn === token) return false;

            // Sessiya bor — statega qo‘yamiz
            if (sid && tkn) {
                setSessionId(sid);
                setToken(tkn);
                if (wsu) wsUrlRef.current = wsu;
                setStatus((s) => (s === 'idle' ? 'queued' : s));
                return true;
            }

            // LS tozalangan bo‘lsa — state ham tozalansin
            if (!sid || !tkn) {
                closedByUserRef.current = true;
                clearTimer();
                safeClose();
                queueRef.current = [];
                wsUrlRef.current = null;
                setSessionId(null);
                setToken(null);
                setAssignedAgent(null);
                setMessages([]);
                setConnected(false);
                setStatus('idle');
                retryRef.current = 0;
                return true;
            }
        } catch (e) {
            if (debug) console.log('[syncFromStorage] error:', e);
        }
        return false;
    }, [sessionId, token, clearTimer, safeClose, debug]);

    // === CHANGES: public resume() — komponent xohlasa o‘zi chaqira oladi
    const resume = useCallback(
        (payload) => {
            if (payload?.id && payload?.token) {
                // Parametr bilan majburan tiklash
                setSessionId(payload.id);
                setToken(payload.token);
                if (payload.websocket_url)
                    wsUrlRef.current = payload.websocket_url;
                setStatus((s) => (s === 'idle' ? 'queued' : s));
                return true;
            }
            return syncFromStorage();
        },
        [syncFromStorage]
    );

    // --- AUTO RESUME + sessionStorage -> localStorage migratsiyasi ---
    useEffect(() => {
        if (!autoResume) return;
        try {
            const L = getLS();
            let sid = L?.getItem(K_SID);
            let tkn = L?.getItem(K_TKN);
            let wsu = L?.getItem(K_URL);

            if (!sid || !tkn) {
                const S = getSS();
                const ssSid = S?.getItem(K_SID);
                const ssTkn = S?.getItem(K_TKN);
                const ssUrl = S?.getItem(K_URL);
                if (ssSid && ssTkn) {
                    L?.setItem(K_SID, ssSid);
                    L?.setItem(K_TKN, ssTkn);
                    if (ssUrl) L?.setItem(K_URL, ssUrl);
                    S?.removeItem(K_SID);
                    S?.removeItem(K_TKN);
                    S?.removeItem(K_URL);
                    sid = ssSid;
                    tkn = ssTkn;
                    wsu = ssUrl || null;
                }
            }

            if (sid && tkn) {
                setSessionId(sid);
                setToken(tkn);
                if (wsu) wsUrlRef.current = wsu;
                setStatus('queued');
            }
        } catch (e) {
            if (debug) console.log('[resume] error:', e);
        }
    }, [autoResume, debug]);

    // Sessiya paydo bo'lganda — tarix + WS
    useEffect(() => {
        if (!sessionId || !token) return;
        closedByUserRef.current = false;
        fetchHistory(sessionId, token);
        connect(sessionId, token);
        return () => {
            clearTimer();
            safeClose();
        };
    }, [sessionId, token, fetchHistory, connect, clearTimer, safeClose]);

    // === CHANGES: storage + custom event tinglovchilari
    useEffect(() => {
        const onStorage = (e) => {
            if (!e) return;
            if (e.key === K_SID || e.key === K_TKN || e.key === K_URL) {
                // if (debug) console.log('[storage] change:', e.key);
                // const changed = syncFromStorage();
                // changed true bo‘lsa connect/history effektlari o‘zlari ishlaydi
                void syncFromStorage();
            }
        };
        const onCustom = () => {
            if (debug) console.log('[event] support:session_changed');
            syncFromStorage();
        };
        window.addEventListener('storage', onStorage);
        window.addEventListener('support:session_changed', onCustom);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('support:session_changed', onCustom);
        };
    }, [syncFromStorage, debug]);

    // Start chat (HTTP) — natijani localStorage'ga yozamiz
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

                wsUrlRef.current = data?.websocket_url || null;

                try {
                    const L = getLS();
                    L?.setItem(K_SID, sid || '');
                    L?.setItem(K_TKN, tkn || '');
                    if (wsUrlRef.current) L?.setItem(K_URL, wsUrlRef.current);
                } catch (e) {
                    if (debug) console.log('[start] storage error:', e);
                }

                // === CHANGES: shu tabda ham sinxron bo‘lishi uchun custom event
                try {
                    window.dispatchEvent(new Event('support:session_changed'));
                } catch (err) {
                    console.log(err);
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

    // Xabar yuborish
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

    // Tozalash (faqat siz chaqirsangiz)
    const clearSession = useCallback(() => {
        closedByUserRef.current = true;
        clearTimer();
        safeClose();
        queueRef.current = [];
        wsUrlRef.current = null;
        try {
            const L = getLS();
            L?.removeItem(K_SID);
            L?.removeItem(K_TKN);
            L?.removeItem(K_URL);
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

        // === CHANGES: shu tabga ham signal
        try {
            window.dispatchEvent(new Event('support:session_changed'));
        } catch (err) {
            console.log(err);
        }
    }, [debug, clearTimer, safeClose]);

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
        // === CHANGES: tashqariga beramiz
        resume,
    };
}
