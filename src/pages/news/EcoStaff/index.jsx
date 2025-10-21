import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';
import ApiResult from '@/services/news';
import { Languages } from '@/context/LanguageContext';
import NewsCard from '@/components/NewsCard';
import NewsModal from '@/components/NewsModal';

const PAGE_SIZE = 6;

const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
};

export default function NewsEcoStaff() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const lang = (language || 'uz').toLowerCase();

    const [raw, setRaw] = useState([]);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({ open: false, item: null });

    const UI = {
        uz: {
            title: 'Ekofaol hodim',
            desc: 'Markazimizda ekologik tashabbuslar: ko‘chat ekish, chiqindilarni saralash, energiya tejamkorlik va “yashil” loyihalar haqida ma’lumotlar.',
            empty: 'Hozircha ekofaol hodim bo‘yicha yangiliklar yo‘q.',
        },
        ru: {
            title: 'Экоактивный сотрудник',
            desc: 'Экологические инициативы нашего центра: посадка деревьев, раздельный сбор отходов, энергоэффективность и «зелёные» проекты.',
            empty: 'Пока нет новостей по экоактивному сотруднику.',
        },
        en: {
            title: 'Eco-active Employee',
            desc: 'Our center’s green initiatives: tree planting, waste sorting, energy efficiency, and other sustainability projects.',
            empty: 'No eco-active employee updates yet.',
        },
    };

    const L = UI[lang] || UI.uz;

    const getData = async () => {
        try {
            const res = await ApiResult.getEcoStaff();
            setRaw(res?.results);
        } catch {
            setRaw([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // API -> eski NewsCard prop'lariga mos normalize
    const data = useMemo(() => {
        return (raw || []).map((n) => {
            const title =
                n?.titles?.[lang] ||
                n?.title ||
                n?.titles?.uz ||
                n?.titles?.en ||
                n?.titles?.ru ||
                '';
            const description =
                n?.descriptions?.[lang] ||
                n?.description ||
                n?.descriptions?.uz ||
                n?.descriptions?.en ||
                n?.descriptions?.ru ||
                '';
            const image =
                n?.media?.find((m) => m.media_type === 'image')?.file ||
                n?.media?.[0]?.file ||
                '';
            const date = formatDate(n?.posted_at || n?.created_at || '');
            return { id: n.id, title, description, image, date, _raw: n };
        });
    }, [raw, lang]);

    // Pagination
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, totalItems);
    const currentNews = data.slice(start, end);

    const openModal = (item) => setModal({ open: true, item: item._raw });
    const closeModal = () => setModal({ open: false, item: null });

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description (eski ko'rinish) */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {L.title}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {L.desc}
                    </p>
                </div>

                {/* Cards grid (eski: sm:2, lg:3) */}
                {currentNews.length ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentNews.map((item) => (
                            <NewsCard
                                key={item.id}
                                data={item}
                                onOpen={() => openModal(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        {L.empty}
                    </div>
                )}

                {/* Pagination (eski) */}
                {currentNews.length > 0 && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        start={start}
                        end={end}
                    />
                )}
            </div>

            {/* Modal (batafsil) */}
            <NewsModal
                open={modal.open}
                data={modal.item}
                onClose={closeModal}
            />
        </section>
    );
}
