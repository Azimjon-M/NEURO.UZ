// src/components/Xizmatlar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    BsHospital,
    BsClockHistory,
    BsHeartPulse,
    BsPeople,
    BsCalendarCheck,
} from 'react-icons/bs';
import { RiMicroscopeLine } from 'react-icons/ri';

const defaultItems = [
    {
        icon: (
            <BsHospital className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Qabul va konsultatsiya',
        desc: 'Tajribali mutaxassislar ko‘rigi va individual maslahat.',
        to: '/services/consultation',
    },
    {
        icon: (
            <RiMicroscopeLine className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Diagnostika',
        desc: 'MRI/KT, laboratoriya va boshqa tekshiruvlar.',
        to: '/services/diagnostics',
    },
    {
        icon: (
            <BsHeartPulse className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Jarrohlik amaliyotlari',
        desc: 'Zamonaviy usullar asosida neyroxirurgik operatsiyalar.',
        to: '/services/surgery',
    },
    {
        icon: (
            <BsPeople className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Reabilitatsiya',
        desc: 'Fizioterapiya va tiklanish dasturlari.',
        to: '/services/rehab',
    },
    {
        icon: (
            <BsClockHistory className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Shoshilinch yordam',
        desc: 'Favqulodda holatlar uchun tezkor yordam.',
        to: '/services/emergency',
    },
    {
        icon: (
            <BsCalendarCheck className="text-[#2464AE] dark:text-blue-300 text-2xl" />
        ),
        title: 'Onlayn navbat',
        desc: 'Qabulga onlayn yozilish va tasdiq.',
        to: '/services/appointment',
    },
];

export default function Services({ items = defaultItems }) {
    return (
        <section className="py-10 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100">
                        Xizmatlar
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Markazimiz taklif qiladigan asosiy yo‘nalishlar
                    </p>
                </div>

                {/* 👉 muhim: auto-rows fr + item/h-full + card/h-full + flex-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
                    {items.map((it, idx) => {
                        const Card = (
                            <div className="h-full rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 p-4 hover:shadow-lg transition-shadow flex flex-col">
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

                                {/* Agar pastda button/cta bo'lsa, shu yerga qo'yib 'mt-auto' berasiz */}
                                {/* <Link to={it.to} className="mt-3 text-[#2464AE] hover:underline">Batafsil</Link> */}
                            </div>
                        );

                        return (
                            <div key={idx} className="w-full h-full">
                                {it.to ? (
                                    <Link
                                        to={it.to}
                                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-xl h-full"
                                    >
                                        {Card}
                                    </Link>
                                ) : (
                                    Card
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
