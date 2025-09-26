import React, { useState, useEffect } from 'react';
import { FaUserTie, FaTimes } from 'react-icons/fa';
import doctor from '@/assets/icons/doctor.png';

/**
 * NEURO — Bo'limlar → Rahbarlar (Clean)
 * - PAGE_SIZE = 6
 * - Card: telefon/email KO'RINMAYDI
 * - Modal: telefon/email/telegram YO'Q
 * - Har cardda va modalda: "Qabulga yozilish" tugmasi
 * - Tugmalarni bir qatorda ushlash: card = h-full flex flex-col, content = flex-1, CTA = mt-auto
 */

// === Demo ma'lumotlar (keyinchalik API dan keladi) ===
const leaders = [
    {
        id: 'ldr-01',
        name: 'Bekzod Karimov',
        role: 'Direktor (Bosh shifokor)',
        degree: 'DSc, Prof.',
        department: 'Markaz rahbariyati',
        photo: doctor,
        phone: '+998 71 123 45 67',
        email: 'b.karimov@neuro.uz',
        telegram: '@bkarimov',
        experienceYears: 18,
        specialties: ['Neyro-onkologiya', 'Qon tomir jarrohligi'],
        languages: ["O'zbek", 'Rus', 'Ingliz'],
        clinicDays: 'Du • Chorshanba • Juma (09:00–12:00)',
        bio: '20 yillik klinik tajriba, 1000+ muvaffaqiyatli operatsiya, 50+ ilmiy maqola.',
    },
    {
        id: 'ldr-02',
        name: 'Saodat Rahimova',
        role: 'Tibbiy ishlar bo‘yicha direktor o‘rinbosari',
        degree: 'PhD',
        department: 'Rahbariyat',
        photo: '',
        phone: '+998 71 200 33 44',
        email: 's.rahimova@neuro.uz',
        telegram: '@srahimova',
        experienceYears: 14,
        specialties: ['Intensiv terapiya', 'Sifat nazorati'],
        languages: ["O'zbek", 'Rus'],
        clinicDays: 'Seshanba • Payshanba (14:00–17:00)',
        bio: 'Reanimatsiya va sifat menejmenti bo‘yicha yetakchi mutaxassis.',
    },
    {
        id: 'ldr-03',
        name: 'Sardor Ismoilov',
        role: 'Bosh jarroh',
        degree: 'MD',
        department: 'Operatsion blok',
        photo: '',
        phone: '+998 71 555 22 11',
        email: 's.ismoilov@neuro.uz',
        telegram: '@ismoilov_md',
        experienceYears: 16,
        specialties: ['Bosh miyya asosi', 'Orqa miya jarrohligi'],
        languages: ["O'zbek", 'Ingliz'],
        clinicDays: 'Har kuni (10:00–12:00)',
        bio: 'Mikroxirurgik amaliyotlarda katta tajriba. Endoskopik usullar bo‘yicha trener.',
    },
    {
        id: 'ldr-04',
        name: 'Madina Abduvaliyeva',
        role: 'Bo‘lim mudiri — Neyro-onkologiya',
        degree: 'PhD',
        department: 'Neyro-onkologiya',
        photo: '',
        phone: '+998 71 777 88 99',
        email: 'm.abduvaliyeva@neuro.uz',
        telegram: '@madina_onco',
        experienceYears: 10,
        specialties: ['Gliomalar', 'Pituiter adenomalar'],
        languages: ["O'zbek", 'Rus'],
        clinicDays: 'Du • Chorshanba (15:00–18:00)',
        bio: 'Klinik va translatsion onkologiya bo‘yicha loyihalar rahbari.',
    },
    {
        id: 'ldr-05',
        name: 'Javlonbek Akbarov',
        role: 'Bo‘lim mudiri — Qon tomir neyroxirurgiyasi',
        degree: 'MD',
        department: 'Qon tomir',
        photo: '',
        phone: '+998 71 660 11 22',
        email: 'j.akbarov@neuro.uz',
        telegram: '@javlon_vascular',
        experienceYears: 12,
        specialties: ['Aneurizma', 'AVM', 'Stenting'],
        languages: ["O'zbek", 'Rus', 'Ingliz'],
        clinicDays: 'Seshanba • Payshanba (10:00–13:00)',
        bio: 'Endovaskulyar va ochiq jarrohlik bo‘yicha kompleks yondashuv.',
    },
    {
        id: 'ldr-06',
        name: 'Dilafruz Yo‘ldosheva',
        role: 'Bo‘lim mudiri — Bolalar neyroxirurgiyasi',
        degree: 'MD',
        department: 'Pediatriya',
        photo: '',
        phone: '+998 71 640 55 00',
        email: 'd.yoldosheva@neuro.uz',
        telegram: '@dilafruz_ped',
        experienceYears: 11,
        specialties: ['Spina bifida', 'Kraniyosinostoz'],
        languages: ["O'zbek", 'Rus'],
        clinicDays: 'Chorshanba • Juma (09:00–12:00)',
        bio: 'Bolalar neyroxirurgiyasida minimal invaziv texnikalar tarafdori.',
    },
    // Demo: paginationni ko‘rish uchun ko‘paytirish (ixtiyoriy)
    ...Array.from({ length: 24 }).map((_, i) => ({
        id: `ldr-x-${i + 1}`,
        name: `Mutaxassis ${i + 1}`,
        role:
            i % 4 === 0
                ? "Bo'lim mudiri"
                : i % 4 === 1
                ? "Bosh shifokor o'rinbosari"
                : i % 4 === 2
                ? 'Bosh jarroh'
                : 'Katta shifokor',
        degree: i % 3 === 0 ? 'MD' : i % 3 === 1 ? 'PhD' : 'DSc',
        department: '—',
        photo: '',
        phone: '+998 71 000 00 00',
        email: `user${i + 1}@neuro.uz`,
        telegram: `@neuro_${i + 1}`,
        experienceYears: 5 + (i % 15),
        specialties: ['Neyroxirurgiya', 'Intensiv terapiya'].slice(
            0,
            (i % 2) + 1
        ),
        languages: ["O'zbek", 'Rus'],
        clinicDays: '—',
        bio: "Qisqa bio ma'lumoti…",
    })),
];

// === Util ===
const cls = (...arr) => arr.filter(Boolean).join(' ');
const initialsAvatar = (name = 'NEURO') =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
    )}&backgroundType=gradientLinear`;

// === Modal (batafsil) — telefon/email/telegram yo‘q, CTA bor
function DetailModal({ open, onClose, leader, onBook }) {
    if (!open || !leader) return null;

    const handleBook = () => {
        if (onBook) return onBook(leader);
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

    return (
        <div
            className="fixed inset-0 z-[3000] grid place-items-center bg-black/50 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200/60 dark:ring-slate-700/60">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60 dark:border-slate-700/60">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {leader.name}
                    </h3>
                    <button
                        aria-label="Yopish"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <FaTimes className="text-slate-500" />
                    </button>
                </div>

                <div className="p-5 grid md:grid-cols-[160px,1fr] gap-5">
                    <img
                        src={leader.photo || initialsAvatar(leader.name)}
                        alt={leader.name}
                        className="w-40 h-40 rounded-2xl object-cover ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                    />
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                            {leader.role}
                        </p>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                            {leader.bio}
                        </p>
                        <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-300">
                            <li>
                                <strong className="text-slate-700 dark:text-slate-200">
                                    Ilmiy daraja:{' '}
                                </strong>
                                {leader.degree || '—'}
                            </li>
                            <li>
                                <strong className="text-slate-700 dark:text-slate-200">
                                    Tajriba:{' '}
                                </strong>
                                {leader.experienceYears}+ yil
                            </li>
                            <li>
                                <strong className="text-slate-700 dark:text-slate-200">
                                    Qabul kunlari:{' '}
                                </strong>
                                {leader.clinicDays || '—'}
                            </li>
                            <li>
                                <strong className="text-slate-700 dark:text-slate-200">
                                    Tillar:{' '}
                                </strong>
                                {(leader.languages || []).join(', ')}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        Yopish
                    </button>
                    <button
                        onClick={handleBook}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-sm font-medium hover:opacity-90"
                    >
                        Qabulga yozilish
                    </button>
                </div>
            </div>
        </div>
    );
}

// ▼▼ DROP-IN: Tugmalarni 1 qatorda ushlab turadigan CARD
// DROP-IN: Rasm bo'limi balandligi imgH = h (px) ga teng.
// Avatar 4x4 + p-2, header -> linear gradient, pastda border.
function LeaderCard({ leader, onOpen, onBook, imgH = 176 }) {
    const openDetail = () => onOpen && onOpen(leader);
    const handleBook = (e) => {
        e.stopPropagation();
        if (onBook) return onBook(leader);
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

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
            {/* PHOTO HEADER — rasm o‘rtada, orqa fon blur (xuddi shu rasm) */}
            <div className="relative overflow-hidden" style={{ height: imgH }}>
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
                    onClick={handleBook}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold
                     text-white dark:text-slate-900
                     bg-gradient-to-r from-indigo-600 to-violet-600
                     dark:from-sky-400 dark:to-indigo-400
                     shadow-md hover:shadow-lg transition-all"
                >
                    Qabulga yozilish
                </button>
            </div>
        </div>
    );
}

// === Pagination util ===
function getPageList(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set([1, total, current, current - 1, current + 1]);
    [...pages].forEach((p) => (p < 1 || p > total) && pages.delete(p));
    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        const p = sorted[i];
        result.push(p);
        const next = sorted[i + 1];
        if (next && next - p > 1) result.push('...');
    }
    return result;
}

function PageButton({ active, disabled, onClick, children, ariaLabel }) {
    return (
        <button
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={onClick}
            className={cls(
                'h-9 min-w-9 px-3 rounded-xl text-sm',
                disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                active
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-transparent text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600'
            )}
        >
            {children}
        </button>
    );
}

// === Asosiy sahifa ===
export default function DeptLeaders() {
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [detail, setDetail] = useState({ open: false, leader: null });

    const totalPages = Math.max(1, Math.ceil(leaders.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, leaders.length);
    const current = leaders.slice(start, end);

    // Qabulga yozilish handler (routerga yoki custom modalingizga ulashing)
    const handleBook = (leader) => {
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [page]);

    return (
        <section className="py-16 bg-white bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        Rahbarlar
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Markaz bo‘limlari rahbarlari va bosh mutaxassislar
                        ro‘yxati.
                    </p>
                </div>

                {/* Grid (items-stretch bilan kartalar balandligi teng) */}
                {current.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch">
                        {current.map((l) => (
                            <LeaderCard
                                key={l.id}
                                leader={l}
                                onOpen={(leader) =>
                                    setDetail({ open: true, leader })
                                }
                                onBook={handleBook}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        Hozircha ma'lumot yo‘q.
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        {start + 1}–{end} / {leaders.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <PageButton
                            ariaLabel="Birinchi"
                            disabled={page === 1}
                            onClick={() => setPage(1)}
                        >
                            {'⟪'}
                        </PageButton>
                        <PageButton
                            ariaLabel="Oldingi"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            {'‹'}
                        </PageButton>
                        {getPageList(page, totalPages).map((p, i) =>
                            p === '...' ? (
                                <span
                                    key={`dots-${i}`}
                                    className="px-2 text-slate-400"
                                >
                                    …
                                </span>
                            ) : (
                                <PageButton
                                    key={p}
                                    ariaLabel={`Sahifa ${p}`}
                                    active={p === page}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </PageButton>
                            )
                        )}
                        <PageButton
                            ariaLabel="Keyingi"
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                        >
                            {'›'}
                        </PageButton>
                        <PageButton
                            ariaLabel="Oxirgi"
                            disabled={page === totalPages}
                            onClick={() => setPage(totalPages)}
                        >
                            {'⟫'}
                        </PageButton>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <DetailModal
                open={detail.open}
                leader={detail.leader}
                onClose={() => setDetail({ open: false, leader: null })}
                onBook={handleBook}
            />
        </section>
    );
}
