// src/components/Xizmatlar.jsx
import React from 'react';
import {
    BsHospital,
    BsClockHistory,
    BsHeartPulse,
    BsPeople,
    BsCalendarCheck,
} from 'react-icons/bs';
import { RiMicroscopeLine } from 'react-icons/ri';
import { Languages } from '@/context/LanguageContext';

/* ---------------- Ikonalar ---------------- */
const ICONS = [
    <BsHospital className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
    <RiMicroscopeLine className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
    <BsHeartPulse className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
    <BsPeople className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
    <BsClockHistory className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
    <BsCalendarCheck className="text-[#2464AE] dark:text-blue-300 text-2xl" />,
];

/* ---------------- I18N matnlar ---------------- */
const TEXT = {
    uz: {
        heading: 'Xizmatlar',
        sub: 'Markazimiz taklif qiladigan asosiy yo‘nalishlar',
        items: [
            {
                title: 'Qabul va konsultatsiya',
                desc: 'Tajribali mutaxassislar ko‘rigi va individual maslahat.',
            },
            {
                title: 'Diagnostika',
                desc: 'MRI/KT, laboratoriya va boshqa tekshiruvlar.',
            },
            {
                title: 'Jarrohlik amaliyotlari',
                desc: 'Zamonaviy usullar asosida neyroxirurgik operatsiyalar.',
            },
            {
                title: 'Reabilitatsiya',
                desc: 'Fizioterapiya va tiklanish dasturlari.',
            },
            {
                title: 'Shoshilinch yordam',
                desc: 'Favqulodda holatlar uchun tezkor yordam.',
            },
            {
                title: 'Onlayn navbat',
                desc: 'Qabulga onlayn yozilish va tasdiq.',
            },
        ],
    },
    ru: {
        heading: 'Услуги',
        sub: 'Основные направления нашего центра',
        items: [
            {
                title: 'Приём и консультация',
                desc: 'Осмотр опытных специалистов и индивидуальная консультация.',
            },
            {
                title: 'Диагностика',
                desc: 'МРТ/КТ, лабораторные и другие исследования.',
            },
            {
                title: 'Хирургические операции',
                desc: 'Нейрохирургические операции по современным методикам.',
            },
            {
                title: 'Реабилитация',
                desc: 'Физиотерапия и программы восстановления.',
            },
            {
                title: 'Скорая помощь',
                desc: 'Оперативная помощь в неотложных ситуациях.',
            },
            {
                title: 'Онлайн-запись',
                desc: 'Онлайн-запись на приём и подтверждение.',
            },
        ],
    },
    en: {
        heading: 'Services',
        sub: 'Core services we offer',
        items: [
            {
                title: 'Admission & consultation',
                desc: 'Examination by experienced specialists and personalized advice.',
            },
            {
                title: 'Diagnostics',
                desc: 'MRI/CT, laboratory tests and other examinations.',
            },
            {
                title: 'Surgical procedures',
                desc: 'Neurosurgical operations using modern techniques.',
            },
            {
                title: 'Rehabilitation',
                desc: 'Physiotherapy and recovery programs.',
            },
            {
                title: 'Emergency care',
                desc: 'Rapid assistance in urgent situations.',
            },
            {
                title: 'Online appointment',
                desc: 'Book and confirm appointments online.',
            },
        ],
    },
};

/* ---------------- Default ro‘yxat (UZ) ---------------- */
const defaultItemsUZ = TEXT.uz.items.map((it, i) => ({
    icon: ICONS[i],
    title: it.title,
    desc: it.desc,
}));

export default function Services({ items = defaultItemsUZ }) {
    const { language } = Languages();
    const lang = TEXT[language] ? language : 'uz';
    const t = TEXT[lang];

    // Parent items bermagan bo‘lsa — i18n asosida dinamik ro‘yxat
    const usingDefault = items === defaultItemsUZ;
    const i18nItems = usingDefault
        ? t.items.map((it, i) => ({
              icon: ICONS[i],
              title: it.title,
              desc: it.desc,
          }))
        : items;

    return (
        <section
            className="py-10 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
            aria-labelledby="services-title"
        >
            <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                <div className="mb-6 text-center">
                    <h2
                        id="services-title"
                        className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100"
                    >
                        {t.heading}
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {t.sub}
                    </p>
                </div>

                {/* 👉 muhim: auto-rows fr + item/h-full + card/h-full + flex-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
                    {i18nItems.map((it, idx) => (
                        <div key={idx} className="w-full h-full">
                            <article
                                className="
                                    group h-full rounded-xl ring-1 ring-slate-200 dark:ring-slate-700
                                    bg-white dark:bg-slate-800 p-4
                                    transition-all duration-200 transform-gpu
                                    hover:-translate-y-0.5 hover:shadow-lg
                                    focus-within:ring-2 focus-within:ring-blue-500/60
                                    "
                                tabIndex={0}
                                aria-label={it.title}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">{it.icon}</div>
                                    <div className="flex-1">
                                        {/* Title: 2 qatorga clamp */}
                                        <h3
                                            className="text-base lg:text-lg font-semibold text-slate-800 dark:text-slate-100"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {it.title}
                                        </h3>

                                        {/* Desc: 3 qatorga clamp */}
                                        {it.desc && (
                                            <p
                                                className="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {it.desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
