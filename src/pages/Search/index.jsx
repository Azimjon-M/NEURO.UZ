import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search() {
    const [params, setParams] = useSearchParams();
    const qFromURL = params.get('q') || '';

    const [q, setQ] = useState(qFromURL);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    // abortable fetch
    const abortRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = q.trim();
        // URL ni yangilaymiz; effect qidirishni ishga tushiradi
        setParams((prev) => {
            const next = new URLSearchParams(prev);
            if (query) next.set('q', query);
            else next.delete('q');
            return next;
        });
    };

    useEffect(() => {
        const query = (params.get('q') || '').trim();
        if (!query) {
            setResults([]);
            setLoading(false);
            setErr('');
            return;
        }

        // eski so'rovni bekor qilish
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setErr('');

        // TODO: API endpointingizni shu yerga qo'ying
        // masalan: /api/search?q=...
        fetch(`/api/search?q=${encodeURIComponent(query)}`, {
            signal: controller.signal,
        })
            .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data) => {
                // data -> Array bo'lishi kutiladi. Agar boshqa format bo'lsa moslashtiring.
                const arr = Array.isArray(data) ? data : data?.results || [];
                setResults(arr);
            })
            .catch((e) => {
                if (e.name !== 'AbortError') setErr(e.message || 'Xatolik');
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [params]);

    // natijani ko'rish uchun kichik normalizator (title/url/desc bo'lmasa ham yiqilmasin)
    const normalized = useMemo(
        () =>
            results.map((it, i) => ({
                id: it.id ?? it._id ?? i,
                title:
                    it.title ??
                    it.name ??
                    it.label ??
                    (typeof it === 'string' ? it : 'Untitled'),
                url: it.url ?? it.link ?? it.path ?? null,
                desc:
                    it.description ??
                    it.summary ??
                    it.snippet ??
                    (typeof it === 'string' ? '' : ''),
            })),
        [results]
    );

    return (
        <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4 py-10">
            {/* Markazdagi qidiruv formasi */}
            <form
                onSubmit={handleSubmit}
                className="lg:hidden mx-auto max-w-xl rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl p-3"
            >
                <div className="flex w-full">
                    <div className="flex items-center gap-2 flex-1 pl-3 pr-2 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <AiOutlineSearch className="shrink-0 text-slate-500 dark:text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') setQ('');
                            }}
                            type="text"
                            placeholder="Qidirish..."
                            className="w-full bg-transparent outline-none py-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-r-xl font-semibold bg-[#2464AE] hover:bg-[#1f59a0] text-white border border-l-0 border-slate-200 dark:border-slate-700 transition-colors"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        Qidirish
                    </button>
                </div>
            </form>

            {/* Pastdagi natijalar */}
            <div className="max-w-3xl mx-auto mt-6">
                {loading && (
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <span className="inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                        <span>Yuklanmoqda…</span>
                    </div>
                )}

                {!loading && err && (
                    <div className="text-red-600 dark:text-red-400">
                        Xatolik: {err}
                    </div>
                )}

                {!loading && !err && normalized.length === 0 && qFromURL && (
                    <div className="text-slate-600 dark:text-slate-300">
                        Natija topilmadi.
                    </div>
                )}

                {!loading && !err && !qFromURL && (
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                        Qidiruv so‘rovini kiriting va “Qidirish” tugmasini
                        bosing.
                    </div>
                )}

                <ul className="mt-4 space-y-3">
                    {normalized.map((item) => (
                        <li
                            key={item.id}
                            className="p-4 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 shadow-sm"
                        >
                            {item.url ? (
                                <a
                                    href={item.url}
                                    className="font-semibold text-[#2464AE] dark:text-blue-300 hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.title}
                                </a>
                            ) : (
                                <div className="font-semibold text-slate-800 dark:text-slate-100">
                                    {item.title}
                                </div>
                            )}
                            {item.desc && (
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    {item.desc}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
