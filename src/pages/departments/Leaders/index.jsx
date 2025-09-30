import React, { useState } from 'react';
import BolimDetailModal from '@/components/BolimDetailModal';
import BolimCard from '@/components/BolimCard';
import Pagination from '@/components/Pagination';

import { leaders } from '@/db.js';

export default function DeptLeaders() {
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [detail, setDetail] = useState({ open: false, leader: null });
    const totalPages = Math.max(1, Math.ceil(leaders.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, leaders.length);
    const currentLeaders = leaders.slice(start, end);

    const handleBook = (leader) => {
        const q = new URLSearchParams({
            leaderId: leader.id,
            name: leader.name,
        }).toString();
        window.location.href = `/qabul?${q}`;
    };

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        Rahbarlar
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Markaz bo‘limlari rahbarlari va bosh mutaxassislar
                        ro‘yxati.
                    </p>
                </div>

                {currentLeaders.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch">
                        {currentLeaders.map((l) => (
                            <BolimCard
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
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    totalItems={leaders.length}
                    start={start}
                    end={end}
                />
            </div>

            <BolimDetailModal
                open={detail.open}
                leader={detail.leader}
                onClose={() => setDetail({ open: false, leader: null })}
                onBook={handleBook}
            />
        </section>
    );
}
