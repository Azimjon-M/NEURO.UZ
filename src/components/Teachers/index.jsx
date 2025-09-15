import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image_1 from '../../assets/icons/it-park.jpg';

import { User2Icon } from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: 'Abdulloh Qodirov asdasdas asdasd siaukhdaiujksdh aiushdiuashdiu',
        subject: 'Matematika',
        image: Image_1,
    },
    { id: 2, name: 'Ziyoda Karimova', subject: 'Ingliz tili', image: '' },
    {
        id: 3,
        name: 'Shavkat Tursunov',
        subject: 'Biologiya',
        image: Image_1,
    },
    { id: 4, name: 'Dilorom Mamatova', subject: 'Kimyo', image: '' },
    {
        id: 5,
        name: 'Javlonbek Karimov',
        subject: 'Fizika',
        image: Image_1,
    },
    { id: 6, name: 'Gulrux Toshpulatova', subject: 'Tarix', image: '' },
];

const Teachers = () => {
    return (
        <section className="py-8 select-none" id="teachers">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    O‘qituvchilarimiz
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Tajribali va fidokor o‘qituvchilarimiz farzandingiz
                    kelajagini birga qurishadi.
                </p>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={24}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 5 },
                    }}
                    className="!flex items-stretch"
                >
                    {teachers.map((teacher, index) => (
                        <SwiperSlide key={index} className="!h-auto flex">
                            <div className="w-full md:w-[280px] mx-auto flex flex-col justify-start bg-gray-50 rounded-2xl shadow p-6 hover:shadow-lg transition-all duration-300">
                                <div className="w-full flex justify-center mb-4">
                                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                        {teacher.image ? (
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <User2Icon className="text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {teacher.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {teacher.subject}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Teachers;
