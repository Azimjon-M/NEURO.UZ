import React from 'react';
import { BookOpenIcon, GraduationCapIcon, UsersIcon } from 'lucide-react';

const courses = [
    {
        icon: <BookOpenIcon className="w-8 h-8 text-blue-600" />,
        title: 'Boshlang‘ich sinflar',
        description:
            '1-4 sinf o‘quvchilari uchun maxsus metodika asosida tayyorlangan dasturlar.',
    },
    {
        icon: <GraduationCapIcon className="w-8 h-8 text-green-600" />,
        title: 'O‘rta ta’lim',
        description:
            '5-9 sinf o‘quvchilari uchun chuqurlashtirilgan fanlar bo‘yicha kurslar.',
    },
    {
        icon: <UsersIcon className="w-8 h-8 text-purple-600" />,
        title: 'Abituriyentlar uchun',
        description:
            'DTM va test sinovlariga tayyorlash bo‘yicha intensiv kurslar.',
    },
];

const Courses = () => {
    return (
        <section className="py-8 bg-gray-50" id="courses">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                    Darslarimiz
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Biz o‘quvchilarning yoshi va darajasiga moslab maxsus
                    tayyorlangan darslarni taklif qilamiz.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all duration-300"
                        >
                            <div className="mb-4">{course.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {course.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 flex-1">
                                {course.description}
                            </p>
                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 underline hover:text-blue-800 whitespace-nowrap"
                                >
                                    Batafsil
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
