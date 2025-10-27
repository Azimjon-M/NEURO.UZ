// src/pages/AboutCenter.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
    BsBuilding,
    BsHospital,
    BsAward,
    BsPeople,
    BsClockHistory,
    BsShieldCheck,
    BsCheck2Circle,
} from 'react-icons/bs';
import ApiResult from '@/services/main';
import { Languages } from '@/context/LanguageContext';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CONTAINER =
    'w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4';
const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };

/* --------- I18N --------- */
const T = {
    uz: {
        badge: 'Markaz haqida',
        heroTitle: 'Respublika Neyroxirurgiya Markazi haqida',
        heroLead:
            'Biz neyroxirurgiyaning barcha yo‘nalishlari bo‘yicha zamonaviy diagnostika, davolash va reabilitatsiya xizmatlarini ko‘rsatamiz. Mutaxassislar jamoasi, ilg‘or texnologiyalar va bemor markazli yondashuv — asosiy ustunligimiz.',
        statsFallback: {
            departments: 'Bo‘limlar',
            specialists: 'Mutaxassislar',
            opsPerYear: 'Yiliga operatsiyalar',
            labStudies: 'Laboratoriya tadqiqotlari',
        },
        tlTitle: 'Markaz tarixi',
        tlSub: 'Rivojlanish bosqichlari: tashkil topgan kundan bugungacha.',
        whyUs: 'Nega aynan biz?',
        benefits: [
            'Zamonaviy MRI/KT va intraoperatsion navigatsiya',
            'Tajribali, sertifikatlangan shifokorlar jamoasi',
            'Minimal invaziv va mikronazoratli operatsiyalar',
            'Kompleks reabilitatsiya va kuzatuv dasturlari',
            'Hamyonbop narx va shaffof jarayon',
            'Xalqaro hamkorlik va tajriba almashinuvi',
        ],
        timeline: [
            {
                year: '1941–1945',
                title: 'NII Travmatologiya qoshida 20 o‘rinli neyroxirurgiya bo‘limi ochildi',
            },
            {
                year: '1970',
                title: '1-Toshkent davlat tibbiyot institutida Neyroxirurgiya kafedrasi tashkil etildi',
            },
            { year: '1982', title: 'Baza 200 o‘ringa kengaytirildi' },
            {
                year: '1986',
                title: 'Birinchi KT apparatlaridan biri o‘rnatildi (CRT-1010)',
            },
            {
                year: '1993',
                title: 'Klinika SSV tarkibida ixtisoslashgan neyroxirurgiya maqomini oldi',
            },
            {
                year: '1997',
                title: 'VMning 583-sonli qarori bilan hozirgi nom berildi',
            },
            {
                year: '1998',
                title: 'O‘zbekiston Neyroxirurglar Assotsiatsiyasi tashkil etildi',
            },
            { year: '2018', title: 'Markaz nomi yangilandi' },
            {
                year: 'Hozir',
                title: 'Zamonaviy texnologiyalar va xalqaro hamkorlik bosqichi',
            },
        ],
    },
    ru: {
        badge: 'О центре',
        heroTitle: 'О Республиканском центре нейрохирургии',
        heroLead:
            'Мы оказываем современные услуги по диагностике, лечению и реабилитации по всем направлениям нейрохирургии.',
        statsFallback: {
            departments: 'Отделения',
            specialists: 'Специалисты',
            opsPerYear: 'Операций в год',
            labStudies: 'Лабораторные исследования',
        },
        tlTitle: 'История центра',
        tlSub: 'Этапы развития: от основания до наших дней.',
        whyUs: 'Почему мы?',
        benefits: [
            'Современные МРТ/КТ и навигация',
            'Опытные сертифицированные врачи',
            'Минимально инвазивные операции',
            'Комплексная реабилитация',
            'Доступная стоимость',
            'Международное сотрудничество',
        ],
        timeline: [
            {
                year: '1941–1945',
                title: 'Во время ВОВ открыт отдел на 20 коек',
            },
            { year: '1970', title: 'Создана кафедра нейрохирургии' },
            { year: '1982', title: 'Расширение базы до 200 коек' },
            { year: '1986', title: 'Установлен первый КТ (CRT-1010)' },
            {
                year: '1993',
                title: 'Получен статус специализированной клиники',
            },
            { year: '1997', title: 'Присвоено название Республиканский центр' },
            { year: '1998', title: 'Создана Ассоциация нейрохирургов' },
            { year: '2018', title: 'Переименование центра' },
            { year: 'Сегодня', title: 'Новые технологии и сотрудничество' },
        ],
    },
    en: {
        badge: 'About the Center',
        heroTitle: 'About the Republican Neurosurgery Center',
        heroLead:
            'We provide modern diagnostics, treatment, and rehabilitation across all neurosurgical disciplines.',
        statsFallback: {
            departments: 'Departments',
            specialists: 'Specialists',
            opsPerYear: 'Operations per year',
            labStudies: 'Laboratory studies',
        },
        tlTitle: 'Center history',
        tlSub: 'Milestones: from founding to today.',
        whyUs: 'Why choose us?',
        benefits: [
            'Modern MRI/CT and navigation',
            'Experienced, certified doctors',
            'Minimally invasive surgery',
            'Comprehensive rehabilitation',
            'Affordable and transparent care',
            'International cooperation',
        ],
        timeline: [
            { year: '1941–1945', title: '20-bed neurosurgery unit opened' },
            { year: '1970', title: 'Department of Neurosurgery established' },
            { year: '1982', title: 'Expanded to 200 beds' },
            { year: '1986', title: 'First CT scanner installed' },
            { year: '1993', title: 'Received specialized clinic status' },
            { year: '1997', title: 'Renamed to Republican Center' },
            { year: '1998', title: 'Neurosurgeons Association founded' },
            { year: '2018', title: 'Renamed to current title' },
            { year: 'Today', title: 'Advanced tech and global partnerships' },
        ],
    },
};

/* --------- ICONS --------- */
const METRIC_ICONS = {
    operations: <BsAward />,
    doctors: <BsPeople />,
    departments: <BsHospital />,
    lab_studies: <BsClockHistory />,
    articles: <BsAward />,
    patients: <BsPeople />,
};

export default function AboutCenter() {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await ApiResult.getMetrics();
                const arr = Array.isArray(res) ? res : res?.data || [];
                const sorted = [...arr].sort(
                    (a, b) =>
                        (a?.order ?? Number.MAX_SAFE_INTEGER) -
                        (b?.order ?? Number.MAX_SAFE_INTEGER)
                );
                setMetrics(sorted);
            } catch {
                setMetrics([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const topFour = useMemo(() => (metrics || []).slice(0, 4), [metrics]);
    const pickLabel = (m) =>
        m?.[language]?.label ||
        m?.uz?.label ||
        m?.en?.label ||
        m?.ru?.label ||
        '';
    const pickValue = (m) => Number(m?.value || 0);

    return (
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute -top-24 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 bg-[#2464AE] dark:bg-blue-600 pointer-events-none" />
                <div className={`${CONTAINER} py-12 md:py-16`}>
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                            <BsBuilding className="inline-block" /> {t.badge}
                        </span>
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
                            {t.heroTitle}
                        </h1>
                        <p className="mt-3 md:mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
                            {t.heroLead}
                        </p>
                    </div>
                </div>
            </section>

            {/* STATS (animated) */}
            <section className="py-8 md:py-10">
                <div className={CONTAINER}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                        {loading &&
                            [0, 1, 2, 3].map((i) => (
                                <StatCardSkeleton key={i} />
                            ))}

                        {!loading &&
                            topFour.map((m) => (
                                <AnimatedStatCard
                                    key={m.id || m.key}
                                    icon={METRIC_ICONS[m.key] || <BsAward />}
                                    end={pickValue(m)}
                                    label={pickLabel(m)}
                                    duration={4}
                                />
                            ))}

                        {!loading && topFour.length === 0 && (
                            <>
                                <AnimatedStatCard
                                    icon={<BsHospital />}
                                    end={14}
                                    label={t.statsFallback.departments}
                                    duration={4}
                                />
                                <AnimatedStatCard
                                    icon={<BsPeople />}
                                    end={120}
                                    label={t.statsFallback.specialists}
                                    duration={4}
                                />
                                <AnimatedStatCard
                                    icon={<BsAward />}
                                    end={2300}
                                    label={t.statsFallback.opsPerYear}
                                    duration={4}
                                />
                                <AnimatedStatCard
                                    icon={<BsClockHistory />}
                                    end={25000}
                                    label={t.statsFallback.labStudies}
                                    duration={4}
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* TARIX */}
            <section className="py-8 md:py-12">
                <div className={CONTAINER}>
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {t.tlTitle}
                                </h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    {t.tlSub}
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <ol className="relative border-s border-slate-200 dark:border-slate-700 pl-6 space-y-6">
                                {t.timeline.map((it) => (
                                    <TimelineItem key={it.year} {...it} />
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* AFZALLIKLAR */}
            <section className="py-8 md:py-12">
                <div className={CONTAINER}>
                    <div className="rounded-2xl p-6 md:p-8 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                                <BsShieldCheck />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {t.whyUs}
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t.benefits.map((txt, i) => (
                                <Benefit key={i} text={txt} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ------- Kichik bo'laklar ------- */

function AnimatedStatCard({ icon, end, label, duration = 4 }) {
    const { ref, inView } = useInView({ triggerOnce: true });
    return (
        <div
            ref={ref}
            className="rounded-2xl h-full p-4 md:p-5 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur flex items-center gap-3"
        >
            <div className="p-2.5 rounded-xl bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                {React.cloneElement(icon, { className: 'text-xl' })}
            </div>
            <div>
                <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {inView ? (
                        <CountUp
                            start={0}
                            end={end}
                            duration={duration}
                            separator=" "
                        />
                    ) : (
                        '0'
                    )}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                    {label}
                </div>
            </div>
        </div>
    );
}

function StatCardSkeleton() {
    return (
        <div className="rounded-2xl h-full p-4 md:p-5 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur flex items-center gap-3 animate-pulse">
            <div className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 w-9 h-9" />
            <div className="flex-1">
                <div className="h-5 w-24 md:w-32 bg-slate-200 dark:bg-slate-700 rounded-md mb-2" />
                <div className="h-3 w-28 md:w-36 bg-slate-200 dark:bg-slate-700 rounded-md" />
            </div>
        </div>
    );
}

function Benefit({ text }) {
    return (
        <div className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/80 dark:bg-slate-800/60">
            <div className="mt-0.5 text-[#2464AE] dark:text-blue-300">
                <BsCheck2Circle />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">{text}</p>
        </div>
    );
}

function TimelineItem({ year, title }) {
    return (
        <li className="relative">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#2464AE] dark:bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
            <div className="ml-2 pl-4 py-1 rounded-lg bg-white/70 dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="text-sm font-semibold text-[#2464AE] dark:text-blue-300">
                    {year}
                </div>
                <div className="text-slate-800 dark:text-slate-100 font-medium">
                    {title}
                </div>
            </div>
        </li>
    );
}
