// src/pages/GalGeneral.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ApiResult from '@/services/galarey';
import { Languages } from '@/context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sizdagi pagination komponenti:
import Pagination from '@/components/Pagination';

export default function GalGeneral() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'

    // ——— Client-side pagination holati ———
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [allItems, setAllItems] = useState([]); // API dan kelgan to‘liq ro‘yxat
    const [loading, setLoading] = useState(false);

    const topRef = useRef(null);

    const UI = {
        uz: {
            pageTitle: 'Umumiy rasimlar',
            empty: "Ma'lumot yuklanmadi",
            noMedia: 'Media yo‘q',
        },
        ru: {
            pageTitle: 'Общие чертежи',
            empty: 'Данные не загружены',
            noMedia: 'Медиа нет',
        },
        en: {
            pageTitle: 'General drawings',
            empty: 'Data not loaded',
            noMedia: 'No media',
        },
    };
    const L = UI[language] || UI.uz;

    // Hisob-kitoblar
    const totalItems = allItems.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

    // Ko‘rinadigan sahifa kesimi
    const { slicedItems, startIndex, endIndex } = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, totalItems);
        return {
            slicedItems: allItems.slice(start, end),
            startIndex: start,
            endIndex: end,
        };
    }, [allItems, page, totalItems]);

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

    // Ma’lumotni olish (faqat bir marta yoki til o‘zgarsa)
    const getData = async () => {
        setLoading(true);
        try {
            const res = await ApiResult.getGalery1();
            // DRF bo‘lsa: {count, results, ...}; oddiy massiv bo‘lsa: []
            const payload = res?.data ?? res;
            const list =
                (payload &&
                    Array.isArray(payload.results) &&
                    payload.results) ||
                (Array.isArray(payload) ? payload : []);

            setAllItems(list);
            // Sahifa diapazondan tashqariga chiqib qolsa tuzatamiz
            const newTotalPages = Math.max(
                1,
                Math.ceil((list?.length || 0) / PAGE_SIZE)
            );
            if (page > newTotalPages) setPage(1);
        } catch (err) {
            console.error('GalGeneral getData error:', err);
            setAllItems([]);
            setPage(1);
        } finally {
            setLoading(false);
            // Sahifa boshiga ohista scroll
            if (topRef.current) {
                setTimeout(
                    () =>
                        topRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        }),
                    0
                );
            }
        }
    };

    // Til o‘zgarsa boshidan
    useEffect(() => {
        setPage(1);
    }, [language]);

    // Dastlabki yuklash (va til o‘zgarganda qayta yuklash)
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    return (
        <section
            ref={topRef}
            className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900 dark:text-slate-100">
                    {L.pageTitle}
                </h2>

                {/* Yuqori ko‘rsatkich (dizaynga tegmadi) */}
                <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                    {totalItems > 0
                        ? `${startIndex + 1}–${endIndex} / ${totalItems}`
                        : L.empty}
                </div>

                {loading ? (
                    <div className="w-full h-[220px] grid place-items-center text-slate-500 dark:text-slate-300">
                        <span className="animate-pulse">Yuklanmoqda...</span>
                    </div>
                ) : slicedItems?.length ? (
                    <>
                        {/* ——— KARTALAR GRID’I (dizayn o‘zgarmagan) ——— */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                            {slicedItems.map((item) => {
                                const t = item[language] || item.uz || {};
                                const media = item.media || [];
                                const hasMany = media.length > 1;

                                return (
                                    <article
                                        key={item.id}
                                        className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 shadow-sm"
                                    >
                                        {/* MEDIA */}
                                        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[420px] 2xl:h-[460px]">
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
                                                        SwiperPagination,
                                                        Navigation,
                                                    ]}
                                                    loop={false}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
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

                                        {/* TEXT */}
                                        <div className="p-6 md:p-8">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                                {t.title || ''}
                                            </h3>
                                            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                                {t.description || ''}
                                            </p>

                                            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                                                {item?.created_at
                                                    ? new Date(
                                                          item.created_at
                                                      ).toLocaleString()
                                                    : ''}
                                            </p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* ——— Pastki pagination (6 tadan ko‘rsatadi) ——— */}
                        <Pagination
                            page={page}
                            setPage={(val) => {
                                // aylanma navigatsiya xulqi (xohlasangiz olib tashlang):
                                if (typeof val === 'function') {
                                    setPage((p) => {
                                        const next = val(p);
                                        if (next < 1) return totalPages;
                                        if (next > totalPages) return 1;
                                        return next;
                                    });
                                } else {
                                    if (val < 1) return setPage(totalPages);
                                    if (val > totalPages) return setPage(1);
                                    setPage(val);
                                }
                            }}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            start={startIndex}
                            end={endIndex}
                        />
                    </>
                ) : (
                    <div className="w-full h-[200px] grid place-items-center text-slate-500 dark:text-slate-300">
                        {L.empty}
                    </div>
                )}
            </div>
        </section>
    );
}
