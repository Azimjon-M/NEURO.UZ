// src/pages/GalCongress3.jsx
import React, { useEffect, useState } from 'react';
import ApiResult from '@/services/galarey';
import { Languages } from '@/context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalCentralAsiaCongress() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const [data, setData] = useState(null);

    const UI = {
        uz: {
            pageTitle:
                'Markaziy osiyo xalqaro kongressi va 7 jahon mini-invaziv neyroxirurglar kongressi',
            empty: "Ma'lumot yuklanmadi",
            noMedia: 'Media yo‘q',
        },
        ru: {
            pageTitle:
                'Центральноазиатский международный конгресс и 7-й Всемирный конгресс по малоинвазивной нейрохирургии',
            empty: 'Данные не загружены',
            noMedia: 'Медиа нет',
        },
        en: {
            pageTitle:
                'Central Asian International Congress and 7th World Congress of Minimally Invasive Neurosurgery',
            empty: 'Data not loaded',
            noMedia: 'No media',
        },
    };
    const L = UI[language] || UI.uz;

    const getData = async () => {
        try {
            const res = await ApiResult.getGalery4();
            setData(res?.results || []);
        } catch {
            setData([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const renderMedia = (m, alt) =>
        m.is_video ? (
            <video
                key={m.id}
                src={m.url}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
            />
        ) : (
            <img
                key={m.id}
                src={m.url}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover"
            />
        );

    return (
        <section className="py-12 md:py-16 bg-white  dark:bg-[#1D232A]">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900 dark:text-slate-100">
                    {L.pageTitle}
                </h2>
                {data?.length ? (
                    // >>> KARTALAR GRID'I: 1 / 2 (>=lg) / 3 (>=2xl)
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                        {data.map((item) => {
                            const t = item[language] || item.uz || {};
                            const media = item.media || [];
                            const hasMany = media.length > 1;

                            return (
                                <article
                                    key={item.id}
                                    className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 shadow-sm"
                                >
                                    {/* MEDIA: katta, qirrali (rounded yo‘q), AUTOPLAY yo‘q */}
                                    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[420px] 2xl:h-[460px]">
                                        {/* Prev/Next faqat ko‘p media bo‘lsa */}
                                        {hasMany && (
                                            <>
                                                <button
                                                    className={`prev-${item.id} cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10
                                                        inline-flex items-center justify-center p-2 md:p-3
                                                        bg-white/85 dark:bg-slate-900/70 backdrop-blur
                                                        ring-1 ring-slate-200 dark:ring-slate-700
                                                        hover:bg-white dark:hover:bg-slate-900 transition`}
                                                    aria-label="Previous"
                                                >
                                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-700 dark:text-slate-200" />
                                                </button>
                                                <button
                                                    className={`next-${item.id} cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10
                                                        inline-flex items-center justify-center p-2 md:p-3
                                                        bg-white/85 dark:bg-slate-900/70 backdrop-blur
                                                        ring-1 ring-slate-200 dark:ring-slate-700
                                                        hover:bg-white dark:hover:bg-slate-900 transition`}
                                                    aria-label="Next"
                                                >
                                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-700 dark:text-slate-200" />
                                                </button>
                                            </>
                                        )}

                                        {hasMany ? (
                                            <Swiper
                                                modules={[
                                                    Pagination,
                                                    Navigation,
                                                ]}
                                                loop={false} // AUTOPLAY yo‘q
                                                pagination={{ clickable: true }}
                                                navigation={{
                                                    prevEl: `.prev-${item.id}`,
                                                    nextEl: `.next-${item.id}`,
                                                }}
                                                className="w-full h-full"
                                            >
                                                {media.map((m) => (
                                                    <SwiperSlide
                                                        key={m.id}
                                                        className="!h-full"
                                                    >
                                                        <div className="w-full h-full">
                                                            {renderMedia(
                                                                m,
                                                                t.title ||
                                                                    'gallery'
                                                            )}
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        ) : media.length === 1 ? (
                                            <div className="w-full h-full">
                                                {renderMedia(
                                                    media[0],
                                                    t.title || 'gallery'
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full h-full grid place-items-center text-slate-400 dark:text-slate-300">
                                                {L.noMedia}
                                            </div>
                                        )}
                                    </div>

                                    {/* TEXT: bitta ustun, katta tipografika */}
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                            {t.title || ''}
                                        </h3>
                                        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {t.description || ''}
                                        </p>

                                        <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full h-[200px] grid place-items-center text-slate-500 dark:text-slate-300">
                        {L.empty}
                    </div>
                )}
            </div>
        </section>
    );
}
