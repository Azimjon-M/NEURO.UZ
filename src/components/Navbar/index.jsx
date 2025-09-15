// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaAngleRight, FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '../../assets/logo/newLogo.png';
import routes from '../../routes';
import TextTranslate from '../../utils/TextTranslate';
import ChangeLanguage from '../ChangeLang';
import { LuLogOut } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import MobileMenu from './styled.jsx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Hozircha qo'lda
    const [shouldRender, setShouldRender] = useState(false);
    const thisComponent = 'navbar';
    const [togglerLangDrop, setTogglerLangDrop] = useState(false);
    const dropdownRef = useRef(null); // tashqi bosishni aniqlash uchun ref

    const toggleMenu = () => {
        if (!menuOpen) {
            setShouldRender(true);
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
            // 300ms dan so‘ng DOMdan o‘chiramiz (animatsiya tugagach)
            setTimeout(() => setShouldRender(false), 300);
        }
    };

    // tashqi bosishda yopish effekti
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setTogglerLangDrop(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-center shadow-md sticky top-0 z-50 bg-white p-1 sm:p-2">
            <nav className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] flex justify-between items-center px-4 py-2">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={Logo}
                        alt="NEURO"
                        className="h-10 w-10 object-contain"
                    />
                    <div className="text-xl text-[#2865AE] dark:text-white font-bold leading-5">
                        <span className="block">NEURO</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-6">
                    {routes.map((route) => {
                        if (route.hidden) return null;
                        const data = [thisComponent, route?.titleID];
                        return (
                            <NavLink
                                key={route.id}
                                to={route.path}
                                className={({ isActive }) => `
                                    text-[#2865AE]
                                    ${
                                        isActive
                                            ? 'dark:text-white font-semibold underline'
                                            : ''
                                    }
                                `}
                            >
                                <TextTranslate data={data} />
                            </NavLink>
                        );
                    })}
                </ul>
                <div className="flex items-center">
                    <div className="flex justify-end">
                        <ChangeLanguage />
                        {/* Auth section */}
                        <div className="hidden md:flex items-end">
                            {!isLoggedIn ? (
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsLoggedIn(true)}
                                    className="bg-[#F36523] text-white font-medium rounded px-4 py-2 hover:bg-[#f35a23]"
                                >
                                    <TextTranslate
                                        data={[thisComponent, '11']}
                                    />
                                </NavLink>
                            ) : (
                                <div
                                    ref={dropdownRef}
                                    className="relative font-medium"
                                >
                                    {/* Dropdown ochuvchi tugma */}
                                    <div className="p-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // bosishda event bubble bo‘lmasin
                                                setTogglerLangDrop(
                                                    (prev) => !prev
                                                );
                                            }}
                                            className="btn btn-sm btn-ghost flex items-center gap-x-1 cursor-pointer"
                                        >
                                            <div className="w-[23px] h-[23px] overflow-hidden rounded-full">
                                                <FaUserCircle className="text-2xl cursor-pointer text-[#005186]" />
                                            </div>
                                            <FaAngleRight
                                                className={`transition-transform duration-200 ${
                                                    togglerLangDrop
                                                        ? 'rotate-[270deg]'
                                                        : 'rotate-[90deg]'
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Dropdown menyusi */}
                                    {togglerLangDrop && (
                                        <ul
                                            className={`
                                                absolute left-1/2 translate-x-[-50%] mt-2
                                                rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 z-50
                                                p-2 space-y-1
                                            `}
                                        >
                                            {/* Profil */}
                                            <li>
                                                <NavLink
                                                    to="user-profile"
                                                    className={({
                                                        isActive,
                                                    }) => `
                                                        flex items-center gap-3 w-full px-4 py-2 rounded-lg
                                                        transition-colors duration-200
                                                        ${
                                                            isActive
                                                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                                                : 'hover:bg-gray-100 text-gray-800'
                                                        }
                                                    `}
                                                >
                                                    <CgProfile className="text-xl" />
                                                    <TextTranslate
                                                        data={[
                                                            thisComponent,
                                                            '10',
                                                        ]}
                                                    />
                                                </NavLink>
                                            </li>

                                            {/* Logout */}
                                            <li>
                                                <NavLink
                                                    to="/"
                                                    onClick={() =>
                                                        setIsLoggedIn(false)
                                                    }
                                                    className={`
                                                        flex items-center gap-3 w-full px-4 py-2 rounded-lg
                                                        transition-colors duration-200 hover:bg-red-50 text-gray-800
                                                    `}
                                                >
                                                    <LuLogOut className="text-xl text-red-600" />
                                                    <span className="text-red-600">
                                                        <TextTranslate
                                                            data={[
                                                                thisComponent,
                                                                '12',
                                                            ]}
                                                        />
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden flex items-center">
                        <button className="cursor-pointer" onClick={toggleMenu}>
                            {menuOpen ? (
                                <AiOutlineClose size={24} />
                            ) : (
                                <GiHamburgerMenu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {shouldRender && (
                <MobileMenu
                    isOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
            )}
        </div>
    );
};

export default Navbar;
