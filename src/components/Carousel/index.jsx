import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './style.css'; // Swiper stil fayli
import { Link } from 'react-router-dom';

const Carousel = () => {
    const slides = [
        {
            image_1:
                'https://content.yourcareer.gov.au/sites/default/files/2022-12/253512-cardiothoracicsurgeon.jpg', // shifokorlar jamoasi
            image_2:
                'https://content.yourcareer.gov.au/sites/default/files/2022-12/253512-cardiothoracicsurgeon.jpg',
            title: 'Mutaxassis shifokorlar',
            description:
                'Bizning nevrojarrohlik bo‘limimiz tajribali va malakali shifokorlar bilan faoliyat yuritadi.',
            link: 'https://neuro.uz/about',
        },
        {
            image_1:
                'https://www.mua.edu/uploads/sites/10/2023/02/what-is-a-neurosurgeon.webp', // jarrohlik operatsiya
            image_2:
                'https://www.mua.edu/uploads/sites/10/2023/02/what-is-a-neurosurgeon.webp',
            title: 'Zamonaviy operatsiyalar',
            description:
                'Minimal invaziv va yuqori texnologiyalarga asoslangan nevrojarrohlik operatsiyalari.',
            link: 'https://neuro.uz/services',
        },
        {
            image_1:
                'https://thumbs.dreamstime.com/b/doctors-brain-scan-check-results-hospital-teamwork-review-healthcare-window-neurology-man-woman-xray-310902447.jpg', // MRI apparati
            image_2:
                'https://thumbs.dreamstime.com/b/doctors-brain-scan-check-results-hospital-teamwork-review-healthcare-window-neurology-man-woman-xray-310902447.jpg',
            title: 'Diagnostika',
            description:
                'MRI, KT va boshqa ilg‘or diagnostika usullari bilan aniq tashxis qo‘yish.',
            link: 'https://neuro.uz/diagnostics',
        },
    ];

    return (
        <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[850px] overflow-hidden">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Scrollbar, Navigation]}
                className="w-full h-full"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image_1}
                                alt={`Fon ${idx + 1}`}
                                className="absolute inset-0 w-full h-full object-cover md:hidden"
                            />
                            <img
                                src={slide.image_2}
                                alt={`Fon ${idx + 1}`}
                                className="hidden absolute inset-0 w-full h-full object-cover md:inline-block"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

                            {/* Matnni pastga va o‘nga suramiz */}
                            <div className="relative z-20 w-full h-full flex items-end justify-end p-4 md:pb-10 md:pr-10 text-right">
                                <div className="w-full px-4 md:px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px]">
                                    <div className="flex flex-col items-end text-white">
                                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                            {slide.title}
                                        </h2>
                                        <p className="text-md md:text-lg font-medium">
                                            {slide.description}
                                        </p>
                                        <Link
                                            to={slide.link}
                                            className="relative inline-block font-medium text-white underline underline-offset-4 pr-6 after:content-[''] after:absolute after:top-[14px] after:right-3 after:-translate-y-1/2 after:border-t-2 after:border-l-2 after:w-2 after:h-2 after:rotate-[135deg] after:transition-transform after:duration-300 hover:after:translate-x-1"
                                        >
                                            Batafsil
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Carousel;
