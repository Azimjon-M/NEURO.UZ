// src/pages/GalGeneral.jsx  → GalGetById (single item, no pagination)
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ApiResult from '@/services/search';
import { Languages } from '@/context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';

export default function GalGetById() {
    const location = useLocation();
    const idFromSlice = location.pathname.slice(13, -1);
    const galId = idFromSlice || location.pathname.match(/(\d+)/)?.[1] || '';

    const { language } = Languages(); // 'uz' | 'ru' | 'en' | 'un'
    const lang = (language === 'un' ? 'en' : language || 'uz').toLowerCase();

    const [item, setItem] = useState(null); // bitta galereya elementi
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const topRef = useRef(null);

    const UI = {
        uz: {
            pageTitle: 'Galereya',
            empty: "Ma'lumot topilmadi",
            noMedia: 'Media yo‘q',
            loading: 'Yuklanmoqda…',
            error: 'Ma’lumot yuklashda xatolik yuz berdi.',
        },
        ru: {
            pageTitle: 'Галерея',
            empty: 'Данные не найдены',
            noMedia: 'Медиа нет',
            loading: 'Загрузка…',
            error: 'Произошла ошибка при загрузке данных.',
        },
        en: {
            pageTitle: 'Gallery',
            empty: 'No data found',
            noMedia: 'No media',
            loading: 'Loading…',
            error: 'An error occurred while loading data.',
        },
    };
    const L = UI[lang] || UI.uz;

    // === Helpers ===
    const s = (v) => (typeof v === 'string' ? v.trim() : '');

    const fmtDateTime = (anyDate) => {
        if (!anyDate) return '';
        const d = new Date(anyDate);
        return isNaN(d.getTime()) ? String(anyDate) : d.toLocaleString();
    };

    // Server media → { id, is_video, url }
    const normalizeMedia = (raw) => {
        if (!Array.isArray(raw)) return [];
        return raw
            .map((m, i) => {
                const file = m?.file || m?.url || m?.image || m?.src || '';
                if (!file) return null;
                let isVideo;
                if (typeof m?.is_video === 'boolean') {
                    isVideo = m.is_video;
                } else {
                    const t = (m?.media_type || m?.type || '')
                        .toString()
                        .toLowerCase();
                    isVideo = t
                        ? t === 'video'
                        : /\.(mp4|webm|ogg)(\?|$)/i.test(file);
                }
                return {
                    id: m?.id ?? `${i}-${file}`,
                    is_video: !!isVideo,
                    url: file,
                };
            })
            .filter(Boolean);
    };

    // 🔧 YANGILANGAN: ikkita schema’ni ham ko‘taradi:
    // A) titles/descriptions + B) uz/ru/en obyektlari
    const toViewModel = useCallback(
        (res) => {
            // A-sxema
            const titleA =
                s(res?.titles?.[lang]) ||
                s(res?.titles?.uz) ||
                s(res?.titles?.ru) ||
                s(res?.titles?.en) ||
                '';

            const descA =
                s(res?.descriptions?.[lang]) ||
                s(res?.descriptions?.uz) ||
                s(res?.descriptions?.ru) ||
                s(res?.descriptions?.en) ||
                '';

            // B-sxema (siz bergan networking res)
            const titleB =
                s(res?.[lang]?.title) ||
                s(res?.uz?.title) ||
                s(res?.ru?.title) ||
                s(res?.en?.title) ||
                '';
            const descB =
                s(res?.[lang]?.description) ||
                s(res?.uz?.description) ||
                s(res?.ru?.description) ||
                s(res?.en?.description) ||
                '';

            const title =
                titleA ||
                titleB ||
                s(res?.title) ||
                s(String(res?.category || '')) ||
                '—';
            let description = descA || descB || s(res?.description);

            if (!description) {
                const t = title || '';
                description = t.length > 180 ? t.slice(0, 177) + '…' : t || '—';
            }

            const media = normalizeMedia(res?.media);

            return {
                id: res?.id,
                title,
                description,
                media,
                created_at: res?.created_at,
                posted_at: res?.posted_at,
                _raw: res,
            };
        },
        [lang]
    );

    const getData = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await ApiResult.getByIdGallery(galId);
            const vm = res && res.id ? toViewModel(res) : null;
            setItem(vm);
        } catch (e) {
            console.error('GalGetById error:', e);
            setErr(e);
            setItem(null);
        } finally {
            setLoading(false);
        }
    }, [galId, toViewModel]);

    useEffect(() => {
        getData();
    }, [getData]);

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

    const hasMany = (item?.media?.length || 0) > 1;

    return (
        <section
            ref={topRef}
            className="py-12 md:py-16 bg-white  dark:bg-[#1D232A]"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900 dark:text-slate-100">
                    {L.pageTitle}
                </h2>

                {loading && (
                    <div className="w-full h-[220px] grid place-items-center text-slate-500 dark:text-slate-300">
                        <span className="animate-pulse">{L.loading}</span>
                    </div>
                )}

                {!loading && err && (
                    <div className="w-full grid place-items-center text-red-600 dark:text-red-400">
                        {L.error}
                    </div>
                )}

                {!loading && !err && !item && (
                    <div className="w-full h-[200px] grid place-items-center text-slate-500 dark:text-slate-300">
                        {L.empty}
                    </div>
                )}

                {!loading && !err && item && (
                    <article className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 shadow-sm rounded-2xl overflow-hidden">
                        {/* MEDIA */}
                        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[420px] 2xl:h-[460px]">
                            {hasMany && (
                                <>
                                    <button
                                        className={`prev-${item.id} cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center p-2 md:p-3 bg-white/85 dark:bg-slate-900/70 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-white dark:hover:bg-slate-900 transition`}
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-700 dark:text-slate-200" />
                                    </button>
                                    <button
                                        className={`next-${item.id} cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center p-2 md:p-3 bg-white/85 dark:bg-slate-900/70 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-white dark:hover:bg-slate-900 transition`}
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-700 dark:text-slate-200" />
                                    </button>
                                </>
                            )}

                            {hasMany ? (
                                <Swiper
                                    modules={[SwiperPagination, Navigation]}
                                    loop={false}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        prevEl: `.prev-${item.id}`,
                                        nextEl: `.next-${item.id}`,
                                    }}
                                    className="w-full h-full"
                                >
                                    {item.media.map((m) => (
                                        <SwiperSlide
                                            key={m.id}
                                            className="!h-full"
                                        >
                                            <div className="w-full h-full">
                                                {renderMedia(
                                                    m,
                                                    item.title || 'gallery'
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : item.media.length === 1 ? (
                                <div className="w-full h-full">
                                    {renderMedia(
                                        item.media[0],
                                        item.title || 'gallery'
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
                                {item.title || ''}
                            </h3>
                            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                {item.description || ''}
                            </p>
                            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                                {item.posted_at
                                    ? fmtDateTime(item.posted_at)
                                    : item.created_at
                                    ? fmtDateTime(item.created_at)
                                    : ''}
                            </p>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
