// src/components/Navbar/styled.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import routes from '@/routes';
import TextTranslate from '@/utils/TextTranslate';
import { useFormik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';

const thisComponent = 'navbar';
const cleanKey = (k) =>
    typeof k === 'string' && k.includes('.') ? k.split('.').pop() : k;
const T = ({ id, fallback }) => (
    <TextTranslate data={[thisComponent, cleanKey(id)]} fallback={fallback} />
);

export default function Assidebar({ isOpen, toggleMenu }) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [openIds, setOpenIds] = useState(() => new Set());
    const [enter, setEnter] = useState(false); // 🔹 kirish animatsiyasi flag
    const panelRef = useRef(null);
    // const [isSearch, setIsSearch] = useState(false);

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
    const writeRecents = (list) => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(list));
        } catch (err) {
            console.log(err);
        }
    };

    const [recents, setRecents] = useState(() => readRecents());

    const handleAfterSearch = (query) => {
        console.log('Searching for:', query);
        // ❗️Bu yerda real qidiruv amalingizni bajaring (navigate, fetch, h.k.)
        // masalan: navigate(`/search?q=${encodeURIComponent(query)}`)
        // xohlasangiz: setIsSearch(false);
    };

    // --- Formik ---
    const formik = useFormik({
        initialValues: { q: '' },
        onSubmit: ({ q }) => {
            const query = q.trim();
            if (!query) return;

            // recents ni yangilash (unique + limit)
            const next = [
                { id: Date.now(), q: query },
                ...recents.filter((r) => r.q !== query),
            ].slice(0, MAX_RECENTS);
            setRecents(next);
            writeRecents(next);

            handleAfterSearch(query);
        },
    });

    // Mount/Unmount + animatsiyalar
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true); // panel DOMga kirsin
            setEnter(false); // boshlang'ich holat: ekrandan tashqarida
            const id = requestAnimationFrame(() => setEnter(true)); // keyingi freymda translate-x-0
            return () => cancelAnimationFrame(id);
        } else {
            setEnter(false); // chiqish animatsiyasi uchun -translate-x-full
            const t = setTimeout(() => setShouldRender(false), 300); // 300ms = duration-300
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // menyu yopilganda accordionni tozalash
    useEffect(() => {
        if (!isOpen) setOpenIds(new Set());
    }, [isOpen]);

    if (!shouldRender) return null;

    const toggleParent = (id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <aside
            ref={panelRef}
            data-mm-panel
            className={`
                fixed left-0 top-[60px]
                h-[calc(100vh-60px)]
                w-[82%] max-w-[340px]
                bg-white dark:bg-slate-900
                text-slate-800 dark:text-slate-100
                border-r border-slate-200/70 dark:border-slate-700/60
                shadow-2xl
                overflow-y-auto overscroll-contain
                transform will-change-transform transition-transform duration-300 ease-out
                ${enter ? 'translate-x-0' : '-translate-x-full'}
                lg:hidden z-[51]
            `}
            onClick={(e) => e.stopPropagation()} // overlayga ketmasin
        >
            <div>
                <form onSubmit={formik.handleSubmit} className="p-3">
                    <div className="flex w-full">
                        <div className="flex items-center gap-2 flex-1 pl-3 pr-2 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <AiOutlineSearch className="shrink-0 text-slate-500 dark:text-slate-400" />
                            <input
                                name="q"
                                value={formik.values.q}
                                onChange={formik.handleChange}
                                // onKeyDown={(e) => {
                                //     if (e.key === 'Escape') setIsSearch(false);
                                // }}
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
            </div>
            <nav className="px-3 py-3">
                <ul className="space-y-1">
                    {routes
                        .filter((r) => !r.hidden)
                        .map((route) => {
                            if (route.children?.length) {
                                const open = openIds.has(route.id);
                                return (
                                    <li key={route.id}>
                                        {/* Parent row (accordion toggler) */}
                                        <button
                                            onClick={() =>
                                                toggleParent(route.id)
                                            }
                                            aria-expanded={open}
                                            className="
                                                w-full flex items-center justify-between
                                                px-3 py-2 rounded-lg text-left font-semibold
                                                text-[#2464AE] dark:text-blue-300
                                                hover:bg-slate-100 dark:hover:bg-slate-800
                                                transition-colors
                                            "
                                        >
                                            <span>
                                                <T
                                                    id={route.titleID}
                                                    fallback={route.title}
                                                />
                                            </span>
                                            <FaAngleRight
                                                className={`transition-transform ${
                                                    open ? 'rotate-90' : ''
                                                }`}
                                            />
                                        </button>

                                        {/* Children list (smooth collapse) */}
                                        <div
                                            className={`grid transition-[grid-template-rows] duration-300 ${
                                                open
                                                    ? 'grid-rows-[1fr]'
                                                    : 'grid-rows-[0fr]'
                                            }`}
                                        >
                                            <ul className="overflow-hidden pl-3 border-l border-slate-200 dark:border-slate-700 ml-2">
                                                {route.children.map((child) => (
                                                    <li key={child.id}>
                                                        <NavLink
                                                            to={child.path}
                                                            onClick={toggleMenu}
                                                            className={({
                                                                isActive,
                                                            }) => `
                                                                flex items-center gap-2 px-3 py-2 rounded-md text-sm
                                                                text-[#2464AE] dark:text-blue-300
                                                                ${
                                                                    isActive
                                                                        ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-200'
                                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                                                }
                                                            `}
                                                        >
                                                            <span className="inline-block w-1 h-1 rounded-full bg-current opacity-70" />
                                                            <T
                                                                id={
                                                                    child.titleID
                                                                }
                                                                fallback={
                                                                    child.title
                                                                }
                                                            />
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            }

                            // leaf
                            return (
                                <li key={route.id}>
                                    <NavLink
                                        to={route.path}
                                        onClick={toggleMenu}
                                        className={({ isActive }) => `
                                            block px-3 py-2 rounded-lg font-medium
                                            text-[#2464AE] dark:text-blue-300
                                            ${
                                                isActive
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }
                                        `}
                                    >
                                        <T
                                            id={route.titleID}
                                            fallback={route.title}
                                        />
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </aside>
    );
}
