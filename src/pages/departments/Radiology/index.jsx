// src/pages/DeptLeaders.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BolimDetailModal from '@/components/BolimDetailModal';
import BolimCard from '@/components/BolimCard';
import Pagination from '@/components/Pagination';
import ApiResult from '@/services/bolimlar';
import { Languages } from '@/context/LanguageContext'; // 'uz' | 'ru' | 'un'

// ================= I18N (UI matnlari) =================
const UI_T = {
    uz: {
        title: "Rentgen bo'limi",
        desc: 'Bosh miya, orqa miya va asab tizimi kasalliklarini aniqlashda qo‘llaniladigan rentgen, KT va MRT kabi tasviriy diagnostika usullarini amalga oshiruvchi mutaxassislar ro‘yxati.',
        empty: "Hozircha ma'lumot yo‘q.",
    },
    ru: {
        title: 'Рентгеновское отделение',
        desc: 'Список специалистов, выполняющих рентгенографию, КТ и МРТ для диагностики заболеваний головного и спинного мозга, а также нервной системы.',
        empty: 'Пока нет данных.',
    },
    en: {
        title: 'Radiology Department',
        desc: 'List of specialists performing X-ray, CT, and MRI imaging for diagnosing brain, spinal, and nervous system disorders.',
        empty: 'No data yet.',
    },
};

// "un" → "en"
const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());

// Matn boshidagi [UZ]/[RU]/[EN] yoki UZ:/RU:/EN- markerlarini tozalash
const stripLangTag = (val) => {
    if (typeof val !== 'string') return '';
    let s = val.trim();
    s = s.replace(/^\s*\[(?:uz|ru|en)\]\s*/i, '');
    s = s.replace(/^\s*(?:UZ|RU|EN)\s*[:\-–]\s*/i, '');
    return s;
};

// Nested ko‘p-tilli maydondan (obj.[lang].[field]) xavfsiz olish
const pickField = (obj, lang, field) => {
    if (!obj) return '';
    const seq = [
        obj?.[lang]?.[field],
        obj?.uz?.[field],
        obj?.en?.[field],
        obj?.ru?.[field],
    ];
    const v = seq.find((x) => typeof x === 'string' && x.trim().length > 0);
    return stripLangTag(v || '');
};

export default function DeptRadiology() {
    const { language } = Languages(); // 'uz' | 'ru' | 'un'
    const lang = normalizeLang(language);
    const t = useMemo(() => UI_T[lang] ?? UI_T.uz, [lang]);

    const [data, setData] = useState(null);

    const getData = useCallback(async () => {
        try {
            const res = await ApiResult.getRentgen(); // DRF paginated object bo‘lishi mumkin
            const payload = res?.data ?? res; // axios bo‘lsa .data; aks holda to‘g‘ridan
            const results = payload?.results ?? payload ?? [];

            // BolimCard dizayniga moslab normalize:
            // { id, photo, name, role, clinicDays, departmentName, _raw }
            const mapped = results.map((it) => ({
                id: it.id,
                photo: it.photo_url || '',
                name: pickField(it, lang, 'full_name'),
                role: pickField(it, lang, 'position'),
                clinicDays: pickField(it, lang, 'reception'),
                departmentName: pickField(it?.department, lang, 'name'),
                _raw: it, // Modal uchun
            }));

            setData(mapped);
        } catch (error) {
            console.error('Error fetching leaders data:', error);
            setData([]);
        }
    }, [lang]);

    useEffect(() => {
        getData();
    }, [getData]);

    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [detail, setDetail] = useState({ open: false, leader: null });

    const totalPages = Math.max(1, Math.ceil((data?.length || 0) / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, data?.length || 0);
    const currentLeaders = (data || []).slice(start, end);

    const handleBook = (leader) => {
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {t.title}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {t.desc}
                    </p>
                </div>

                {currentLeaders?.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch">
                        {currentLeaders.map((l) => (
                            <BolimCard
                                key={l.id}
                                leader={l}
                                onOpen={(leader) =>
                                    setDetail({ open: true, leader })
                                }
                                onBook={handleBook}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        {t.empty}
                    </div>
                )}

                {/* Pagination — o'zgartirmadim */}
                {data?.length > 0 && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        totalItems={data?.length || 0}
                        start={start}
                        end={end}
                    />
                )}
            </div>

            {/* Modal: unga RAW obyekt kerak bo‘lsa, _raw ni beramiz */}
            <BolimDetailModal
                open={detail.open}
                data={detail.leader?._raw || detail.leader || null}
                onClose={() => setDetail({ open: false, leader: null })}
            />
        </section>
    );
}
