// src/components/FloatingActions.jsx
import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { subscribeUnread, clearUnread } from '@/utils/SupportBadge';

export default function FloatingActions({ onOpenChat, chatOpen }) {
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        const unsub = subscribeUnread(setHasUnread);
        return () => unsub();
    }, []);

    // Chat ochilganida flagni tozalaymiz
    useEffect(() => {
        if (chatOpen) clearUnread();
    }, [chatOpen]);

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
                onClick={() => {
                    clearUnread(); // tugmani bosganda ham tozalab yuboramiz
                    onOpenChat?.();
                }}
                aria-label="Chatni ochish"
                className="
                    relative
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

                {/* Qizil nuqta (badge) */}
                {hasUnread && (
                    <span
                        className="
                            absolute -top-0.5 -right-0.5
                            h-3 w-3 rounded-full
                            bg-red-500 ring-2 ring-white dark:ring-zinc-900
                            animate-pulse
                            "
                        aria-hidden="true"
                    />
                )}
            </button>
        </div>
    );
}
