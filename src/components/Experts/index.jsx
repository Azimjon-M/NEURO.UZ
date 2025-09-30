// src/components/Experts.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { User2 } from 'lucide-react';
import ApiResult from '@/services/main';
import BolimDetailModal from '@/components/BolimDetailModal';

const Experts = () => {
    const [data, setData] = useState(null);
    const [detail, setDetail] = useState({ open: false, leader: null });

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

    useEffect(() => {
        (async () => {
            try {
                const res = await (ApiResult.getStaff
                    ? ApiResult.getStaff()
                    : ApiResult.getExperts());
                setData(res); // res.data emas bo‘lishi mumkin
                console.log(res);
            } catch (e) {
                console.error(e);
                setData([]);
            }
        })();
    }, []);

    const raw = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
        ? data.results
        : [];

    // DTO -> UI
    const experts = raw
        .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        .map((dto) => ({
            id: dto.id,
            name: dto.full_name,
            subject: dto?.i18n?.[lang]?.position || dto?.position || '',
            image: dto.photo_url || '',
            schedule: dto?.i18n?.[lang]?.reception || dto?.reception || '',
            phone: dto?.phone || '',
            email: dto?.email || '',
            _dto: dto, // kerak bo'lsa qo'shimcha maydonlar uchun
        }));

    // Modalga mos obyekt (Leaders modali bilan mos kelishi uchun)
    const mapToLeaderShape = (t) => ({
        id: t.id,
        name: t.name,
        role: t.subject, // Leaders modalidagi "role"ga mos
        department: 'Mutaxassis', // bo‘lmasa default
        photo: t.image,
        reception: t.schedule,
        phone: t.phone,
        email: t.email,
    });

    const openDetail = (t) => {
        setDetail({ open: true, leader: mapToLeaderShape(t) });
    };

    const handleBook = (leader) => {
        // BU YERGA bron jarayonini ulang (masalan, router yoki form)
        // masalan: navigate(`/appointments/new?expert_id=${leader.id}`)
        console.log('Book clicked:', leader);
    };

    const bookLabel =
        lang === 'ru'
            ? 'Записаться на приём'
            : lang === 'en'
            ? 'Book appointment'
            : 'Qabulga yozilish';

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
                    Tajribali va fidoyi ustozlar/shifokorlar jamoamiz kelajakni
                    birga quradi.
                </p>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2600, disableOnInteraction: false }}
                    loop={experts.length > 1}
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
                    {experts.length ? (
                        experts.map((t) => {
                            const role = t.subject;
                            return (
                                <SwiperSlide
                                    key={t.id}
                                    className="!h-auto cursor-pointer active:cursor-grabbing !bg-transparent"
                                >
                                    <article
                                        onClick={() => openDetail(t)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) =>
                                            e.key === 'Enter'
                                                ? openDetail(t)
                                                : null
                                        }
                                        className="h-full w-full overflow-hidden rounded-2xl shadow-sm
                      ring-1 ring-slate-200/70 dark:ring-slate-700/60
                      bg-white dark:bg-slate-800/70 backdrop-blur
                      transition-shadow duration-200 hover:shadow-lg
                      md:min-h-[560px]" /* biroz balandroq joy qoldiramiz btn uchun */
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
                                                title={t.name}
                                            >
                                                {t.name}
                                            </h3>

                                            {/* Details */}
                                            <div className="mt-3 space-y-2 text-sm leading-relaxed grow">
                                                {role && (
                                                    <p>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            Lavozim:{' '}
                                                        </span>
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {role}
                                                        </span>
                                                    </p>
                                                )}

                                                {t.schedule && (
                                                    <p>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            Qabul vaqti:{' '}
                                                        </span>
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {t.schedule}
                                                        </span>
                                                    </p>
                                                )}

                                                {t.phone && (
                                                    <p>
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
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            {t.phone}
                                                        </a>
                                                    </p>
                                                )}

                                                {t.email && (
                                                    <p className="break-all">
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            Email:{' '}
                                                        </span>
                                                        <a
                                                            href={`mailto:${t.email}`}
                                                            className="text-[#2464AE] dark:text-blue-300 hover:underline"
                                                            aria-label={`Email manzili ${t.email}`}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            {t.email}
                                                        </a>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Qabulga yozilish */}
                                            <button
                                                type="button"
                                                className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                                                    bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2464AE]"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Swiper slide siljimasin
                                                    openDetail(t);
                                                }}
                                            >
                                                {bookLabel}
                                            </button>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <SwiperSlide>
                            <div className="w-full h-[260px] md:h-[320px] grid place-items-center text-slate-500 dark:text-slate-300">
                                Ma’lumot topilmadi
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Reusable modal (Leaders bilan bir xil) */}
            <BolimDetailModal
                open={detail.open}
                data={data}
                onClose={() => setDetail({ open: false, leader: null })}
                onBook={handleBook}
            />
        </section>
    );
};

export default Experts;
