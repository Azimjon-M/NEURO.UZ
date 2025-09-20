import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

const programs = [
    {
        icon: (
            <GraduationCap className="w-7 h-7 text-[#2464AE] dark:text-blue-300" />
        ),
        title: 'Klinik ordinatura',
        description:
            'Amaliyotga yo‘naltirilgan rezidentura dasturi: neyroxirurgiya bo‘limlarida rotatsiyalar, operatsion ko‘nikmalar va mentorlik.',
        href: '/education/klinik-ordinatura',
    },
    {
        icon: (
            <BookOpen className="w-7 h-7 text-[#2464AE] dark:text-blue-300" />
        ),
        title: 'Tayanch doktorantura (PhD)',
        description:
            'Ilmiy loyihalar, klinik tadqiqotlar va nashrlar bilan qo‘llab-quvvatlanadigan doktorantura yo‘nalishlari.',
        href: '/education/tayanch-doktorantura',
    },
    {
        icon: <Users className="w-7 h-7 text-[#2464AE] dark:text-blue-300" />,
        title: 'Malaka oshirish (CME)',
        description:
            'Neyroxirurglar va mutaxassislar uchun qisqa muddatli kurslar, mahorat darslari va akkreditatsiyalangan CME modullari.',
        href: '/education/malaka-oshirish',
    },
];

const Courses = () => {
    return (
        <section
            id="programs"
            className="py-10 md:py-14 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
            aria-labelledby="programs-title"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4 text-center">
                <h2
                    id="programs-title"
                    className="text-2xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-slate-100"
                >
                    Fan va ta’lim dasturlari
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
                    NEURO markazida rezidentura, PhD va CME yo‘nalishlari orqali
                    amaliyot, ilm-fan va zamonaviy ta’limni uyg‘unlashtiramiz.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {programs.map((p, i) => (
                        <article
                            key={i}
                            className="h-full rounded-2xl bg-white/90 dark:bg-slate-800/70 backdrop-blur
                         shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60
                         p-6 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="mb-4">{p.icon}</div>
                            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
                                {p.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
                                {p.description}
                            </p>

                            <div className="flex justify-end">
                                <Link
                                    to={p.href}
                                    className="inline-flex items-center gap-2 text-sm font-medium
                             text-[#2464AE] dark:text-blue-300 underline underline-offset-4"
                                >
                                    Batafsil
                                    <span
                                        aria-hidden
                                        className="inline-block border-t-2 border-l-2 w-2 h-2 rotate-135 translate-y-[1px]"
                                        style={{ borderColor: 'currentColor' }}
                                    />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
