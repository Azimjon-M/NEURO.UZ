// src/components/ChangeLang/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import flag_uz from '@/assets/icons/flag-uz.png';
import flag_ru from '@/assets/icons/flag-ru.png';
import flag_en from '@/assets/icons/flag-en.png';
import TextTranslate from '@/utils/TextTranslate';
import { Languages } from '@/context/LanguageContext';

const languages = [
    { code: 'uz', id: 'lang_uz', flag: flag_uz },
    { code: 'ru', id: 'lang_ru', flag: flag_ru },
    { code: 'en', id: 'lang_en', flag: flag_en },
];

const thisComponent = 'navbar';

const LanguageDropdown = () => {
    const { language, setLanguage } = Languages();

    // 🔹 Mobile uchun click-toggle holati
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    const active = languages.find((l) => l.code === language) || languages[0];
    const available = languages.filter((l) => l.code !== language);

    // Tashqi joyga bosilsa yopish
    useEffect(() => {
        const onDoc = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    return (
        <div
            ref={wrapRef}
            className="
                relative inline-block font-medium select-none group
            "
        >
            {/* Trigger: mobile → click-toggle, desktop → hover */}
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open ? 'true' : 'false'}
                onClick={() => setOpen((p) => !p)} // ✅ mobil uchun toggler
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="
                    inline-flex items-center gap-2 px-2 py-2 rounded-lg
                    bg-transparent cursor-pointer transition-colors duration-150
                    text-slate-800 dark:text-slate-100
                    hover:bg-gray-100 active:bg-gray-200
                    dark:hover:bg-slate-700 dark:active:bg-slate-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                "
            >
                <span className="w-5 h-5 overflow-hidden rounded-full">
                    <img
                        className="w-full h-full"
                        src={active.flag}
                        alt="flag"
                    />
                </span>
                <span className="text-[12px] text-[#2464AE] dark:text-blue-300 font-medium">
                    <TextTranslate
                        data={[thisComponent, active.id]}
                        fallback={active.code.toUpperCase()}
                    />
                </span>

                {/* Ikonka aylanishi: mobile (open) + desktop (hover) */}
                <FaAngleRight
                    className={`
                        text-[#2464AE] dark:text-blue-300 transition-transform duration-200
                        ${open ? 'rotate-[270deg]' : 'rotate-90'}
                        lg:group-hover:rotate-[270deg]
                    `}
                />
            </button>

            <div
                className={`
                    absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50
                    transition-all duration-150

                    ${
                        open
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-1 pointer-events-none'
                    }

                    lg:opacity-0 lg:translate-y-1 lg:pointer-events-none
                    lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:pointer-events-auto
                    lg:focus-within:opacity-100 lg:focus-within:translate-y-0 lg:focus-within:pointer-events-auto
                `}
            >
                {/* “Ko‘prik”: bo‘shliqni to‘sish uchun */}
                <div
                    aria-hidden
                    className="absolute -top-2 left-0 right-0 h-2"
                />

                <ul
                    role="menu"
                    className="
                        min-w-[120px] rounded-lg py-1 shadow-lg
                        bg-white dark:bg-slate-800
                        text-slate-800 dark:text-slate-100
                        ring-1 ring-slate-200 dark:ring-slate-700
                    "
                >
                    {available.map((lang) => (
                        <li key={lang.code} role="none">
                            <button
                                role="menuitem"
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setOpen(false); // mobil uchun yopamiz
                                }}
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                className="
                                    w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-md
                                    text-[#2464AE] dark:text-blue-300
                                    hover:bg-gray-100 dark:hover:bg-slate-700
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                                    transition-colors
                                "
                            >
                                <span className="w-5 h-5 overflow-hidden rounded-full shrink-0">
                                    <img
                                        className="w-full h-full"
                                        src={lang.flag}
                                        alt="flag"
                                    />
                                </span>
                                <TextTranslate
                                    data={[thisComponent, lang.id]}
                                    fallback={lang.code.toUpperCase()}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LanguageDropdown;
