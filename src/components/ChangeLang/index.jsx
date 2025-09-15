import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import flag_uz from '../../assets/icons/flag-uz.png';
import flag_ru from '../../assets/icons/flag-ru.png';
import flag_en from '../../assets/icons/flag-en.png';
import TextTranslate from '../../utils/TextTranslate';
import { Languages } from '../../context/LanguageContext';

const languages = [
    { code: 'uz', id: '7', flag: flag_uz },
    { code: 'ru', id: '8', flag: flag_ru },
    { code: 'en', id: '9', flag: flag_en },
];

const LanguageDropdown = () => {
    const { language, setLanguage } = Languages();
    const [togglerLangDrop, setTogglerLangDrop] = useState(false);
    const dropdownRef = useRef(null);

    const activeLang =
        languages.find((lang) => lang.code === language) || languages[0];
    const availableLanguages = languages.filter(
        (lang) => lang.code !== language
    );

    const handleToggleLang = (code) => {
        setLanguage(code);
        setTogglerLangDrop(false);
    };

    // ⛔ tashqi joyga bosilsa yopilsin:
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setTogglerLangDrop(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative font-medium">
            {/* Dropdown tugmasi */}
            <div className="p-2">
                <button
                    onClick={() => setTogglerLangDrop((prev) => !prev)}
                    className="btn btn-sm btn-ghost flex items-center gap-x-2 px-2 cursor-pointer"
                >
                    <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
                        <img
                            className="w-full h-full"
                            src={activeLang.flag}
                            alt="flag icon"
                        />
                    </div>
                    <span className="text-[12px] font-thin">
                        <TextTranslate data={['navbar', activeLang.id]} />
                    </span>
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
                <ul className="flex flex-col z-50 font-medium absolute left-[50%] translate-x-[-50%] bg-gray-50 rounded-lg p-1 min-w-[160px] border border-gray-200 shadow-lg">
                    {availableLanguages.map((lang) => (
                        <li
                            key={lang.code}
                            className="flex items-center w-full gap-x-2 hover:bg-gray-100 transition-colors duration-200 rounded-sm p-2"
                        >
                            <button
                                onClick={() => handleToggleLang(lang.code)}
                                className="text-black btn btn-sm btn-ghost w-full flex justify-start items-center cursor-pointer gap-x-2"
                            >
                                <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
                                    <img
                                        className="w-full h-full"
                                        src={lang.flag}
                                        alt="flag icon"
                                    />
                                </div>
                                <TextTranslate data={['navbar', lang.id]} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageDropdown;
