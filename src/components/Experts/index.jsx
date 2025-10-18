// src/components/Experts.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { User2 } from 'lucide-react';
import ApiResult from '@/services/main';
import BolimDetailModal from '@/components/BolimDetailModal';
import { Languages } from '@/context/LanguageContext';

const Experts = () => {
    const [data, setData] = useState(null);
    const [detail, setDetail] = useState({
        open: false,
        data: null,
        isQabul: false,
    });
    const { language } = Languages();
    const lang = (language || 'uz').toLowerCase();

    // UI label’lar (prefixlar) i18n
    const labels = useMemo(() => {
        switch (lang) {
            case 'ru':
                return {
                    teamTitle: 'Команда специалистов',
                    teamDesc:
                        'Наша команда опытных и преданных преподавателей/врачей строит будущее вместе.',
                    pos: 'Должность',
                    rec: 'Приём',
                    book: 'Записаться на приём',
                    empty: 'Данные не найдены',
                };
            case 'en':
                return {
                    teamTitle: 'Experts team',
                    teamDesc:
                        'Our team of experienced and dedicated teachers/doctors builds the future together.',
                    pos: 'Position',
                    rec: 'Reception time',
                    book: 'Book appointment',
                    empty: 'No data found',
                };
            default:
                return {
                    teamTitle: 'Mutaxassislar jamoasi',
                    teamDesc:
                        'Tajribali va fidoyi ustozlar/shifokorlar jamoamiz kelajakni birga quradi.',
                    pos: 'Lavozim',
                    rec: 'Qabul vaqti',
                    book: 'Qabulga yozilish',
                    empty: 'Ma’lumot topilmadi',
                };
        }
    }, [lang]);

    const getData = async () => {
        try {
            const res = await (ApiResult.getStaff
                ? ApiResult.getStaff()
                : ApiResult.getExperts());
            // ba’zi backendlarda res.data bo‘lmaydi, shuning uchun to‘g‘ridan-to‘g‘ri massiv deb qabul qilamiz
            const arr = Array.isArray(res)
                ? res
                : Array.isArray(res?.results)
                ? res.results
                : [];
            // tartib: order > id
            const sorted = [...arr].sort((a, b) => {
                const ao = Number.isFinite(a?.order) ? a.order : 9999;
                const bo = Number.isFinite(b?.order) ? b.order : 9999;
                if (ao !== bo) return ao - bo;
                return (a?.id || 0) - (b?.id || 0);
            });
            setData(sorted);
        } catch (e) {
            console.error(e);
            setData([]);
        }
    };

    // Modal ochish (kartani bosganda va “Qabulga yozilish” bosilganda farqlaymiz)
    const openDetail = (item) => {
        setDetail({ open: true, data: item });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section
            id="teachers"
            className="py-10 md:py-14 select-none bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 text-center mb-3">
                    {labels.teamTitle}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-10">
                    {labels.teamDesc}
                </p>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2600, disableOnInteraction: false }}
                    loop={(data?.length || 0) > 1}
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
                    {data?.length ? (
                        data.map((item) => {
                            const fullName =
                                item?.[lang]?.full_name ||
                                item?.uz?.full_name ||
                                item?.en?.full_name ||
                                item?.ru?.full_name ||
                                '';
                            const position =
                                item?.[lang]?.position ||
                                item?.uz?.position ||
                                item?.en?.position ||
                                item?.ru?.position ||
                                '';
                            const reception =
                                item?.[lang]?.reception ||
                                item?.uz?.reception ||
                                item?.en?.reception ||
                                item?.ru?.reception ||
                                '';

                            const photo =
                                item?.photo_url ||
                                item?.photo ||
                                item?.image_url ||
                                item?.image ||
                                null;

                            return (
                                <SwiperSlide
                                    key={
                                        item.id ??
                                        `${fullName}-${Math.random()}`
                                    }
                                    className="!h-auto cursor-pointer active:cursor-grabbing !bg-transparent"
                                >
                                    <article
                                        onClick={() => openDetail(item, false)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) =>
                                            e.key === 'Enter'
                                                ? openDetail(item, false)
                                                : null
                                        }
                                        className="h-full w-full overflow-hidden rounded-2xl shadow-sm
                                            ring-1 ring-slate-200/70 dark:ring-slate-700/60
                                            bg-white dark:bg-slate-800/70 backdrop-blur
                                            transition-shadow duration-200 hover:shadow-lg
                                            md:min-h-[560px]"
                                        aria-label={fullName || 'Expert card'}
                                    >
                                        {/* TOP IMAGE */}
                                        <div className="w-full h-56 md:h-64">
                                            {photo ? (
                                                <img
                                                    src={photo}
                                                    alt={
                                                        fullName ||
                                                        'Expert image'
                                                    }
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
                                        <div className="p-5 flex flex-col h-[calc(100%-theme(space.56))] md:h-[calc(100%-theme(space.64))]">
                                            {/* Name */}
                                            <h3
                                                className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 text-center leading-snug uppercase tracking-wide"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                                title={fullName}
                                            >
                                                {fullName || '—'}
                                            </h3>

                                            {/* Details */}
                                            <div className="mt-3 space-y-2 text-sm leading-relaxed grow">
                                                {position && (
                                                    <p>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            {labels.pos}:{' '}
                                                        </span>
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {position}
                                                        </span>
                                                    </p>
                                                )}
                                                {reception && (
                                                    <p>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            {labels.rec}:{' '}
                                                        </span>
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {reception}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Qabulga yozilish */}
                                            <button
                                                type="button"
                                                className="cursor-pointer mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                                                        bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition
                                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2464AE]"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Swiper slide siljimasin
                                                    openDetail(item, true); // isQabul = true
                                                }}
                                            >
                                                {labels.book}
                                            </button>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <SwiperSlide>
                            <div className="w-full h-[260px] md:h-[320px] grid place-items-center text-slate-500 dark:text-slate-300">
                                {labels.empty}
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* MODAL */}
            <BolimDetailModal
                open={detail.open}
                data={detail.data}
                isQabul={detail.isQabul}
                onClose={() =>
                    setDetail({ open: false, data: null, isQabul: false })
                }
            />
        </section>
    );
};

export default Experts;
