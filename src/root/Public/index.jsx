// src/layouts/Root.jsx (yoki sizdagi joy)
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import FloatingActions from '@/components/FloatingActions';
import ChatWidget from '@/components/ChatWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Root() {
    const [isChatOpen, setChatOpen] = useState(false);

    const handleToggleChat = () => {
        if (!isChatOpen) {
            setChatOpen(true);
        } else {
            setChatOpen(false);
        }
    };


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
                chatOpen={isChatOpen} // <<— YANGI
            />

            {/* Chat panel */}
            <ChatWidget
                open={isChatOpen}
                onClose={() => setChatOpen(false)}
                title="Chat"
            />
        </div>
    );
}
