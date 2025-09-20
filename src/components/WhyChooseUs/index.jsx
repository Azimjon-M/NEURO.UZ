import React from 'react';
import { FaUserMd, FaUserFriends, FaHeartbeat } from 'react-icons/fa';
import { Ri24HoursLine, RiMicroscopeLine } from 'react-icons/ri';
import { TbCertificate, TbScan } from 'react-icons/tb';
import { GiScalpel } from 'react-icons/gi';

const features = [
    {
        icon: (
            <FaUserMd className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Tajribali neyroxirurglar',
        description:
            '20+ yo‘nalishda tajribaga ega, murakkab operatsiyalarni muntazam bajaruvchi shifokorlar.',
    },
    {
        icon: <TbScan className="text-[#2464AE] dark:text-blue-300 text-3xl" />,
        title: 'Zamonaviy diagnostika',
        description:
            'MRI, KT, angiografiya va keng qamrovli laborator tahlillar asosida aniq tashxis.',
    },
    {
        icon: (
            <Ri24HoursLine className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: '24/7 shoshilinch yordam',
        description:
            'Favqulodda holatlar uchun uzluksiz qabul, reanimatsiya va intensiv terapiya.',
    },
    {
        icon: (
            <GiScalpel className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Minimal invaziv jarrohlik',
        description:
            'Mikroxirurgiya va endoskopik usullar bilan tezroq tiklanish va kamroq asoratlar.',
    },
    {
        icon: (
            <FaUserFriends className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Ko‘p tarmoqli yondashuv',
        description:
            'Neyroxirurg, nevrolog, radiolog va reabilitologlardan iborat konsilium.',
    },
    {
        icon: (
            <RiMicroscopeLine className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Ilm-fan va ta’lim',
        description:
            'Rezidentura, CME va ilmiy loyihalar orqali doimiy bilim yangilanishi.',
    },
    {
        icon: (
            <TbCertificate className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Xalqaro standartlar',
        description:
            'Protokollar va sifat nazorati — davolashda xavfsizlik va izchillik.',
    },
    {
        icon: (
            <FaHeartbeat className="text-[#2464AE] dark:text-blue-300 text-3xl" />
        ),
        title: 'Bemor markazida',
        description:
            'Ochiq muloqot, individual reja va kuzatuv: har bir bemorga alohida e’tibor.',
    },
];

const WhyNeuro = () => {
    return (
        <section
            id="why-neuro"
            className="py-10 md:py-14 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
            aria-labelledby="why-neuro-title"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2
                    id="why-neuro-title"
                    className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-slate-900 dark:text-slate-100"
                >
                    Nega{' '}
                    <span className="text-[#2464AE] dark:text-blue-300">
                        Biz
                    </span>
                    ni tanlashadi?
                </h2>

                <div className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item, idx) => (
                        <article
                            key={idx}
                            className="group h-full rounded-2xl bg-white/90 dark:bg-slate-800/70 backdrop-blur shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="mb-4 flex justify-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-900/30">
                                    {item.icon}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-center text-slate-900 dark:text-slate-100">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-center text-slate-600 dark:text-slate-300">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyNeuro;
