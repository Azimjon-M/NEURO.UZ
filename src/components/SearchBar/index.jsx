import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export default function SearchBar({ isSearch, setIsSearch }) {
    const rootRef = useRef(null); // ✅ 1) root ref

    // tashqariga bosilganda yopish
    useEffect(() => {
        const onPointerDown = (e) => {
            if (!isSearch) return;
            const el = rootRef.current;
            if (el && !el.contains(e.target)) setIsSearch(false);
        };
        // capture=True — ichkarida stopPropagation bo‘lsa ham ushlaydi
        document.addEventListener('pointerdown', onPointerDown, true);
        return () =>
            document.removeEventListener('pointerdown', onPointerDown, true);
    }, [isSearch, setIsSearch]);

    // --- localStorage: so'nggi izlanganlar ---
    const LS_KEY = 'neuro_recent_searches';
    const MAX_RECENTS = 8;
    const readRecents = () => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch {
            return [];
        }
    };
    const [recents, setRecents] = useState(() => readRecents());

    const writeRecents = (list) => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(list));
        } catch (err) {
            console.log(err);
        }
    };

    const handleAfterSearch = (query) => {
        console.log('Searching for:', query);
    };

    const formik = useFormik({
        initialValues: { q: '' },
        onSubmit: ({ q }) => {
            const query = q.trim();
            if (!query) return;

            const next = [
                { id: Date.now(), q: query },
                ...recents.filter((r) => r.q !== query),
            ].slice(0, MAX_RECENTS);
            setRecents(next);
            writeRecents(next);
            handleAfterSearch(query);
        },
    });

    const removeRecent = (id) => {
        const next = recents.filter((r) => r.id !== id);
        setRecents(next);
        writeRecents(next);
    };
    const clearAllRecents = () => {
        setRecents([]);
        writeRecents([]);
    };

    return (
        <div
            ref={rootRef}
            className={`
                          w-full
                          fixed inset-x-0 top-[60px] lg:top-[80px] z-30 py-4
                          transition-[opacity, transform] duration-500
                          ${
                              isSearch
                                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                                  : 'opacity-0 -translate-y-4 pointer-events-none'
                          }
                      `}
        >
            <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                {/* Input + SEARCH button group */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl p-3"
                >
                    <div className="flex w-full">
                        <div className="flex items-center gap-2 flex-1 pl-3 pr-2 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <AiOutlineSearch className="shrink-0 text-slate-500 dark:text-slate-400" />
                            <input
                                name="q"
                                value={formik.values.q}
                                onChange={formik.handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') setIsSearch(false);
                                }}
                                type="text"
                                placeholder="Qidirish..."
                                className="w-full bg-transparent outline-none py-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                                          px-5 py-2 rounded-r-xl font-semibold
                                          bg-[#2464AE] hover:bg-[#1f59a0] text-white
                                          border border-l-0 border-slate-200 dark:border-slate-700
                                          transition-colors
                                      "
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            Qidirish
                        </button>
                    </div>
                </form>

                {/* So'nggi izlanganlar */}
                <div className="mt-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            So‘nggi izlanganlar
                        </span>
                        {recents.length > 0 && (
                            <button
                                type="button"
                                onClick={clearAllRecents}
                                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            >
                                Hammasini tozalash
                            </button>
                        )}
                    </div>

                    {recents.length === 0 ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Hali izlanmagan.
                        </p>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {recents.map((r) => (
                                <li key={r.id}>
                                    <div className="group flex items-center gap-2 pl-3 pr-1 py-1 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                formik.setFieldValue('q', r.q);
                                                formik.handleSubmit();
                                            }}
                                            className="text-sm hover:underline"
                                            title="Ushbu so'rovni qidirish"
                                            style={{
                                                WebkitTapHighlightColor:
                                                    'transparent',
                                            }}
                                        >
                                            {r.q}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeRecent(r.id)}
                                            className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                                            title="O‘chirish"
                                            aria-label="O‘chirish"
                                            style={{
                                                WebkitTapHighlightColor:
                                                    'transparent',
                                            }}
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
