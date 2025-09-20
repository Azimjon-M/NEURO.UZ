import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, matchPath } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import Logo from '@/assets/logo/newLogo.png';
import routes from '@/routes';
import TextTranslate from '@/utils/TextTranslate';
import ChangeLanguage from '../ChangeLang';
import Assidebar from '@/components/Assidebar';
import SearchBar from '@/components/SearchBar';

const thisComponent = 'navbar';
const cleanKey = (k) =>
    typeof k === 'string' && k.includes('.') ? k.split('.').pop() : k;
const T = ({ id, fallback }) => (
    <TextTranslate data={[thisComponent, cleanKey(id)]} fallback={fallback} />
);

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const { pathname } = useLocation();

    const toggleMenu = () => {
        if (!menuOpen) {
            setShouldRender(true);
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
            setTimeout(() => setShouldRender(false), 300);
        }
    };

    // --- SEARCH panel holati ---

    // child active → parent active
    const isParentActive = (route, currentPath) => {
        if (!route?.children?.length) return false;
        return route.children.some(
            (child) =>
                matchPath(
                    { path: `${child.path}/*`, end: false },
                    currentPath
                ) || matchPath({ path: child.path, end: true }, currentPath)
        );
    };

    // Search
    const handleSearch = () => {
        setIsSearch(!isSearch);
    };

    // 🔒 Mobil holatda body scroll lock/unlock (aniq tozalanadi)
    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 1023.98px)').matches;
        if (!isMobile) return; // faqat lg dan pastda
        const prev = document.body.style.overflow;
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = prev || '';
        }
        return () => {
            document.body.style.overflow = prev || '';
        };
    }, [menuOpen]);

    // hooks tepasiga qo‘ying:
    // 🔹 Aside tashqarisiga bosilganda yopish (overlay bo‘lmasa ham ishlaydi)
    useEffect(() => {
        if (!menuOpen) return;
        const onDocClick = (e) => {
            const inPanel = e.target.closest('[data-mm-panel]');
            const onTrigger = e.target.closest('[data-mm-trigger]');
            if (!inPanel && !onTrigger) {
                setMenuOpen(false);
                setTimeout(() => setShouldRender(false), 300);
            }
        };
        document.addEventListener('click', onDocClick, true);
        return () => document.removeEventListener('click', onDocClick, true);
    }, [menuOpen]);

    return (
        <div
            className="
                    w-full h-[60px] lg:h-[80px] flex items-center
                    sticky top-0 z-50
                    bg-white/90 dark:bg-slate-900/80 backdrop-blur
                "
        >
            {/* SEARCH PANEL — nav (z-40) orqasidan sirg‘alib tushadi */}
            <SearchBar isSearch={isSearch} setIsSearch={setIsSearch} />

            <nav className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4 z-40">
                {/* MOBILE TOP BAR (lg↓) */}
                <div className="lg:hidden flex items-center justify-between py-2 text-slate-700 dark:text-slate-200">
                    <button
                        onClick={toggleMenu}
                        aria-label="Open menu"
                        data-mm-trigger
                        className="cursor-pointer text-[#2464AE] dark:text-blue-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        {menuOpen ? (
                            <AiOutlineClose size={22} />
                        ) : (
                            <GiHamburgerMenu size={22} />
                        )}
                    </button>

                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={Logo}
                            alt="NEURO"
                            className="h-9 w-9 object-contain"
                        />
                        <span className="text-lg font-bold text-[#2464AE] dark:text-blue-300">
                            NEURO
                        </span>
                    </Link>

                    <ChangeLanguage />
                </div>

                {/* DESKTOP BAR (lg↑) */}
                <div className="hidden lg:flex items-center justify-between py-2">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={Logo}
                            alt="NEURO"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="text-xl font-bold text-[#2464AE] dark:text-blue-300">
                            NEURO
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="flex items-center gap-4">
                        {routes.map((route) => {
                            if (route.hidden) return null;
                            const parentActive = isParentActive(
                                route,
                                pathname
                            );

                            if (route.children?.length) {
                                return (
                                    <li
                                        key={route.id}
                                        className="relative group cursor-pointer"
                                    >
                                        <button
                                            type="button"
                                            aria-haspopup="menu"
                                            aria-expanded={
                                                parentActive ? 'true' : 'false'
                                            }
                                            className={`
                                                inline-flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer text-[#2464AE] dark:text-blue-300
                                                ${
                                                    parentActive
                                                        ? 'font-semibold underline'
                                                        : 'hover:text-[#2464AE] dark:hover:text-blue-300'
                                                }
                                            `}
                                        >
                                            <T
                                                id={route.titleID}
                                                fallback={route.title}
                                            />
                                            <FaAngleRight
                                                className={`
                                                    transition-transform duration-200 text-[#2464AE] dark:text-blue-300
                                                    ${
                                                        parentActive
                                                            ? 'rotate-90'
                                                            : 'rotate-0'
                                                    } group-hover:rotate-90
                                                `}
                                            />
                                        </button>

                                        {/* Dropdown */}
                                        <div
                                            className="
                                                absolute left-0 top-full pt-3 mt-0 z-50
                                                opacity-0 translate-y-5 pointer-events-none
                                                transition-all duration-300
                                                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                                                group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto
                                            "
                                        >
                                            <ul
                                                role="menu"
                                                className="
                                                    min-w-[240px] p-2 space-y-1 rounded-md
                                                    bg-white dark:bg-slate-800
                                                    text-slate-800 dark:text-slate-100
                                                    shadow-2xl  ring-slate-200 dark:ring-slate-700
                                                    border-l-4 border-[#2464AE]
                                                "
                                            >
                                                {route.children.map((child) => (
                                                    <li
                                                        key={child.id}
                                                        role="none"
                                                    >
                                                        <NavLink
                                                            to={child.path}
                                                            role="menuitem"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                `block px-4 py-2 rounded-lg transition-colors text-[#2464AE] dark:text-blue-300 ${
                                                                    isActive
                                                                        ? 'bg-blue-50 dark:bg-slate-700 font-semibold'
                                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                                                                }`
                                                            }
                                                        >
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

                            // LEAF
                            return (
                                <NavLink
                                    key={route.id}
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `transition-colors text-[#2464AE] dark:text-blue-300 whitespace-nowrap ${
                                            isActive
                                                ? 'font-semibold underline'
                                                : 'hover:text-[#2464AE] dark:hover:text-blue-300'
                                        }`
                                    }
                                >
                                    <T
                                        id={route.titleID}
                                        fallback={route.title}
                                    />
                                </NavLink>
                            );
                        })}
                    </ul>

                    {/* Language (desktop right) */}
                    <ChangeLanguage />

                    <button
                        onClick={handleSearch}
                        className="inline-flex items-center gap-2 px-2 py-2 rounded-lg
                            bg-transparent cursor-pointer transition-colors duration-150
                            text-slate-800 dark:text-slate-100
                            hover:bg-gray-100 active:bg-gray-200
                            dark:hover:bg-slate-700 dark:active:bg-slate-600
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                    >
                        <BiSearch
                            size={20}
                            className="text-[#2464AE] dark:text-blue-300"
                        />
                    </button>
                </div>
            </nav>

            {/* 🔷 Overlay: tashqi joyga bosilsa yopiladi (faqat mobil) */}
            {menuOpen && (
                <button
                    type="button"
                    aria-label="Close menu overlay"
                    onClick={toggleMenu}
                    className="
                        fixed inset-0 top-[60px] bg-black/30
                        lg:hidden z-40
                    "
                />
            )}

            {/* Mobile aside menu */}
            {shouldRender && (
                <Assidebar isOpen={menuOpen} toggleMenu={toggleMenu} />
            )}
        </div>
    );
};

export default Navbar;
