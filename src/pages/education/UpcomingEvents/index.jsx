// src/pages/education/EduEvents.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'; // react-icons

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full m-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3 px-4 
                  text-left cursor-pointer bg-slate-100 dark:bg-slate-700 
                  hover:bg-slate-200 dark:hover:bg-slate-600 
                  rounded-md transition-colors"
            >
                <span className="font-medium text-slate-800 dark:text-slate-100">
                    {title}
                </span>
                <FiChevronDown
                    className={`transform transition-transform duration-500 linear 
                    text-slate-500 dark:text-slate-300
                    ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    size={20}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`transition-all duration-500 linear overflow-hidden mb-3 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    className="rounded-md bg-white dark:bg-slate-800 px-3 py-2
                    text-slate-600 dark:text-slate-300 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
};

const EduEvents = () => {
    const data = [
        {
            id: 1,
            title: 'Ilmiy-amaliy konferensiya',
            data: `
                <p><strong>Sana:</strong> 15-oktabr, 2025</p>
                <p><strong>Joy:</strong> Toshkent, Milliy kutubxona</p>
                <p><strong>Izoh:</strong> Konferensiyada neyroxirurgiya sohasidagi yangi tadqiqotlar muhokama qilinadi.</p>
            `,
        },
        {
            id: 2,
            title: 'Talabalar uchun ochiq seminar',
            data: `
                <p><strong>Sana:</strong> 2-noyabr, 2025</p>
                <p><strong>Joy:</strong> Qo‘qon davlat universiteti, katta majlislar zali</p>
                <p><strong>Izoh:</strong> Seminar davomida xorijiy mutaxassislar bilan tajriba almashiladi.</p>
            `,
        },
        {
            id: 3,
            title: 'Amaliy mahorat darsi',
            data: `
                <p><strong>Sana:</strong> 20-dekabr, 2025</p>
                <p><strong>Joy:</strong> Respublika Neyroxirurgiya markazi</p>
                <p><strong>Izoh:</strong> Jarrohlik asboblaridan foydalanish bo‘yicha amaliy mashg‘ulot.</p>
            `,
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        Kelgusi tadbirlar jadvali
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Ushbu bo‘limda yaqin kunlarda o‘tkazilishi
                        rejalashtirilgan ilmiy, o‘quv va amaliy tadbirlar haqida
                        ma’lumot olishingiz mumkin.
                    </p>
                </div>

                {/* Accordions */}
                <div className="space-y-2">
                    {data.map((item) => (
                        <Accordion
                            key={item.id}
                            title={item.title}
                            content={item.data}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EduEvents;
