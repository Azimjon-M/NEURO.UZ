import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image_1 from '@/assets/icons/it-park.jpg';
import { User2 } from 'lucide-react';

const experts = [
    {
        id: 1,
        name: 'Abdulloh Qodirov asdasdas asdasd siaukhdaiujksdh aiushdiuashdiu',
        subject: 'Matematika va qo‘shimcha nazariy fizika',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 90 123-45-67',
        email: 'abdulloh@example.com',
    },
    {
        id: 2,
        name: 'Ziyoda Karimova',
        subject: 'Ingliz tili',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 93 555-12-34',
        email: 'ziyoda.karimova@example.com',
    },
    {
        id: 3,
        name: 'Shavkat Tursunov',
        subject: 'Biologiya',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 95 700-11-22',
        email: 'shavkat.tursunov@example.com',
    },
    {
        id: 4,
        name: 'Dilorom Mamatova',
        subject: 'Kimyo – organik/ noorganik',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 97 321-00-77',
        email: 'dilorom@example.com',
    },
    {
        id: 5,
        name: 'Javlonbek Karimov',
        subject: 'Fizika',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 99 240-33-66',
        email: 'javlonbek.karimov@example.com',
    },
    {
        id: 6,
        name: 'Gulrux Toshpulatova',
        subject: 'Tarix',
        image: '',
        schedule: 'Dush–Jum, 9:00–17:00',
        phone: '+998 90 888-44-55',
        email: 'gulrux.toshpulatova@example.com',
    },
];

const Experts = () => {
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
                    className="!pb-2 bg-transparent"
                >
                    {experts.map((t) => {
                        const role = t.role || t.subject;
                        return (
                            <SwiperSlide
                                key={t.id}
                                className="!h-auto cursor-pointer active:cursor-grabbing !bg-transparent"
                            >
                                <article
                                    className="h-full w-full overflow-hidden rounded-2xl shadow-sm
                                        ring-1 ring-slate-200/70 dark:ring-slate-700/60
                                    bg-white dark:bg-slate-800/70 backdrop-blur
                                        transition-shadow duration-200 hover:shadow-lg
                                        md:min-h-[520px]"
                                >
                                    {/* TOP IMAGE */}
                                    <div className="w-full h-56 md:h-64">
                                        {t.image ? (
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full grid place-items-center bg-slate-100 dark:bg-slate-700">
                                                <User2 className="w-12 h-12 text-slate-400 dark:text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5">
                                        {/* Name */}
                                        <h3
                                            className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 text-center leading-snug uppercase tracking-wide"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                            title={t.name}
                                        >
                                            {t.name}
                                        </h3>

                                        {/* Details */}
                                        <div className="mt-3 space-y-2">
                                            {role && (
                                                <p className="text-sm leading-relaxed">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                        Lavozim:{' '}
                                                    </span>
                                                    <span className="text-slate-700 dark:text-slate-300">
                                                        {role}
                                                    </span>
                                                </p>
                                            )}

                                            {t.schedule && (
                                                <p className="text-sm leading-relaxed">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                        Qabul vaqti:{' '}
                                                    </span>
                                                    <span className="text-slate-700 dark:text-slate-300">
                                                        {t.schedule}
                                                    </span>
                                                </p>
                                            )}

                                            {t.phone && (
                                                <p className="text-sm leading-relaxed">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                        Telefon:{' '}
                                                    </span>
                                                    <a
                                                        href={`tel:${t.phone.replace(
                                                            /\s+/g,
                                                            ''
                                                        )}`}
                                                        className="text-[#2464AE] dark:text-blue-300 hover:underline"
                                                        aria-label={`Telefon raqami ${t.phone}`}
                                                    >
                                                        {t.phone}
                                                    </a>
                                                </p>
                                            )}

                                            {t.email && (
                                                <p className="text-sm leading-relaxed">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                        Email:{' '}
                                                    </span>
                                                    <a
                                                        href={`mailto:${t.email}`}
                                                        className="text-[#2464AE] dark:text-blue-300 hover:underline break-all"
                                                        aria-label={`Email manzili ${t.email}`}
                                                    >
                                                        {t.email}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default Experts;
