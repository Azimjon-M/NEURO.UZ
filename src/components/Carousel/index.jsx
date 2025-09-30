// src/components/Carousel.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './style.css';
import { Link } from 'react-router-dom';
import ApiResult from '@/services/main';

const Carousel = () => {
    const [data, setData] = useState(null);

    // Tilni aniqlash (minimal)
    const lang = useMemo(() => {
        const ls =
            typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
        const raw = (
            ls || (typeof navigator !== 'undefined' ? navigator.language : 'uz')
        ).toLowerCase();
        if (raw.startsWith('ru')) return 'ru';
        if (raw.startsWith('en')) return 'en';
        return 'uz';
    }, []);

    const getData = async () => {
        try {
            const res = await ApiResult.getCarousel();
            // Siz aytgandek: res.data emas, res ning o‘zi bo‘lishi mumkin
            setData(res);
        } catch (error) {
            console.error(error);
            setData([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Har ikkala holatni qo‘llab-quvvatlaymiz: res (array) yoki res.data / res.results
    const rawArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
        ? data.results
        : [];

    const slides = rawArray
        .filter((d) => d?.is_active)
        .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        .map((dto) => ({
            id: dto.id,
            imageMobile: dto?.images?.mobile || dto?.images?.desktop || '',
            imageDesktop: dto?.images?.desktop || dto?.images?.mobile || '',
            title: dto?.i18n?.[lang]?.title || dto?.title || '',
            description: dto?.i18n?.[lang]?.text || dto?.text || '',
            link: dto?.detail_url || null,
        }));

    return (
        <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[850px] overflow-hidden">
            <Swiper
                loop={slides.length > 1}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                modules={[Autoplay, Scrollbar, Navigation]}
                className="w-full h-full"
            >
                {slides.length > 0 ? (
                    slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full">
                                {/* Mobile */}
                                <img
                                    src={slide.imageMobile}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-cover md:hidden"
                                    loading="lazy"
                                />
                                {/* Desktop */}
                                <img
                                    src={slide.imageDesktop}
                                    alt={slide.title}
                                    className="hidden md:inline-block absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

                                {/* Matn past-o‘ngda */}
                                <div className="relative z-20 w-full h-full flex items-end justify-end p-4 md:pb-10 md:pr-10 text-right">
                                    <div className="w-full px-4 md:px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px]">
                                        <div className="flex flex-col items-end text-white">
                                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                                {slide.title}
                                            </h2>
                                            <p className="text-md md:text-lg font-medium">
                                                {slide.description}
                                            </p>

                                            {slide.link &&
                                                (/^https?:\/\//i.test(
                                                    slide.link
                                                ) ? (
                                                    <a
                                                        href={slide.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="relative inline-block font-medium text-white underline underline-offset-4 pr-6 after:content-[''] after:absolute after:top-[14px] after:right-3 after:-translate-y-1/2 after:border-t-2 after:border-l-2 after:w-2 after:h-2 after:rotate-[135deg] after:transition-transform after:duration-300 hover:after:translate-x-1"
                                                    >
                                                        {lang === 'ru'
                                                            ? 'Подробнее'
                                                            : lang === 'en'
                                                            ? 'Learn more'
                                                            : 'Batafsil'}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        to={slide.link}
                                                        className="relative inline-block font-medium text-white underline underline-offset-4 pr-6 after:content-[''] after:absolute after:top-[14px] after:right-3 after:-translate-y-1/2 after:border-t-2 after:border-l-2 after:w-2 after:h-2 after:rotate-[135deg] after:transition-transform after:duration-300 hover:after:translate-x-1"
                                                    >
                                                        {lang === 'ru'
                                                            ? 'Подробнее'
                                                            : lang === 'en'
                                                            ? 'Learn more'
                                                            : 'Batafsil'}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <span className="opacity-80">
                                Ma’lumot topilmadi
                            </span>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    );
};

export default Carousel;
