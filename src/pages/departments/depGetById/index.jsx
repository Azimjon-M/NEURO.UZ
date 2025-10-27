// src/pages/DeptLeaders.jsx  (GetByIdDepartment sahifasi)
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import BolimDetailModal from '@/components/BolimDetailModal';
import BolimCard from '@/components/BolimCard';
import ApiResult from '@/services/search';
import { Languages } from '@/context/LanguageContext'; // { language: 'uz'|'ru'|'un' }

// ================= I18N (UI matnlari) =================
const UI_T = {
    uz: {
        title: 'Bo‘lim mutaxassislari',
        desc: 'Ushbu sahifada tanlangan bo‘limga tegishli shifokor va xodimlar ro‘yxati keltirilgan.',
        empty: 'Hozircha mutaxassislar joylanmagan.',
        error: 'Ma’lumotni yuklashda xatolik yuz berdi.',
        loading: 'Yuklanmoqda…',
        back: 'Barcha bo‘limlar',
    },
    ru: {
        title: 'Специалисты подразделения',
        desc: 'На этой странице представлен список врачей и сотрудников выбранного подразделения.',
        empty: 'Пока нет специалистов.',
        error: 'Произошла ошибка при загрузке данных.',
        loading: 'Загрузка…',
        back: 'Все подразделения',
    },
    en: {
        title: 'Department Specialists',
        desc: 'This page lists doctors and staff belonging to the selected department.',
        empty: 'No specialists published yet.',
        error: 'An error occurred while loading data.',
        loading: 'Loading…',
        back: 'All departments',
    },
};

// "un" → "en"
const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());

// Lang-aware getter with fallbacks: uz → ru → en
function pickLang(block, lang) {
    if (!block || typeof block !== 'object') return null;
    return block[lang] ?? block.uz ?? block.ru ?? block.en ?? null;
}

// Safe string
const s = (v) => (typeof v === 'string' ? v.trim() : '');

// Convert a single API item (specialist) to Card-friendly shape
function toCard(item, lang) {
    const loc = pickLang(item, lang) || {};
    const deptLoc = pickLang(item.department, lang) || {};

    // Asosiy matnlar
    const name =
        s(loc.full_name) ||
        s((item.uz || {}).full_name) ||
        s((item.ru || {}).full_name) ||
        s((item.en || {}).full_name);

    const position =
        s(loc.position) ||
        s((item.uz || {}).position) ||
        s((item.ru || {}).position) ||
        s((item.en || {}).position);

    const reception =
        s(loc.reception) ||
        s((item.uz || {}).reception) ||
        s((item.ru || {}).reception) ||
        s((item.en || {}).reception);

    // Card boshqa sahifalarda role/clinicDays nomlari bilan ishlaydi.
    // Shu yerda UCHALASINI ham beramiz (backward compatible).
    const role = position; // alias
    const clinicDays = reception; // alias

    return {
        id: item.id,
        name,
        // aliaslar + asl nomlar (Card qaysi birini o‘qisa ham ishlaydi)
        role,
        clinicDays,
        position, // qolsin
        reception, // qolsin
        photo: s(item.photo_url || item.photo),
        departmentName:
            s(deptLoc.name) ||
            s(((item.department || {}).uz || {}).name) ||
            s(((item.department || {}).ru || {}).name) ||
            s(((item.department || {}).en || {}).name),
        departmentSlug: s((item.department || {}).slug),
        order: Number.isFinite(item.order) ? item.order : 0,
        _raw: item,
    };
}

// Normalize any API response to array of cards + optional department meta
function normalizeResponse(res, lang) {
    let list = [];
    let deptMeta = null;

    if (!res) return { cards: [], deptMeta };

    if (Array.isArray(res)) {
        list = res;
    } else if (Array.isArray(res.results)) {
        list = res.results;
    } else if (Array.isArray(res.specialists)) {
        list = res.specialists;
        const loc = pickLang(res, lang) || {};
        deptMeta = {
            id: res.id,
            slug: res.slug,
            name:
                s(loc.name) ||
                s((res.uz || {}).name) ||
                s((res.ru || {}).name) ||
                s((res.en || {}).name),
        };
    } else if (
        typeof res === 'object' &&
        res.id &&
        (res.uz || res.ru || res.en)
    ) {
        list = [res];
    }

    const cards = list.map((it) => toCard(it, lang));
    cards.sort((a, b) =>
        a.order !== b.order
            ? a.order - b.order
            : a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    return { cards, deptMeta };
}

export default function GetByIdDepartment() {
    const location = useLocation();
    const idFromSlice = location.pathname.slice(13, -1);
    const deptId = idFromSlice || location.pathname.match(/(\d+)/)?.[1] || '';

    const { language } = Languages(); // 'uz' | 'ru' | 'un'
    const lang = normalizeLang(language);
    const t = useMemo(() => UI_T[lang] ?? UI_T.uz, [lang]);

    const [items, setItems] = useState([]); // Cardga tayyor list
    const [dept, setDept] = useState(null); // Department nomi/slug (agar kelsa)
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const [detail, setDetail] = useState({ open: false, leader: null });

    const getData = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            // DEPARTMENT endpointdan o‘qing:
            const res = await ApiResult.getByIdSpecial(deptId);
            const { cards, deptMeta } = normalizeResponse(res, lang);
            setItems(cards);
            setDept(deptMeta);
        } catch (e) {
            console.error('Error fetching department data:', e);
            setErr(e);
            setItems([]);
            setDept(null);
        } finally {
            setLoading(false);
        }
    }, [deptId, lang]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleBook = (leader) => {
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

    const heading = dept?.name || t.title;
    const subDesc = dept?.slug ? `${t.desc}` : t.desc;

    return (
        <section className="flex-1 py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {heading}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {subDesc}
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 animate-pulse">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Error */}
                {!loading && err && (
                    <div className="rounded-2xl border border-red-200 dark:border-red-800 p-6 text-center text-red-600 dark:text-red-400">
                        {t.error}
                    </div>
                )}

                {/* Content */}
                {!loading &&
                    !err &&
                    (items.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch">
                            {items.map((leader) => (
                                <BolimCard
                                    key={leader.id}
                                    leader={leader}
                                    onOpen={(l) =>
                                        setDetail({ open: true, leader: l })
                                    }
                                    onBook={handleBook}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                            {t.empty}
                        </div>
                    ))}
            </div>

            {/* Modal */}
            <BolimDetailModal
                open={detail.open}
                data={detail.leader?._raw || detail.leader || null}
                onClose={() => setDetail({ open: false, leader: null })}
            />
        </section>
    );
}
