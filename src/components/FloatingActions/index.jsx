import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

export default function FloatingActions({ onOpenChat, onOpenAI }) {
    return (
        <div
            className="
                fixed z-[1000]
                right-3 bottom-3 md:right-6 md:bottom-6
                flex items-end gap-2
            "
        >
            {/* Chat */}
            <button
                onClick={onOpenChat}
                aria-label="Chatni ochish"
                className="
                    cursor-pointer inline-flex items-center justify-center
                    h-12 w-12 md:h-12 md:w-12
                    rounded-full border bg-white/80 dark:bg-zinc-900/80
                    border-zinc-200 dark:border-zinc-700
                    shadow-lg hover:shadow-xl
                    backdrop-blur
                    transition active:scale-[0.98]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:focus-visible:ring-blue-400/30
                "
            >
                <MessageCircle className="h-6 w-6 text-[#2464AE] dark:text-blue-400" />
            </button>

            {/* AI */}
            <button
                onClick={onOpenAI}
                aria-label="AI chatni ochish"
                className="
                    cursor-pointer inline-flex items-center justify-center
                    h-12 w-12 md:h-12 md:w-12
                    rounded-full border bg-white/80 dark:bg-zinc-900/80
                    border-zinc-200 dark:border-zinc-700
                    shadow-lg hover:shadow-xl
                    backdrop-blur
                    transition active:scale-[0.98]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:focus-visible:ring-indigo-400/30
                "
            >
                <Bot className="h-6 w-6 text-[#2464AE] dark:text-indigo-400" />
            </button>
        </div>
    );
}
