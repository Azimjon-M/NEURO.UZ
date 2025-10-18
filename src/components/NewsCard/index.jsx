import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Banner from '@/assets/fons/banner.png';

const NewsCard = ({ data, onOpen }) => {
    const media = data?.media || data?._raw?.media || [];
    const hasMany = Array.isArray(media) && media.length > 1;
    const imgFallback = data?.image || '';
    const cardId = data?.id ?? Math.random().toString(36).slice(2);
    const prevCls = `news-prev-${cardId}`;
    const nextCls = `news-next-${cardId}`;

    const renderMedia = (m, alt) =>
        m?.media_type === 'video' ? (
            <video
                key={m.id}
                src={m.file}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
            />
        ) : (
            <img
                key={m.id}
                src={m.file}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover"
            />
        );

    return (
        <div
            className="flex flex-col rounded-3xl overflow-hidden
                bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950
                border border-slate-200/70 dark:border-slate-700/60
                shadow-[0_6px_24px_rgba(2,6,23,.06)] hover:shadow-[0_12px_32px_rgba(2,6,23,.10)] hover:-translate-1
                transition-all duration-300"
        >
            {/* MEDIA: carousel (autoplay yo‘q), indikator pastda markazda, next/prev faqat ikon */}
            <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-slate-100 dark:bg-slate-800 select-none">
                {/* Sana banner */}
                {data.date && (
                    <div className="absolute top-[-1px] left-4 z-20 pointer-events-none">
                        <img
                            src={Banner}
                            alt="banner"
                            className="!w-[80px] !h-[50px]"
                        />
                        <div className="absolute top-[-15px] inset-0 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                                {data.date}
                            </span>
                        </div>
                    </div>
                )}

                {hasMany ? (
                    <>
                        {/* Next/Prev — faqat ikon, fon qoplanmaydi */}
                        <div
                            className={`${prevCls} absolute left-3 top-1/2 -translate-y-1/2 z-20 
                                flex items-center justify-center cursor-pointer`}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white/80 drop-shadow hover:text-white transition" />
                        </div>
                        <div
                            className={`${nextCls} absolute right-3 top-1/2 -translate-y-1/2 z-20 
                                flex items-center justify-center cursor-pointer`}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white/80 drop-shadow hover:text-white transition" />
                        </div>

                        <Swiper
                            modules={[Pagination, Navigation]}
                            loop={false}
                            // AUTOPLAY yo‘q!
                            pagination={{
                                clickable: true,
                                // Swiper default bullets past-centrda, shu yetarli
                            }}
                            navigation={{
                                prevEl: `.${prevCls}`,
                                nextEl: `.${nextCls}`,
                            }}
                            className="w-full h-full"
                        >
                            {media.map((m) => (
                                <SwiperSlide key={m.id} className="!h-full">
                                    <div className="w-full h-full">
                                        {renderMedia(m, data.title || 'news')}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                ) : imgFallback && media.length === 0 ? (
                    <img
                        src={imgFallback}
                        alt={data.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                ) : media.length === 1 ? (
                    <div className="w-full h-full">
                        {renderMedia(media[0], data.title || 'news')}
                    </div>
                ) : (
                    <div className="w-full h-full grid place-items-center">
                        <FaRegNewspaper className="w-16 h-16 text-slate-400" />
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-1">
                <h3
                    className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-3"
                    title={data.title}
                >
                    {data.title}
                </h3>

                <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-300 line-clamp-4 flex-1">
                    {data.description}
                </p>

                {/* Faqat shu link modalni ochadi */}
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onOpen}
                        className="cursor-pointer text-[#2464AE] hover:text-[#1f59a0] dark:text-blue-400 dark:hover:text-blue-300 
                            text-sm font-semibold transition-colors"
                        aria-label="Batafsil"
                    >
                        Batafsil →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
