import { FaUserTie } from 'react-icons/fa';

const cls = (...arr) => arr.filter(Boolean).join(' ');

export default function BolimCard({ leader, onOpen }) {
    const openDetail = () => onOpen && onOpen(leader);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={openDetail}
            onKeyDown={(e) => e.key === 'Enter' && openDetail()}
            className={cls(
                'h-full flex flex-col rounded-3xl cursor-pointer overflow-hidden',
                'bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950',
                'border border-slate-200/70 dark:border-slate-700/60',
                'shadow-[0_6px_24px_rgba(2,6,23,.06)] hover:shadow-[0_12px_32px_rgba(2,6,23,.10)]',
                'transition-all duration-300'
            )}
        >
            {/* 1) Rasm bo‘limi — BALANDLIK ANIQLANADI: imgH = h */}
            <div className="relative overflow-hidden h-[300px] sm:h-[250px] md:h-[300px] lg:h-[250px] xl:h-[300px]">
                {leader.photo ? (
                    <>
                        {/* BACKGROUND: shu rasm blur qilingan, to‘liq qoplaydi */}
                        <img
                            src={leader.photo}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-70 scale-110 transform-gpu"
                            loading="lazy"
                            decoding="async"
                            onError={(e) =>
                                (e.currentTarget.style.display = 'none')
                            }
                        />

                        {/* FOREGROUND: ayni rasm, O‘RTADA, o‘lchamni sening h-full/w-auto boshqaradi */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={leader.photo}
                                alt={leader.name}
                                className="h-full w-auto object-cover"
                                loading="lazy"
                                decoding="async"
                                onError={(e) =>
                                    (e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                        leader.name
                                    )}&backgroundType=gradientLinear`)
                                }
                            />
                        </div>
                    </>
                ) : (
                    // Fallback: rasm bo'lmasa — markazda ikon
                    <div className="absolute inset-0 grid place-items-center">
                        <FaUserTie className="w-8 h-8 text-slate-400" />
                    </div>
                )}
            </div>

            {/* 2) Kontent bo‘limi */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-6 text-center flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-extrabold tracking-wide uppercase text-slate-800 dark:text-slate-100">
                    {leader.name}
                </h3>

                <div className="mt-3 mb-3 space-y-2 text-[15px] leading-6 text-slate-600 dark:text-slate-300 min-h-[72px] md:min-h-[90px]">
                    {leader.role && (
                        <p>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                Lavozim:
                            </span>{' '}
                            <span>{leader.role}</span>
                        </p>
                    )}
                    {leader.clinicDays && (
                        <p>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                Qabul vaqti:
                            </span>{' '}
                            <span>{leader.clinicDays}</span>
                        </p>
                    )}
                </div>

                {/* CTA pastda bir qatorda */}
                <button
                    onClick={openDetail}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold
                      text-white dark:text-slate-900 cursor-pointer
                      bg-[#2464AE] hover:bg-[#1f59a0] dark:bg-blue-600 dark:hover:bg-blue-500
                        shadow-md hover:shadow-lg transition-all"
                >
                    Qabulga yozilish
                </button>
            </div>
        </div>
    );
}
