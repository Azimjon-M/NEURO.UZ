import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';
import Footer from '@/components/Footer';

const PublicRoot = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 !bg-white dark:!bg-slate-900">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicRoot;
