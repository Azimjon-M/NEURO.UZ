// src/pages/patients/PatReports.jsx
import React from 'react';
import { Languages } from '@/context/LanguageContext';

/* ======================== I18N ======================== */
const T = {
    uz: {
        title: 'Hisobot',
        desc: 'Bu sahifada markazimiz faoliyati bo‘yicha statistik ma’lumotlar, yillik va choraklik hisobotlar, klinik natijalar hamda ilmiy-tadqiqot ishlari haqida ma’lumotlar joylashtiriladi. Tez orada to‘liq kontent bilan yangilanadi.',
        updating: 'Ma’lumotlar tayyorlanmoqda…',
    },
    ru: {
        title: 'Отчётность',
        desc: 'На этой странице будут размещены статистические данные о деятельности центра, ежегодные и квартальные отчёты, клинические результаты, а также сведения о научно-исследовательской работе. Вскоре страница будет обновлена полноценным контентом.',
        updating: 'Данные подготавливаются…',
    },
    en: {
        title: 'Reports',
        desc: 'This page will host statistical data on our center’s activity, annual and quarterly reports, clinical outcomes, and information about research projects. Full content is coming soon.',
        updating: 'Content is being prepared…',
    },
};

const PatReports = () => {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    return (
        <section className="py-10 md:py-12 bg-slate-50 dark:bg-slate-900">
            <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] text-center">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {t.title}
                </h1>

                {/* Description */}
                <p className="mt-3 text-[13.5px] md:text-[14px] leading-7 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    {t.desc}
                </p>

                <p className="mt-6 text-[13.5px] md:text-[14px] text-slate-500 dark:text-slate-400 italic">
                    {t.updating}
                </p>
            </div>
        </section>
    );
};

export default PatReports;
