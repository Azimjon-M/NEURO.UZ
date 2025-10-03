import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import FloatingActions from '@/components/FloatingActions';
import ChatWidget from '@/components/ChatWidget';
import AiAssistantWidget from '@/components/AiAssistantWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Root() {
    const [isChatOpen, setChatOpen] = useState(false);
    const [isAiOpen, setAiOpen] = useState(false);

    // Bitta funksiya: chatni toggle qilish
    const handleToggleChat = () => {
        if (!isChatOpen) {
            // agar chat ochilmasa -> AI ni yopamiz
            setAiOpen(false);
            setChatOpen(true);
        } else {
            // agar ochiq bo‘lsa -> yopamiz
            setChatOpen(false);
        }
    };

    // Bitta funksiya: AI ni toggle qilish
    const handleToggleAI = () => {
        if (!isAiOpen) {
            // agar AI ochilmasa -> Chatni yopamiz
            setChatOpen(false);
            setAiOpen(true);
        } else {
            // agar ochiq bo‘lsa -> yopamiz
            setAiOpen(false);
        }
    };

    // AI panel pozitsiyasi (agar chat ochiq bo‘lsa biroz suriladi)
    const aiPanelStyle = isChatOpen ? 'sm:right-[28rem]' : '';

    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />

            {/* Global floating actions */}
            <FloatingActions
                onOpenChat={handleToggleChat}
                onOpenAI={handleToggleAI}
            />

            {/* Chat panel */}
            <ChatWidget
                open={isChatOpen}
                onClose={() => setChatOpen(false)}
                title="Chat"
            />

            {/* AI panel */}
            <div className={aiPanelStyle}>
                <AiAssistantWidget
                    open={isAiOpen}
                    onClose={() => setAiOpen(false)}
                    title="Robot (AI)"
                />
            </div>
        </div>
    );
}
