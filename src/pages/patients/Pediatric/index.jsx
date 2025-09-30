// src/pages/patients/BolalarNeuroxirurgiyasi.jsx
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

const BolalarNeuroxirurgiyasi = () => {
    const data = [
        {
            id: 1,
            title: 'Operatsiya tartibi',
            data: `<p><strong>Bolalar neyroxirurgiyasi</strong> bo'limida jarrohlik operatsiyalari yuqori aniqlikdagi asboblar yordamida amalga oshiriladi.</p> <p><strong>Bolalar neyroxirurgiyasi</strong> bo'limida jarrohlik operatsiyalari yuqori aniqlikdagi asboblar yordamida amalga oshiriladi.</p> <p><strong>Bolalar neyroxirurgiyasi</strong> bo'limida jarrohlik operatsiyalari yuqori aniqlikdagi asboblar yordamida amalga oshiriladi.</p> <p><strong>Bolalar neyroxirurgiyasi</strong> bo'limida jarrohlik operatsiyalari yuqori aniqlikdagi asboblar yordamida amalga oshiriladi.</p>`,
        },
        {
            id: 2,
            title: 'Qabul va tekshiruvlar',
            data: `<ul><li>Har kuni soat 09:00 - 16:00 gacha qabul</li><li>Onlayn ro'yxatdan o'tish imkoniyati</li></ul>`,
        },
        {
            id: 3,
            title: 'Davolash usullari',
            data: `<p>Bolalar uchun <em>minimal invaziv</em> usullar keng qo'llaniladi. Masalan: endoskopik operatsiyalar.</p>`,
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        Bolalar Neyroxirurgiyasi
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Bu bo'limda bolalar neyroxirurgiyasi bilan bog'liq
                        barcha ma'lumotlarni topishingiz mumkin.
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

export default BolalarNeuroxirurgiyasi;
