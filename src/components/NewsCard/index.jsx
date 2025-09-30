// src/components/NewsCard.jsx
import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import Banner from '@/assets/fons/banner.png';

const NewsCard = ({ news }) => {
    return (
        <div
            className="flex flex-col rounded-3xl overflow-hidden
                bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950
                border border-slate-200/70 dark:border-slate-700/60
                shadow-[0_6px_24px_rgba(2,6,23,.06)] hover:shadow-[0_12px_32px_rgba(2,6,23,.10)] hover:-translate-1
                transition-all duration-300"
        >
            {/* Rasm qismi */}
            <div className="relative h-[220px] md:h-[260px] overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                {news.image ? (
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105 z-0"
                        loading="lazy"
                    />
                ) : (
                    <FaRegNewspaper className="w-16 h-16 text-slate-400 z-0" />
                )}

                {/* Sana banner */}
                {news.date && (
                    <div className="absolute top-[-1px] left-4 z-10">
                        {/* Banner rasmi */}
                        <img
                            src={Banner}
                            alt="banner"
                            className="!w-[80px] !h-[50px]"
                        />
                        {/* Sana matni */}
                        <div className="absolute top-[-15px] inset-0 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                                {news.date}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Kontent qismi */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-3">
                    {news.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-300 line-clamp-4 flex-1">
                    {news.description}
                </p>

                {/* Link pastda o‘ng burchakda */}
                <div className="mt-4 flex justify-end">
                    <a
                        href={`/yangiliklar/${news.id}`}
                        className="text-[#2464AE] hover:text-[#1f59a0] dark:text-blue-400 dark:hover:text-blue-300 
                            text-sm font-semibold transition-colors"
                    >
                        Batafsil →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
