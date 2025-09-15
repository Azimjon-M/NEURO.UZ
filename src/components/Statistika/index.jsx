import React from 'react';
import {
    GraduationCapIcon,
    UsersIcon,
    BookOpenIcon,
    CheckCircleIcon,
} from 'lucide-react';

const stats = [
    {
        icon: <UsersIcon className="w-8 h-8 text-blue-600" />,
        label: 'O‘quvchilar',
        value: '1200+',
    },
    {
        icon: <GraduationCapIcon className="w-8 h-8 text-yellow-600" />,
        label: 'Ustozlar',
        value: '35+',
    },
    {
        icon: <BookOpenIcon className="w-8 h-8 text-purple-600" />,
        label: 'Kurslar',
        value: '15+',
    },
    {
        icon: <CheckCircleIcon className="w-8 h-8 text-green-600" />,
        label: 'Bitiruvchilar',
        value: '900+',
    },
];

const Statistics = () => {
    return (
        <section className="py-16 bg-white" id="statistics">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    Bizning natijalar
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition-all"
                        >
                            <div className="mb-3 flex justify-center">
                                {item.icon}
                            </div>
                            <p className="text-3xl font-bold text-gray-800">
                                {item.value}
                            </p>
                            <p className="text-gray-600 mt-1 text-sm">
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
