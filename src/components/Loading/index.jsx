import React from 'react';
import { useLoading } from '@/hooks/useLoading';

export default function Loading() {
    const { isLoading, message } = useLoading();
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-2xl w-[min(90vw,420px)]">
                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-800 animate-spin" />
                <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">
                        Yuklanmoqda…
                    </p>
                    {message ? (
                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
