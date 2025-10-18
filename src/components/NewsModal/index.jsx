// src/components/NewsModal/index.js
import React, { useEffect, useMemo, useRef } from 'react';
import { Languages } from '@/context/LanguageContext';
import {
    X,
    CalendarDays,
    Eye,
    Hash,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function NewsModal({ open, data, onClose }) {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const lang = (language || 'uz').toLowerCase();
    const dialogRef = useRef(null);

    // UI matnlar
    const UI = {
        uz: {
            details: 'Batafsil',
            posted: 'E’lon qilingan',
            views: 'Ko‘rishlar',
            tags: 'Teglar',
            noMedia: 'Media yo‘q',
            close: 'Yopish',
        },
        ru: {
            details: 'Подробнее',
            posted: 'Опубликовано',
            views: 'Просмотры',
            tags: 'Теги',
            noMedia: 'Нет медиа',
            close: 'Закрыть',
        },
        en: {
            details: 'Details',
            posted: 'Posted',
            views: 'Views',
            tags: 'Tags',
            noMedia: 'No media',
            close: 'Close',
        },
    };
    const L = UI[lang] || UI.uz;

    // Body scroll lock + ESC yopish
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    const t = useMemo(() => {
        if (!data) return { title: '', desc: '' };
        return {
            title:
                data?.titles?.[lang] ||
                data?.title ||
                data?.titles?.uz ||
                data?.titles?.en ||
                data?.titles?.ru ||
                '',
            desc:
                data?.descriptions?.[lang] ||
                data?.description ||
                data?.descriptions?.uz ||
                data?.descriptions?.en ||
                data?.descriptions?.ru ||
                '',
        };
    }, [data, lang]);

    const media = data?.media || [];
    const hasMany = media.length > 1;

    const prevCls = `news-prev-${data?.id ?? 'x'}`;
    const nextCls = `news-next-${data?.id ?? 'x'}`;

    const renderMedia = (m, alt) =>
        m.media_type === 'video' ? (
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

    if (!open) return null;

    return (
        <div
            aria-modal="true"
            role="dialog"
            ref={dialogRef}
            className="fixed inset-0 z-[100]"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full w-full max-w-[1200px] mx-auto py-8 px-4">
                    <div className="bg-white rounded-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {t.title}
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label={L.close}
                                className="
                                    cursor-pointer inline-flex items-center justify-center
                                    w-10 h-10 rounded-sm
                                    bg-red-600 text-white
                                    shadow-sm shadow-red-600/20
                                    hover:bg-red-700 hover:shadow-md hover:shadow-red-700/25
                                    active:bg-red-800 active:scale-[0.98]
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                    transition
                                    dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700
                                    dark:focus:ring-red-400 dark:focus:ring-offset-slate-900
                                "
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                            {/* Media */}
                            <div className="lg:col-span-3 relative">
                                <div className="w-full h-[320px] sm:h-[420px] lg:h-[560px] relative">
                                    {hasMany && (
                                        <>
                                            {/* Icon-only prev/next (fonni to‘smaydi) */}
                                            <div
                                                className={`${prevCls} absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer`}
                                                aria-label="Previous"
                                            >
                                                <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white/80 drop-shadow hover:text-white transition" />
                                            </div>
                                            <div
                                                className={`${nextCls} absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer`}
                                                aria-label="Next"
                                            >
                                                <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white/80 drop-shadow hover:text-white transition" />
                                            </div>
                                        </>
                                    )}

                                    {hasMany ? (
                                        <Swiper
                                            modules={[Pagination, Navigation]}
                                            loop={false} // AUTOPLAY yo‘q
                                            pagination={{ clickable: true }} // indikatorlar past, markazda
                                            navigation={{
                                                prevEl: `.${prevCls}`,
                                                nextEl: `.${nextCls}`,
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
                                                            t.title || 'news'
                                                        )}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : media.length === 1 ? (
                                        <div className="w-full h-full">
                                            {renderMedia(
                                                media[0],
                                                t.title || 'news'
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full grid place-items-center text-slate-400 dark:text-slate-300 text-sm">
                                            {L.noMedia}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar details */}
                            <aside className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-5 md:p-6">
                                <div className="space-y-4 text-sm md:text-base">
                                    {/* Posted at */}
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-0.5" />
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400">
                                                {L.posted}
                                            </div>
                                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                                {data?.posted_at
                                                    ? new Date(
                                                          data.posted_at
                                                      ).toLocaleString()
                                                    : data?.created_at
                                                    ? new Date(
                                                          data.created_at
                                                      ).toLocaleString()
                                                    : '—'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Views */}
                                    <div className="flex items-start gap-3">
                                        <Eye className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-0.5" />
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400">
                                                {L.views}
                                            </div>
                                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                                {typeof data?.views === 'number'
                                                    ? data.views
                                                    : 0}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-start gap-3">
                                        <Hash className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-0.5" />
                                        <div className="grow">
                                            <div className="text-slate-500 dark:text-slate-400">
                                                {L.tags}
                                            </div>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {(data?.hashtags || [])
                                                    .length ? (
                                                    data.hashtags.map((h) => {
                                                        const nm =
                                                            h?.names?.[lang] ||
                                                            h?.name ||
                                                            h?.names?.uz ||
                                                            h?.names?.en ||
                                                            h?.names?.ru ||
                                                            '';
                                                        return (
                                                            <span
                                                                key={h.id}
                                                                className="inline-flex items-center rounded border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs md:text-sm text-slate-700 dark:text-slate-200"
                                                            >
                                                                #{nm}
                                                            </span>
                                                        );
                                                    })
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500">
                                                        —
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-6">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                        {L.details}
                                    </h4>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {t.desc || '—'}
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
