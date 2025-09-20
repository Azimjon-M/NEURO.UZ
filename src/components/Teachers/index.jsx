import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image_1 from '@/assets/icons/it-park.jpg';
import { User2 } from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: 'Abdulloh Qodirov asdasdas asdasd siaukhdaiujksdh aiushdiuashdiu',
        subject: 'Matematika va qo‘shimcha nazariy fizika',
        image: Image_1,
    },
    { id: 2, name: 'Ziyoda Karimova', subject: 'Ingliz tili', image: '' },
    { id: 3, name: 'Shavkat Tursunov', subject: 'Biologiya', image: Image_1 },
    {
        id: 4,
        name: 'Dilorom Mamatova',
        subject: 'Kimyo – organik/ noorganik',
        image: '',
    },
    { id: 5, name: 'Javlonbek Karimov', subject: 'Fizika', image: Image_1 },
    { id: 6, name: 'Gulrux Toshpulatova', subject: 'Tarix', image: '' },
];

const Teachers = () => {
    return (
        <section
            id="teachers"
            className="py-10 md:py-14 select-none bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 text-center mb-3">
                    Mutaxassislar jamoasi
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-10">
                    Tajribali va fidoyi ustozlar/ shifokorlar jamoamiz kelajakni
                    birga quradi.
                </p>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2600, disableOnInteraction: false }}
                    loop
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 5 },
                    }}
                    className="!pb-2"
                >
                    {teachers.map((t) => (
                        <SwiperSlide key={t.id} className="!h-auto flex">
                            <article
                                className="h-full w-full bg-white/90 dark:bg-slate-800/70 backdrop-blur
                           ring-1 ring-slate-200/70 dark:ring-slate-700/60
                           rounded-2xl shadow-sm p-6
                           flex flex-col items-center text-center
                           transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <div className="mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#2464AE]/25 dark:ring-blue-300/25">
                                        {t.image ? (
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full grid place-items-center bg-slate-100 dark:bg-slate-700">
                                                <User2 className="w-10 h-10 text-slate-400 dark:text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ism — 2 qatorgacha, uzun so‘zlar buzilmasin */}
                                <h3
                                    className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100
                             line-clamp-2 break-words"
                                    title={t.name}
                                >
                                    {t.name}
                                </h3>

                                {/* Fan — 1 qator, ellipsis; juda uzun bo'lsa ham joyidan chiqmasin */}
                                <div className="mt-2 w-full flex justify-center">
                                    <span
                                        className="max-w-[85%] px-2.5 py-0.5 rounded-full text-xs font-medium
                               bg-[#2464AE]/10 text-[#2464AE] dark:bg-blue-300/10 dark:text-blue-200
                               line-clamp-1 break-words"
                                        title={t.subject}
                                    >
                                        {t.subject}
                                    </span>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Teachers;
