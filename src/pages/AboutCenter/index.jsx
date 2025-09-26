// src/pages/AboutCenter.jsx
import React from 'react';
import {
    BsBuilding,
    BsHospital,
    BsAward,
    BsPeople,
    BsClockHistory,
    BsShieldCheck,
    BsEye,
    BsGlobe2,
    BsArrowRight,
    BsCheck2Circle,
} from 'react-icons/bs';
import { BiTargetLock } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function AboutCenter() {
    return (
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div
                    className="absolute -top-24 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-30
                        bg-[#2464AE] dark:bg-blue-600 pointer-events-none"
                />
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4 py-12 md:py-16">
                    <div className="max-w-3xl">
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
                             bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200"
                        >
                            <BsBuilding className="inline-block" /> Markaz
                            haqida
                        </span>
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
                            Respublika Neyroxirurgiya Markazi haqida
                        </h1>
                        <p className="mt-3 md:mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
                            Biz neyroxirurgiyaning barcha yo‘nalishlari bo‘yicha
                            zamonaviy diagnostika, davolash va reabilitatsiya
                            xizmatlarini ko‘rsatamiz. Mutaxassislar jamoasi,
                            ilg‘or texnologiyalar va bemor markazli yondashuv —
                            asosiy ustunligimiz.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                to="/departments"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white
                           bg-[#2464AE] hover:bg-[#1f59a0] dark:bg-blue-600 dark:hover:bg-blue-500
                           transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                            >
                                Bo‘limlar <BsArrowRight />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                           ring-1 ring-slate-200 dark:ring-slate-700
                           bg-white/80 dark:bg-slate-800/60
                           text-slate-800 dark:text-slate-100
                           hover:bg-white dark:hover:bg-slate-800
                           transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                            >
                                Bog‘lanish
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-8 md:py-10">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                        <StatCard
                            icon={<BsHospital />}
                            value="10+"
                            label="Bo‘limlar"
                        />
                        <StatCard
                            icon={<BsPeople />}
                            value="150+"
                            label="Mutaxassislar"
                        />
                        <StatCard
                            icon={<BsAward />}
                            value="25 yil"
                            label="Tajriba"
                        />
                        <StatCard
                            icon={<BsClockHistory />}
                            value="24/7"
                            label="Shoshilinch yordam"
                        />
                    </div>
                </div>
            </section>

            {/* MISSION / VISION */}
            <section className="py-8 md:py-12">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        <InfoCard
                            icon={<BiTargetLock className="text-2xl" />}
                            title="Missiya"
                            desc="Yuqori sifatli neyroxirurgik yordamni aholiga taqdim etish, ilmiy izlanish va ta’lim orqali sog‘liqni saqlash tizimiga hissa qo‘shish."
                        />
                        <InfoCard
                            icon={<BsEye className="text-2xl" />}
                            title="Vizyon"
                            desc="Hududda yetakchi ilmiy-amaliy markaz bo‘lish, innovatsion yechimlar bilan bemorlar hayot sifatini yaxshilash."
                        />
                    </div>
                </div>
            </section>

            {/* AFZALLIKLAR */}
            <section className="py-8 md:py-12">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div
                        className="rounded-2xl p-6 md:p-8 ring-1 ring-slate-200 dark:ring-slate-700
                          bg-white/90 dark:bg-slate-800/80 backdrop-blur"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                                <BsShieldCheck />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Nega aynan biz?
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Benefit text="Zamonaviy MRI/KT va intraoperatsion navigatsiya" />
                            <Benefit text="Tajribali, sertifikatlangan shifokorlar jamoasi" />
                            <Benefit text="Minimal invaziv va mikronazoratli operatsiyalar" />
                            <Benefit text="Kompleks reabilitatsiya va kuzatuv dasturlari" />
                            <Benefit text="Hamyonbop narx va shaffof jarayon" />
                            <Benefit text="Xalqaro hamkorlik va tajriba almashinuvi" />
                        </div>
                    </div>
                </div>
            </section>

            {/* TARIX / TIMELINE */}
            <section className="py-8 md:py-12">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    Markaz tarixi
                                </h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    Rivojlanish bosqichlari: tashkil topgan
                                    kundan bugungacha.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <ol className="relative border-s border-slate-200 dark:border-slate-700 pl-6 space-y-6">
                                <TimelineItem
                                    year="1999"
                                    title="Tashkil topdi"
                                />
                                <TimelineItem
                                    year="2007"
                                    title="Mikroxirurgiya bo‘limi ishga tushdi"
                                />
                                <TimelineItem
                                    year="2015"
                                    title="MRI/KT markazi modernizatsiyasi"
                                />
                                <TimelineItem
                                    year="2021"
                                    title="Xalqaro hamkorlik dasturlari"
                                />
                                <TimelineItem
                                    year="2024"
                                    title="Yangi operatsion blok va simulyatsiya markazi"
                                />
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* XALQARO HAMKORLIK / MAP CTA */}
            <section className="py-10">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl p-6 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/90 dark:bg-slate-800/80">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                                    <BsGlobe2 />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                                    Xalqaro hamkorlik
                                </h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                Yetakchi klinikalar bilan qo‘shma ilmiy
                                loyihalar, konferensiyalar va malaka oshirish
                                dasturlari.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li>
                                    • Klinik stajirovkalar va mahorat darslari
                                </li>
                                <li>• Qo‘shma tadqiqotlar va nashrlar</li>
                                <li>• Telemeditsina va konsiliumlar</li>
                            </ul>
                            <Link
                                to="/education"
                                className="mt-5 inline-flex items-center gap-2 text-[#2464AE] dark:text-blue-300 hover:underline"
                            >
                                Batafsil <BsArrowRight />
                            </Link>
                        </div>

                        <div className="rounded-2xl p-6 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/90 dark:bg-slate-800/80">
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                Qabulga yoziling
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Qisqa forma orqali murojaat qoldiring —
                                operatorlarimiz siz bilan bog‘lanadi.
                            </p>
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white
                             bg-[#2464AE] hover:bg-[#1f59a0] dark:bg-blue-600 dark:hover:bg-blue-500
                             transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                                >
                                    Bog‘lanish <BsArrowRight />
                                </Link>
                                <Link
                                    to="/services/appointment"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                             ring-1 ring-slate-200 dark:ring-slate-700
                             bg-white/80 dark:bg-slate-800/60
                             text-slate-800 dark:text-slate-100
                             hover:bg-white dark:hover:bg-slate-800
                             transition"
                                >
                                    Onlayn navbat
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOT CTA BANNER */}
            <section className="pb-12">
                <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                    <div
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6
                          bg-white dark:bg-slate-800/90 backdrop-blur
                          rounded-2xl shadow-md ring-1 ring-slate-200 dark:ring-slate-700
                          px-5 py-6"
                    >
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                                Bemorlar uchun qo‘llanma
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Qabulga tayyorgarlik, kerakli hujjatlar va
                                tez-tez so‘raladigan savollar.
                            </p>
                        </div>
                        <Link
                            to="/patients/faq"
                            className="inline-flex items-center justify-center gap-2
                         w-full sm:w-auto px-4 py-2 rounded-xl
                         bg-[#2464AE] hover:bg-[#1f59a0] text-white
                         dark:bg-blue-600 dark:hover:bg-blue-500
                         transition"
                        >
                            Ko‘rish <BsArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ------- Kichik, qayta ishlatiladigan bo'laklar ------- */

function StatCard({ icon, value, label }) {
    return (
        <div
            className="rounded-2xl h-full p-4 md:p-5 ring-1 ring-slate-200 dark:ring-slate-700
                    bg-white/90 dark:bg-slate-800/80 backdrop-blur
                    flex items-center gap-3"
        >
            <div className="p-2.5 rounded-xl bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                {React.cloneElement(icon, { className: 'text-xl' })}
            </div>
            <div>
                <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                    {label}
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, title, desc }) {
    return (
        <div
            className="rounded-2xl p-6 md:p-7 ring-1 ring-slate-200 dark:ring-slate-700
                    bg-white/90 dark:bg-slate-800/80 backdrop-blur"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200">
                    {icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {title}
                </h3>
            </div>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
    );
}

function Benefit({ text }) {
    return (
        <div
            className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-slate-200 dark:ring-slate-700
                    bg-white/80 dark:bg-slate-800/60"
        >
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
            <span
                className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full
                       bg-[#2464AE] dark:bg-blue-500 ring-4 ring-white dark:ring-slate-900"
            />
            <div
                className="ml-2 pl-4 py-1 rounded-lg bg-white/70 dark:bg-slate-800/60
                      ring-1 ring-slate-200 dark:ring-slate-700"
            >
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
