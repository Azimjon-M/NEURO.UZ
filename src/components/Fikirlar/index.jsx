// src/components/Fikirlar.jsx
import { useEffect, useState } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import ApiResult from '@/services/main';
import { Languages } from '@/context/LanguageContext';

/* ---------------- I18N (sarlavha, subtitr, bo'sh holat) ---------------- */
const I18N = {
    uz: {
        heading: 'Bemorlar va yaqinlar fikrlari',
        sub: 'Markazimizdagi tashxis, davolash va parvarish jarayonlari haqida qisqa mulohazalar.',
        empty: "Ma'lumot topilmadi",
        failed: "Ma'lumot yuklanmadi",
        retry: 'Qayta urinish',
    },
    ru: {
        heading: 'Отзывы пациентов и их близких',
        sub: 'Короткие мнения о диагностике, лечении и уходе в нашем центре.',
        empty: 'Данные не найдены',
        failed: 'Не удалось загрузить данные',
        retry: 'Повторить',
    },
    en: {
        heading: 'Patient & family testimonials',
        sub: 'Short impressions about diagnostics, treatment, and care at our center.',
        empty: 'No data found',
        failed: 'Failed to load data',
        retry: 'Retry',
    },
};

/* ---------------- Yordamchi: lokallashtirilgan maydonni olish ---------------- */
function pickLocalized(obj, base, language, fallbacks = ['uz', 'ru', 'en']) {
    const chain = [language, ...fallbacks.filter((l) => l !== language)];
    // 1) Nested: item[lang]?.[base]
    for (const lang of chain) {
        const nested = obj?.[lang]?.[base];
        if (nested) return nested;
    }
    // 2) Flattened: item[`${base}_${lang}`]
    for (const lang of chain) {
        const flat = obj?.[`${base}_${lang}`];
        if (flat) return flat;
    }
    // 3) Generic key
    if (obj?.[base]) return obj[base];
    // 4) Sinonimlar (ayniqsa author uchun)
    if (base === 'author_name') {
        return obj?.full_name || obj?.author || obj?.name || '';
    }
    return '';
}

export default function Fikirlar() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const t = I18N[language] ?? I18N.uz;

    const [data, setData] = useState(null); // null | []
    const [failed, setFailed] = useState(false);

    const getData = async () => {
        try {
            setFailed(false);
            const res = await ApiResult.getComents(); // { count, next, previous, results: [...] }
            setData(res?.results ?? []);
        } catch {
            setFailed(true);
            setData([]);
        } 
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section
            id="testimonials"
            className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
            aria-labelledby="testimonials-title"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2
                    id="testimonials-title"
                    className="text-3xl md:text-4xl font-bold text-center mb-3 text-slate-900 dark:text-slate-100"
                >
                    {t.heading}
                </h2>
                <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
                    {t.sub}
                </p>

                {data?.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((item) => {
                            const author = pickLocalized(
                                item,
                                'author_name',
                                language
                            );
                            const text = pickLocalized(item, 'text', language);

                            return (
                                <article
                                    key={
                                        item.id ?? `${author}-${Math.random()}`
                                    }
                                    className="relative rounded-2xl p-6 bg-white/90 dark:bg-slate-800/70 backdrop-blur
                                        shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60
                                        hover:shadow-lg transition-all duration-200"
                                >
                                    {/* Dekorativ quote belgisi */}
                                    <MessageSquareQuote
                                        className="absolute right-4 top-4 w-6 h-6 text-[#2464AE]/60 dark:text-blue-300/60"
                                        aria-hidden="true"
                                    />

                                    {/* Header: avatar + name */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2464AE] to-blue-400
                                                dark:from-blue-300 dark:to-blue-500
                                                flex items-center justify-center text-white"
                                            aria-hidden="true"
                                        >
                                            <MessageSquareQuote className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">
                                            {author || '—'}
                                        </h3>
                                    </div>

                                    {/* Body: text */}
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {text || '—'}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Empty / Failed */}
                {(!data || data.length === 0) && (
                    <div className="w-full h-[200px] grid place-items-center text-slate-600 dark:text-slate-300">
                        <div className="text-center">
                            <p className="mb-3">
                                {failed ? t.failed : t.empty}
                            </p>
                            <button
                                type="button"
                                onClick={getData}
                                className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm
                                    bg-[#2464AE] text-white hover:bg-[#1f59a0]
                                    dark:bg-blue-600 dark:hover:bg-blue-500
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition"
                            >
                                {t.retry}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
