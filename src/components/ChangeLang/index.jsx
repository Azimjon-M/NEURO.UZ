import React, { useState, useEffect, useRef } from 'react';
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
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const activeLang =
        languages.find((l) => l.code === language) || languages[0];
    const available = languages.filter((l) => l.code !== language);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative font-medium">
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 px-2 py-2"
            >
                <span className="w-5 h-5 overflow-hidden rounded-full">
                    <img
                        className="w-full h-full"
                        src={activeLang.flag}
                        alt="flag"
                    />
                </span>
                <span className="text-[12px]">
                    <TextTranslate
                        data={[thisComponent, activeLang.id]}
                        fallback={activeLang.code.toUpperCase()}
                    />
                </span>
                <FaAngleRight
                    className={`transition-transform duration-200 ${
                        open ? 'rotate-[270deg]' : 'rotate-[90deg]'
                    }`}
                />
            </button>

            {open && (
                <ul className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-lg z-50 py-1">
                    {available.map((lang) => (
                        <li key={lang.code}>
                            <button
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                            >
                                <span className="w-5 h-5 overflow-hidden rounded-full">
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
            )}
        </div>
    );
};

export default LanguageDropdown;
