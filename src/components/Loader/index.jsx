import { useEffect, useState } from 'react';
import Logo from '@/assets/logo/newLogo.png';

export default function Loader() {
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setDotCount((c) => (c % 3) + 1);
        }, 450);
        return () => clearInterval(id);
    }, []);

    const dots = '.'.repeat(dotCount);

    return (
        <div className="fixed inset-0 z-[99999] select-none flex items-center justify-center bg-[#EFF6FF] dark:bg-[#0F172C]">
            <div className="flex flex-col items-center">
                <div className="w-[100px] sm:w-[120px]">
                    <img
                        className="w-full h-auto animate-fadePulse"
                        src={Logo}
                        alt="Loadeing..."
                        draggable={false}
                    />
                </div>
                <div className="mt-2 text-[#2464AE] text-sm sm:text-base font-medium">
                    Loading{dots}
                </div>
            </div>

            <style>{`
                @keyframes fadePulse {
                0%   { opacity: 1; }
                100% { opacity: 0.5; }
                }
                .animate-fadePulse {
                animation: fadePulse 1.2s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    );
}
