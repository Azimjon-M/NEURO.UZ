// src/pages/news/Yangiliklar.jsx
import React, { useState } from 'react';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import idPark from '@/assets/fons/astro.png';

const NewsCenter = () => {
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);

    const newsData = [
        {
            id: 1,
            title: 'Markazda yangi ilmiy-amaliy konferensiya o‘tkazildi, IU asjdjas oaosdk asodko saoko , sodjkaosdk okoa dsl',
            description:
                'Neyroxirurgiya markazida xalqaro miqyosdagi ilmiy-amaliy konferensiya o‘tkazildi. Unda ko‘plab xorijiy va mahalliy mutaxassislar ishtirok etdi. Asdhjs ashjdjko as ijiojio',
            image: idPark,
            date: '25.09.2025',
        },
        {
            id: 2,
            title: 'Talabalar uchun ochiq seminar tashkil etildi',
            description:
                'Seminar davomida talabalarga neyroxirurgiya sohasidagi yangi texnologiyalar va amaliy mashg‘ulotlar namoyish qilindi.',
            image: '',
            date: '20.09.2025',
        },
        {
            id: 3,
            title: 'Markazda zamonaviy diagnostika uskunalari joriy etildi',
            description:
                'Yangi asbob-uskunalar yordamida bemorlarni tez va aniq diagnostika qilish imkoniyati yaratildi.',
            image: '',
            date: '10.09.2025',
        },
        // Demo uchun 10 ta yangilik qo‘shib qo‘yish mumkin
        {
            id: 4,
            title: 'Yangi laboratoriya ochildi',
            description:
                'Markazda zamonaviy neyrofiziologik laboratoriya ishga tushirildi.',
            image: '',
            date: '05.09.2025',
        },
        {
            id: 5,
            title: 'Ochiq eshiklar kuni',
            description:
                'Markazda bemorlar va ularning yaqinlari uchun maxsus tanishtiruv kuni o‘tkazildi.',
            image: '',
            date: '01.09.2025',
        },
        {
            id: 6,
            title: 'Xalqaro hamkorlik memorandumi imzolandi',
            description:
                'Rossiya va Germaniya neyroxirurgiya markazlari bilan hamkorlik memorandumi imzolandi.',
            image: '',
            date: '25.08.2025',
        },
        {
            id: 7,
            title: 'Onlayn konsultatsiyalar yo‘lga qo‘yildi',
            description:
                'Endi bemorlar masofadan turib shifokor bilan maslahatlashishi mumkin.',
            image: '',
            date: '20.08.2025',
        },
    ];

    // Pagination hisoblash
    const totalPages = Math.max(1, Math.ceil(newsData.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, newsData.length);
    const currentNews = newsData.slice(start, end);

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        Yangiliklar
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Markazimizda o‘tkazilgan eng so‘nggi tadbir va
                        yangiliklar bilan tanishing.
                    </p>
                </div>

                {/* Cards grid */}
                {currentNews.length ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentNews.map((item) => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        Hozircha yangiliklar yo‘q.
                    </div>
                )}

                {/* Pagination */}
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    totalItems={newsData.length}
                    start={start}
                    end={end}
                />
            </div>
        </section>
    );
};

export default NewsCenter;
