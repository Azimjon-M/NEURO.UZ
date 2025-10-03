import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import useSupportChat from '@/hooks/useSupportChat';
import SupportChatAuthModal from '@/components/SupportChatAuthModal';

export default function ChatPanel({
    open,
    onClose,
    title = 'Yordam chat',
    expert, // ixtiyoriy: chat meta uchun (masalan, { id, full_name })
}) {
    // useSupportChat — sizdagi hook (autoResume default: true)
    const { sessionId, token, status, messages, startChat, sendMessage } =
        useSupportChat({ debug: true });

    const [text, setText] = useState('');
    const [loginOpen, setLoginOpen] = useState(false);
    const listRef = useRef(null);

    // Scroll oxiriga
    useEffect(() => {
        try {
            if (open && listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        } catch (err) {
            console.log(err);
        }
    }, [open, messages.length]);

    const onlineText = useMemo(() => {
        if (status === 'open') return '● online';
        if (status === 'queued') return 'navbatda…';
        return status || '—';
    }, [status]);

    const handleSend = (e) => {
        e?.preventDefault?.();
        const txt = text.trim();
        if (!txt) return;

        // Agar sessiya yo‘q bo‘lsa — avval kirish modalini ochamiz
        if (!(sessionId && token)) {
            setLoginOpen(true);
            return;
        }
        try {
            sendMessage(txt);
            setText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleLoginSubmit = async (form) => {
        try {
            await startChat({
                full_name: form.full_name,
                age: form.age ? Number(form.age) : null,
                gender: form.gender,
                phone: form.phone,
                // ixtiyoriy meta:
                ...(expert
                    ? {
                          meta: {
                              expert_id: expert.id,
                              expert_name: expert.full_name,
                          },
                      }
                    : {}),
            });
            setLoginOpen(false);
            setTimeout(
                () => document.getElementById('global-chat-input')?.focus(),
                60
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (!open) return null;

    return (
        <>
            <div
                className="fixed bottom-24 right-4 z-[1000] w-[92vw] max-w-md h-[70vh] sm:h-[64vh] bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60 shadow-xl rounded-2xl overflow-hidden flex flex-col"
                role="dialog"
                aria-label={title}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-12 border-b border-slate-200/70 dark:border-slate-700/60">
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {onlineText}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Yopish"
                        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Messages */}
                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-slate-900"
                >
                    {sessionId && token ? (
                        messages.length ? (
                            messages.map((m) => {
                                const mine = m.sender === 'client';
                                return (
                                    <div
                                        key={
                                            m.id || m.created_at + Math.random()
                                        }
                                        className={`flex ${
                                            mine
                                                ? 'justify-end'
                                                : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                                mine
                                                    ? 'bg-[#2464AE] text-white rounded-br-sm'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                                            }`}
                                        >
                                            <div>{m.text}</div>
                                            <div
                                                className={`mt-1 text-[10px] opacity-70 ${
                                                    mine
                                                        ? 'text-white'
                                                        : 'text-slate-500 dark:text-slate-400'
                                                }`}
                                            >
                                                {new Date(
                                                    m.created_at
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                Hozircha xabar yo‘q
                            </div>
                        )
                    ) : (
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                            Chat sessiyasi hali boshlanmagan.
                        </div>
                    )}
                </div>

                {/* Input */}
                <form
                    onSubmit={handleSend}
                    className="relative p-3 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-2"
                >
                    <input
                        id="global-chat-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Xabar yozing..."
                        className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                        disabled={!(sessionId && token)}
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[#2464AE] text-white font-semibold hover:opacity-95 active:opacity-90 transition disabled:opacity-60"
                        disabled={!(sessionId && token)}
                    >
                        <Send className="w-5 h-5" />
                        <span className="hidden sm:inline">Yuborish</span>
                    </button>

                    {/* Overlay — avval kirish */}
                    {!(sessionId && token) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm">
                            <div className="text-sm text-slate-700 dark:text-slate-200">
                                Chatda yozish uchun{' '}
                                <button
                                    type="button"
                                    className="text-[#2464AE] dark:text-blue-300 underline font-semibold"
                                    onClick={() => setLoginOpen(true)}
                                >
                                    Chatni boshlang
                                </button>
                                .
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Kirish / Chatni boshlash — Sizdagi modalni qayta ishlatyapmiz */}
            <SupportChatAuthModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSubmit={handleLoginSubmit}
            />
        </>
    );
}
