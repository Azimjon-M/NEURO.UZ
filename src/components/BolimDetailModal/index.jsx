import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import useSupportChat from '@/hooks/useSupportChat';
import SupportChatAuthModal from '@/components/SupportChatAuthModal';

export default function BolimDetailModal({ open, leader, onClose, onBook }) {
    const src = useMemo(
        () => leader?._raw || leader?._dto || leader || null,
        [leader]
    );
    const L = useMemo(() => src?.i18n?.uz || {}, [src]);

    const person = useMemo(() => {
        if (!src) return null;
        return {
            id: src.id,
            full_name: src.full_name || src.name || L.full_name || L.name || '',
            position: L.position ?? src.position ?? src.role ?? '',
            department: src.department || src.dept || '',
            reception: L.reception ?? src.reception ?? src.schedule ?? '',
            phone: src.phone || '',
            email: src.email || '',
            photo: src.photo_url || src.photo || src.image || '',
            _raw: src,
        };
    }, [src, L]);

    // YANGI HOOK: nomlar o'zgargan
    const {
        sessionId,
        token, // oldingi clientToken -> token
        status,
        messages,
        startChat, // oldingi start -> startChat
        sendMessage, // oldingi send  -> sendMessage
        clearSession,
    } = useSupportChat({ autoResume: false, debug: true });

    const [text, setText] = useState('');
    const [loginOpen, setLoginOpen] = useState(false);
    const listRef = useRef(null);

    // Modal ochilganda eski sessiyani tozalash
    useEffect(() => {
        if (open) {
            try {
                clearSession();
            } catch (err) {
                console.log(err);
            }
            setText('');
        }
    }, [open, clearSession]);

    // Scrollni pastga tushirish
    useEffect(() => {
        try {
            if (open && listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        } catch (err) {
            console.log(err);
        }
    }, [open, messages.length]);

    const handleSend = (e) => {
        e.preventDefault();
        const txt = text.trim();
        if (!txt) return;
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
                // meta: { expert_id: person?.id, expert_name: person?.full_name }
            });
            setLoginOpen(false);
            setTimeout(
                () => document.getElementById('chat-input')?.focus(),
                50
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-700/60 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60 dark:border-slate-700/60">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                        {person?.full_name || ''}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        aria-label="Yopish"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Body: rasm + info + Qabulga yozilish */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-1">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {person?.photo ? (
                                <img
                                    src={person.photo}
                                    alt={person.full_name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full grid place-items-center text-slate-400 dark:text-slate-300">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-12 h-12"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                        <ul className="space-y-2 text-sm leading-relaxed">
                            {person?.full_name && (
                                <li>
                                    <span className="font-semibold">
                                        F.I.O:{' '}
                                    </span>
                                    <span>{person.full_name}</span>
                                </li>
                            )}
                            {person?.position && (
                                <li>
                                    <span className="font-semibold">
                                        Lavozim:{' '}
                                    </span>
                                    <span>{person.position}</span>
                                </li>
                            )}
                            {person?.department && (
                                <li>
                                    <span className="font-semibold">
                                        Bo‘lim:{' '}
                                    </span>
                                    <span>{person.department}</span>
                                </li>
                            )}
                            {person?.reception && (
                                <li>
                                    <span className="font-semibold">
                                        Qabul vaqti:{' '}
                                    </span>
                                    <span>{person.reception}</span>
                                </li>
                            )}
                            {person?.phone && (
                                <li>
                                    <span className="font-semibold">
                                        Telefon:{' '}
                                    </span>
                                    <a
                                        href={`tel:${person.phone.replace(
                                            /\s+/g,
                                            ''
                                        )}`}
                                        className="text-[#2464AE] dark:text-blue-300 hover:underline break-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {person.phone}
                                    </a>
                                </li>
                            )}
                            {person?.email && (
                                <li>
                                    <span className="font-semibold">
                                        Email:{' '}
                                    </span>
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="text-[#2464AE] dark:text-blue-300 hover:underline break-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {person.email}
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => onBook?.(person)}
                                className="px-4 py-2 rounded-xl font-semibold bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2464AE]"
                            >
                                Qabulga yozilish
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat */}
                <div className="px-5 pb-5">
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 overflow-hidden">
                        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-800/60 flex items-center justify-between">
                            <div className="text-sm font-semibold">
                                Yordam chat
                            </div>
                            <div className="text-xs text-slate-500">
                                {status === 'open'
                                    ? '● online'
                                    : status === 'queued'
                                    ? 'navbatda…'
                                    : status}
                            </div>
                        </div>

                        <div
                            className="h-60 md:h-72 overflow-y-auto p-4 space-y-2 bg-white dark:bg-slate-900"
                            ref={listRef}
                        >
                            {sessionId && token ? (
                                messages.length ? (
                                    messages.map((m) => {
                                        const mine = m.sender === 'client';
                                        return (
                                            <div
                                                key={
                                                    m.id ||
                                                    m.created_at + Math.random()
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

                        <form
                            onSubmit={handleSend}
                            className="relative p-3 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-2"
                        >
                            <input
                                id="chat-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                                placeholder="Xabar yozing..."
                                disabled={!(sessionId && token)}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[#2464AE] text-white font-semibold hover:opacity-95 active:opacity-90 transition"
                                disabled={!(sessionId && token)}
                            >
                                Yuborish
                            </button>

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
                </div>

                <div className="px-5 py-4 flex items-center justify-end gap-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-95 transition"
                    >
                        Yopish
                    </button>
                </div>
            </div>

            {/* Alohida modal */}
            <SupportChatAuthModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSubmit={handleLoginSubmit}
            />
        </div>
    );
}
