// src/pages/patients/PatDrugs.jsx
import React from 'react';
import { Languages } from '@/context/LanguageContext';

const T = {
    uz: {
        title: 'Dorilar va tibbiy vositalar',
        desc: 'Ushbu sahifada bemorlarni dori vositalari va tibbiy buyumlar bilan ta’minlash tartibi, ro‘yxatlar va yangiliklar joylashtiriladi. Ma’lumotlar hozirda tayyorlanmoqda.',
        pending: 'Ma’lumotlar tez orada e’lon qilinadi…',
    },
    ru: {
        title: 'Лекарства и медицинские изделия',
        desc: 'На этой странице будут размещены порядок обеспечения пациентов лекарственными средствами и медизделиями, перечни и обновления. Данные находятся на стадии подготовки.',
        pending: 'Информация будет опубликована в ближайшее время…',
    },
    en: {
        title: 'Medicines and Medical Devices',
        desc: 'This page will publish the procedure for providing patients with medicines and medical devices, relevant lists, and updates. The content is currently being prepared.',
        pending: 'Information will be published soon…',
    },
};

const PatDrugs = () => {
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
                    {t.pending}
                </p>
            </div>
        </section>
    );
};

export default PatDrugs;
