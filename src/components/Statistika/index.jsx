import React from 'react';
import {
    Activity,
    Stethoscope,
    Building2,
    Microscope,
    FileText,
    Users,
} from 'lucide-react';

const stats = [
    {
        icon: (
            <Activity className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
        ),
        label: 'Yiliga operatsiyalar',
        value: '3 500+',
    },
    {
        icon: (
            <Stethoscope className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
        ),
        label: 'Mutaxassis shifokorlar',
        value: '120+',
    },
    {
        icon: (
            <Building2 className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
        ),
        label: 'Bo‘limlar',
        value: '14',
    },
    {
        icon: (
            <Microscope className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
        ),
        label: 'Laboratoriya tadqiqotlari',
        value: '25k+',
    },
    {
        icon: (
            <FileText className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />
        ),
        label: 'Ilmiy maqolalar',
        value: '400+',
    },
    {
        icon: <Users className="w-8 h-8 text-[#2464AE] dark:text-blue-300" />,
        label: 'Yiliga bemorlar',
        value: '18k+',
    },
];

const Statistics = () => {
    return (
        <section
            id="statistics"
            className="py-12 md:py-16 bg-white dark:bg-slate-900 select-none"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-slate-900 dark:text-slate-100">
                    Markaz ko‘rsatkichlari
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 text-center">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="group rounded-2xl p-6 bg-white/90 dark:bg-slate-800/70 backdrop-blur
                         shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60
                         transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="mb-3 flex justify-center">
                                {item.icon}
                            </div>
                            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                                {item.value}
                            </p>
                            <p className="mt-1 text-sm md:text-base text-slate-600 dark:text-slate-300">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
