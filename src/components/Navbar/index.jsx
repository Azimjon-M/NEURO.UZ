import React, { useState } from 'react';
import { NavLink, Link, useLocation, matchPath } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '@/assets/logo/newLogo.png';
import routes from '@/routes';
import TextTranslate from '@/utils/TextTranslate';
import ChangeLanguage from '../ChangeLang'; // siz bergan LanguageDropdown default export
import MobileMenu from './styled.jsx';

const thisComponent = 'navbar';
const cleanKey = (k) =>
    typeof k === 'string' && k.includes('.') ? k.split('.').pop() : k;
const T = ({ id, fallback }) => (
    <TextTranslate data={[thisComponent, cleanKey(id)]} fallback={fallback} />
);

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
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

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4">
                {/* MOBILE TOP BAR (lg↓) */}
                <div className="lg:hidden flex items-center justify-between py-2">
                    <button
                        onClick={toggleMenu}
                        aria-label="Open menu"
                        className="p-2"
                    >
                        {menuOpen ? (
                            <AiOutlineClose size={24} />
                        ) : (
                            <GiHamburgerMenu size={24} />
                        )}
                    </button>

                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={Logo}
                            alt="NEURO"
                            className="h-9 w-9 object-contain"
                        />
                        <span className="text-lg font-bold text-[#2865AE]">
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
                        <span className="text-xl font-bold text-[#2865AE]">
                            NEURO
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="flex items-center gap-6">
                        {routes.map((route) => {
                            if (route.hidden) return null;
                            const parentActive = isParentActive(
                                route,
                                pathname
                            );

                            // PARENT (dropdown)
                            if (route.children?.length) {
                                return (
                                    <li
                                        key={route.id}
                                        className="relative group"
                                    >
                                        <button
                                            type="button"
                                            className={`inline-flex items-center gap-1.5 text-[#2865AE] transition-colors ${
                                                parentActive
                                                    ? 'font-semibold underline'
                                                    : 'hover:text-[#1d4ed8]'
                                            }`}
                                            aria-haspopup="menu"
                                            aria-expanded={
                                                parentActive ? 'true' : 'false'
                                            }
                                        >
                                            <T
                                                id={route.titleID}
                                                fallback={route.title}
                                            />
                                            <FaAngleRight
                                                className={`transition-transform duration-200 ${
                                                    parentActive
                                                        ? 'rotate-90'
                                                        : 'rotate-0'
                                                } group-hover:rotate-90`}
                                            />
                                        </button>

                                        {/* Dropdown */}
                                        <ul
                                            className="
                        invisible opacity-0 translate-y-1
                        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                        focus-within:visible focus-within:opacity-100 focus-within:translate-y-0
                        absolute left-0 top-full mt-2 min-w-[240px]
                        rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 z-50
                        p-2 space-y-1
                      "
                                            role="menu"
                                        >
                                            {route.children.map((child) => (
                                                <li key={child.id} role="none">
                                                    <NavLink
                                                        to={child.path}
                                                        role="menuitem"
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            `block px-4 py-2 rounded-lg transition-colors ${
                                                                isActive
                                                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                                                    : 'hover:bg-gray-100 text-gray-800'
                                                            }`
                                                        }
                                                    >
                                                        <T
                                                            id={child.titleID}
                                                            fallback={
                                                                child.title
                                                            }
                                                        />
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }

                            // LEAF
                            return (
                                <NavLink
                                    key={route.id}
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `text-[#2865AE] transition-colors ${
                                            isActive
                                                ? 'font-semibold underline'
                                                : 'hover:text-[#1d4ed8]'
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
                </div>
            </nav>

            {/* Mobile aside menu */}
            {shouldRender && (
                <MobileMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
            )}
        </div>
    );
};

export default Navbar;
