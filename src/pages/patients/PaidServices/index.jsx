// src/pages/patients/PullikXizmatlar.jsx
import React from 'react';
import { Languages } from '@/context/LanguageContext';

const T = {
    uz: {
        title: 'Pullik xizmatlar',
        desc: 'Ushbu sahifada markazimiz tomonidan taklif etiladigan pullik tibbiy xizmatlar to‘g‘risidagi ma’lumotlar joylashtiriladi. Tez orada siz bu yerda konsultatsiyalar, diagnostika, jarrohlik va reabilitatsiya xizmatlari haqida to‘liq ma’lumot topasiz.',
        updating: 'Ma’lumotlar yangilanmoqda...',
    },
    ru: {
        title: 'Платные услуги',
        desc: 'Здесь будут размещены сведения о платных медицинских услугах нашего центра. Вскоре вы найдете полную информацию о консультациях, диагностике, хирургии и реабилитации.',
        updating: 'Информация обновляется...',
    },
    en: {
        title: 'Paid Services',
        desc: 'This page will list the paid medical services offered by our center. Soon you will find complete information about consultations, diagnostics, surgery, and rehabilitation.',
        updating: 'Content is being updated...',
    },
};

const PatPaid = () => {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    return (
        <section className="py-10 md:py-12 bg-slate-50 dark:bg-slate-900">
            <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] text-center">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {t.title}
                </h1>

                {/* Subtitle / description */}
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

export default PatPaid;
