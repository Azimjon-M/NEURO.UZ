import React, { useRef, useEffect, useState } from 'react';
import { X, Send, Bot } from 'lucide-react';

export default function AiAssistantWidget({
    open,
    onClose,
    title = 'Robot (AI)',
}) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            text: 'Salom! Savolingizni yozing, imkon qadar yordam beraman.',
        },
    ]);
    const [prompt, setPrompt] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        if (open && endRef.current)
            endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [open, messages]);

    if (!open) return null;

    const ask = () => {
        const t = prompt.trim();
        if (!t) return;
        const userMsg = { id: Date.now(), role: 'user', text: t };
        const mockReply = {
            id: Date.now() + 1,
            role: 'assistant',
            text:
                'Bu front-end demo. Backend ulanmagani uchun javob mock tarzida qaytmoqda. ' +
                'Keyinroq API chaqirishni shu joyga qo‘shasiz.',
        };
        setMessages((prev) => [...prev, userMsg, mockReply]);
        setPrompt('');
    };

    return (
        <div
            role="dialog"
            aria-label={title}
            className="
                fixed z-[1000]
                right-3 md:right-6
                bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-[calc(7rem+env(safe-area-inset-bottom))]
                w-[96vw] max-w-md
                h-[70vh] sm:h-[64vh]
                rounded-2xl overflow-hidden
                border bg-white dark:bg-zinc-900
                border-zinc-200 dark:border-zinc-800
                shadow-xl
                flex flex-col
            "
        >
            {/* Header */}
            <div
                className="
                    flex items-center justify-between h-12 px-4
                    border-b border-zinc-200 dark:border-zinc-800
                    bg-white/70 dark:bg-zinc-900/70 backdrop-blur
                "
            >
                <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    {title}
                </div>
                <button
                    onClick={onClose}
                    aria-label="Yopish"
                    className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                    <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/70 dark:bg-zinc-950/40">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={[
                            'max-w-[85%] px-3 py-2 rounded-2xl',
                            m.role === 'user'
                                ? 'ml-auto bg-indigo-600 text-white rounded-br-md'
                                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-md',
                        ].join(' ')}
                    >
                        {m.text}
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {/* Prompt */}
            <div
                className="
                    p-3 border-t border-zinc-200 dark:border-zinc-800
                    bg-white/70 dark:bg-zinc-900/70 backdrop-blur
                "
            >
                <div className="flex items-center gap-2">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && ask()}
                        placeholder="Savolingizni yozing..."
                        className="
                            flex-1 h-11 rounded-xl
                            border border-zinc-300 dark:border-zinc-700
                            bg-white dark:bg-zinc-900
                            text-zinc-900 dark:text-zinc-100
                            placeholder-zinc-400 dark:placeholder-zinc-500
                            px-3 outline-none
                            focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/25
                        "
                    />
                    <button
                        onClick={ask}
                        className="
                            h-11 px-4 rounded-xl
                            bg-indigo-600 hover:bg-indigo-700
                            text-white transition active:scale-[0.98]
                            inline-flex items-center gap-2
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40
                        "
                    >
                        <Send className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-medium">
                            Yuborish
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
