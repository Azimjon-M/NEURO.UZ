import React, { useEffect, useState, useMemo } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import ApiResult from '@/services/main';
import { Languages } from '@/context/LanguageContext';
import {
    Activity,
    Stethoscope,
    Building2,
    Microscope,
    FileText,
    Users,
} from 'lucide-react';

/* 1) Backend key -> Icon xaritasi */
const iconMap = {
    operations: Activity,
    doctors: Stethoscope,
    departments: Building2,
    lab_studies: Microscope,
    lab_researches: Microscope,
    laboratory: Microscope,
    publications: FileText,
    articles: FileText,
    patients: Users,
};

/* 2) Saralash yordamchisi */
const sortByOrderThenId = (a, b) => {
    const ao = Number.isFinite(a?.order) ? a.order : 9999;
    const bo = Number.isFinite(b?.order) ? b.order : 9999;
    if (ao !== bo) return ao - bo;
    return (a?.id || 0) - (b?.id || 0);
};

/* 3) API javobidan massivni xavfsiz ajratib olish */
function extractMetrics(res) {
    if (Array.isArray(res)) return res;
    if (res?.data) {
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res.data.results)) return res.data.results;
    }
    return [];
}

/* 4) View elementga Icon komponentini biriktirish */
function toViewItems(raw) {
    const arr = extractMetrics(raw);
    return arr.sort(sortByOrderThenId).map((item) => {
        const Icon = iconMap[item?.key] || Users;
        return { ...item, _Icon: Icon };
    });
}

/* 6) Bitta karta (animatsiya bilan) */
function StatCard({ item, lang, duration = 4 }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '-10% 0px',
    });
    const Icon = item._Icon || Users;
    const endValue = Number(item?.value ?? 0);

    // Faqat yakuniy qiymat 1000+ bo‘lsa k+; aks holda oddiy
    const formatFn = (val) => {
        if (endValue < 1000) return Math.floor(val).toString();
        if (val < 1000) return Math.floor(val).toString();
        const k = Math.floor(val / 1000);
        return `${k}k+`;
    };

    return (
        <div
            ref={ref}
            className="group rounded-2xl p-6 bg-white/90 dark:bg-slate-800/70 backdrop-blur
                 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60
                 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-center"
        >
            <div className="mb-3 flex justify-center">
                <Icon className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
            </div>

            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {inView ? (
                    <CountUp
                        start={0}
                        end={endValue}
                        duration={duration}
                        formattingFn={formatFn}
                    />
                ) : (
                    '0'
                )}
            </p>

            <p className="mt-1 text-sm md:text-base text-slate-600 dark:text-slate-300">
                {item?.[lang]?.label ||
                    item?.uz?.label ||
                    item?.en?.label ||
                    item?.ru?.label ||
                    ''}
            </p>
        </div>
    );
}

/* 7) Asosiy komponent */
export default function Statistics() {
    const { language } = Languages();
    const lang = (language || 'uz').toLowerCase();

    const [viewItems, setViewItems] = useState([]);
    const [error, setError] = useState('');

    const getData = async () => {
        try {
            const res = await ApiResult.getMetrics();
            const converted = toViewItems(res.results || []);
            setViewItems(converted);

            if (!converted.length) {
                console.warn(
                    '[Statistics] metrics bo‘sh keldi yoki format noma’lum:',
                    res
                );
            }
        } catch (err) {
            console.error('[Statistics] metrics xatosi:', err);
            setError("Ma'lumotlarni yuklab bo'lmadi.");
            setViewItems([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Grid
    const gridCls = useMemo(
        () =>
            'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8',
        []
    );

    return (
        <section
            id="statistics"
            className="py-12 md:py-16 bg-white dark:bg-slate-900 select-none bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-slate-900 dark:text-slate-100">
                    {lang === 'ru'
                        ? 'Показатели центра'
                        : lang === 'en'
                        ? 'Center metrics'
                        : 'Markaz ko‘rsatkichlari'}
                </h2>

                {!!error && (
                    <div className="mb-6 text-center text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {viewItems.length > 0 ? (
                    <div className={`${gridCls} text-center`}>
                        {viewItems.map((item, idx) => (
                            <StatCard
                                key={item.key ?? item.id ?? idx}
                                item={item}
                                lang={lang}
                            />
                        ))}
                    </div>
                ) : (
                    // EMPTY STATE: API bo'sh kelsa ham UX bo'sh qolmasin
                    <div className="text-center text-slate-500 dark:text-slate-400">
                        Hozircha ko‘rsatkichlar mavjud emas.
                    </div>
                )}
            </div>
        </section>
    );
}
