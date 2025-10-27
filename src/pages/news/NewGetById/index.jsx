// src/pages/NewsGetById.jsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ApiResult from '@/services/search';
import { Languages } from '@/context/LanguageContext';
import NewsCard from '@/components/NewsCard';
import NewsModal from '@/components/NewsModal';
import { useLocation } from 'react-router';

// UI (statik)
const UI_T = {
    uz: {
        title: 'Yangiliklar',
        desc: 'Markazimizda o‘tkazilgan eng so‘nggi tadbir va yangiliklar bilan tanishing.',
        empty: 'Hozircha yangiliklar yo‘q.',
        loading: 'Yuklanmoqda…',
        error: 'Ma’lumot yuklashda xatolik yuz berdi.',
    },
    ru: {
        title: 'Новости',
        desc: 'Познакомьтесь с последними событиями и новостями нашего центра.',
        empty: 'Пока нет новостей.',
        loading: 'Загрузка…',
        error: 'Произошла ошибка при загрузке данных.',
    },
    en: {
        title: 'News',
        desc: 'Explore the latest events and announcements from our center.',
        empty: 'No news yet.',
        loading: 'Loading…',
        error: 'An error occurred while loading data.',
    },
};

// helpers
const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());
const s = (v) => (typeof v === 'string' ? v.trim() : '');

function fmtDate(anyDate) {
    if (!anyDate) return '';
    const d = new Date(anyDate);
    return isNaN(d.getTime()) ? String(anyDate) : d.toISOString().slice(0, 10);
}

// media: backend allaqachon `media: []` beradi; baribir normalize qilib qo'yamiz
function normalizeMedia(item) {
    const raw = Array.isArray(item.media) ? item.media : [];
    return raw
        .map((m, i) => {
            const file = m.file || m.url || m.image || m.src || '';
            const media_type =
                (m.media_type || m.type) === 'video'
                    ? 'video'
                    : /\.(mp4|webm|ogg)(\?|$)/i.test(file)
                    ? 'video'
                    : 'image';
            return file
                ? { id: m.id ?? `${i}-${file}`, media_type, file }
                : null;
        })
        .filter(Boolean);
}

// API obyektini NewsCard formatiga o‘tkazamiz
function toCard(item, lang) {
    // siz bergan schema:
    // { id, titles:{uz,ru,en}, descriptions:{uz,ru,en}, title, description, posted_at, media:[] ... }
    const title =
        s(item.titles?.[lang]) ||
        s(item.titles?.uz) ||
        s(item.titles?.ru) ||
        s(item.titles?.en) ||
        s(item.title);

    const description =
        s(item.descriptions?.[lang]) ||
        s(item.descriptions?.uz) ||
        s(item.descriptions?.ru) ||
        s(item.descriptions?.en) ||
        s(item.description);

    const media = normalizeMedia(item);

    return {
        id: item.id,
        title,
        description,
        date: fmtDate(item.posted_at || item.created_at || item.updated_at),
        image: s(item.image || item.cover || item.thumbnail || ''), // yo‘q bo‘lsa NewsCard placeholder ko‘rsatadi
        media,
        _raw: item,
    };
}

export default function NewsGetById() {
    const location = useLocation();
    const idFromSlice = location.pathname.slice(13, -1);
    const newsId = idFromSlice || location.pathname.match(/(\d+)/)?.[1] || '';

    const { language } = Languages();
    const lang = normalizeLang(language);
    const L = useMemo(() => UI_T[lang] ?? UI_T.uz, [lang]);

    const [items, setItems] = useState([]); // NewsCard’lar uchun tayyor massiv
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const [modal, setModal] = useState({ open: false, item: null });

    const getData = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await ApiResult.getByIdNews(newsId);
            // GetById ko‘pincha bitta obyekt beradi — massivga o‘tkazamiz
            const list = Array.isArray(res) ? res : res && res.id ? [res] : [];
            const normalized = list.map((it) => toCard(it, lang));
            setItems(normalized);
        } catch (e) {
            console.error(e);
            setErr(e);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [newsId, lang]);

    useEffect(() => {
        getData();
    }, [getData]);

    const openModal = (item) => setModal({ open: true, item: item._raw });
    const closeModal = () => setModal({ open: false, item: null });

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {L.title}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {L.desc}
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        {L.loading}
                    </div>
                )}

                {/* Error */}
                {!loading && err && (
                    <div className="rounded-2xl border border-red-200 dark:border-red-800 p-6 text-center text-red-600 dark:text-red-400">
                        {L.error}
                    </div>
                )}

                {/* Content */}
                {!loading &&
                    !err &&
                    (items.length ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <NewsCard
                                    key={item.id}
                                    data={item}
                                    onOpen={() => openModal(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                            {L.empty}
                        </div>
                    ))}
            </div>

            {/* Modal */}
            <NewsModal
                open={modal.open}
                data={modal.item}
                onClose={closeModal}
            />
        </section>
    );
}
