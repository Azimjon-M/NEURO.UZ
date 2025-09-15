import React from 'react';
import {
    FaChalkboardTeacher,
    FaLaptopCode,
    FaShieldAlt,
    FaUserFriends,
} from 'react-icons/fa';

const features = [
    {
        icon: <FaChalkboardTeacher className="text-[#005186] text-3xl" />,
        title: 'Tajribali ustozlar',
        description:
            'O‘z sohasida tajribaga ega, zamonaviy yondashuvdagi o‘qituvchilar.',
    },
    {
        icon: <FaLaptopCode className="text-[#005186] text-3xl" />,
        title: 'IT va Texnologiya',
        description: 'Zamonaviy kompyuter darslari va raqamli o‘quv tizimi.',
    },
    {
        icon: <FaShieldAlt className="text-[#005186] text-3xl" />,
        title: 'Xavfsizlik',
        description: 'Bolalaringiz xavfsizligi biz uchun eng muhim ustuvorlik.',
    },
    {
        icon: <FaUserFriends className="text-[#005186] text-3xl" />,
        title: 'Kichik sinflar',
        description: 'Har bir o‘quvchiga individual e’tibor beriladi.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-8 bg-white" id="why-choose-us">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    Nega bizni tanlashadi?
                </h2>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                        >
                            <div className="mb-4 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
