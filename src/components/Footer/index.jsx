// src/components/Footer.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaTelegram,
    FaFacebookF,
    FaInstagram,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEnvelope,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLogoYoutube } from 'react-icons/io5';
import Logo from '@/assets/logo/newLogo.png';
import { Languages } from '@/context/LanguageContext';
import ApiResult from '@/services/main';

/* ---------------- I18N ---------------- */
const I18N = {
    uz: {
        brandTitle: 'NEURO',
        brandDesc:
            'Neyroxirurgiya markazi: zamonaviy diagnostika, tajribali jarrohlar va bemor xavfsizligiga yo‘naltirilgan yondashuv.',
        pagesHeading: 'Sahifalar',
        pages: [
            'Asosiy',
            'Markaz haqida',
            'Rahbarlar',
            'Markaz yangiliklari',
            'Xalqaro yangiliklar',
            'Umumiy rasimlar',
            "So'rovnoma",
            'Karupsyaga qarshi kurash',
        ],
        contactHeading: 'Aloqa',
        address: 'Toshkent shahri, (manzilni kiriting)',
        phoneLabel: 'Telefon',
        phone: '+998 (00) 000-00-00',
        emailLabel: 'Email',
        email: 'info@neuro.uz',
        worktime: 'Ish vaqti: Dushanba–Juma, 09:00–18:00',
        followHeading: 'Bizni kuzating',
        social: {
            telegram: 'Telegram',
            facebook: 'Facebook',
            instagram: 'Instagram',
            social_x: 'X (Twitter)',
            youtube: 'YouTube',
            email: 'Email',
        },
        logoAlt: 'NEURO.UZ logotip',
        copyright: 'Barcha huquqlar himoyalangan.',
    },
    ru: {
        brandTitle: 'NEURO',
        brandDesc:
            'Нейрохирургический центр: современная диагностика, опытные хирурги и ориентированный на безопасность пациентов подход.',
        pagesHeading: 'Страницы',
        pages: [
            'Главная',
            'О центре',
            'Руководители',
            'Новости центра',
            'Международные новости',
            'Фотогалерея',
            'Опрос',
            'Противодействие коррупции',
        ],
        contactHeading: 'Связь',
        address: 'Город Ташкент, (укажите адрес)',
        phoneLabel: 'Телефон',
        phone: '+998 (00) 000-00-00',
        emailLabel: 'Эл. почта',
        email: 'info@neuro.uz',
        worktime: 'Время работы: Пн–Пт, 09:00–18:00',
        followHeading: 'Мы в соцсетях',
        social: {
            telegram: 'Telegram',
            facebook: 'Facebook',
            instagram: 'Instagram',
            social_x: 'X (Twitter)',
            youtube: 'YouTube',
            email: 'Email',
        },
        logoAlt: 'Логотип NEURO.UZ',
        copyright: 'Все права защищены.',
    },
    en: {
        brandTitle: 'NEURO',
        brandDesc:
            'Neurosurgery center: modern diagnostics, experienced surgeons, and a patient-safety-first approach.',
        pagesHeading: 'Pages',
        pages: [
            'Home',
            'About the Center',
            'Leaders',
            'Center News',
            'International News',
            'Photo Gallery',
            'Survey',
            'Anti-corruption',
        ],
        contactHeading: 'Contact',
        address: 'Tashkent city (add address)',
        phoneLabel: 'Phone',
        phone: '+998 (00) 000-00-00',
        emailLabel: 'Email',
        email: 'info@neuro.uz',
        worktime: 'Working hours: Mon–Fri, 09:00–18:00',
        followHeading: 'Follow us',
        social: {
            telegram: 'Telegram',
            facebook: 'Facebook',
            instagram: 'Instagram',
            social_x: 'X (Twitter)',
            youtube: 'YouTube',
            email: 'Email',
        },
        logoAlt: 'NEURO.UZ logo',
        copyright: 'All rights reserved.',
    },
};

/* Barqaror marshrutlar — tartib I18N.pages bilan mos */
const PAGES = [
    '/',
    '/about',
    '/departments/rahbarlar',
    '/news/markaz-elonlari',
    '/news/intl',
    '/gallery/umumiy-rasmlar',
    '/sorovnoma',
    '/anti-korrupsya',
];

const Footer = () => {
    const [data, setData] = useState([]);

    const { language } = Languages();
    const t = I18N[language] ?? I18N.uz;

    const telHref = `tel:${t.phone.replace(/[^\d+]/g, '')}`;
    const mailHref = `mailto:${t.email}`;

    const getData = async () => {
        try {
            const res = await ApiResult.getContact();
            setData(res);
        } catch (error) {
            console.error('Error fetching contact data:', error);
        } 
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 pt-12 pb-6 border-t border-slate-200 dark:border-slate-800">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4 pb-10">
                    {/* 1) Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={Logo}
                                alt={t.logoAlt}
                                className="w-9 h-9 object-contain"
                            />
                            <h2 className="text-xl font-bold text-[#2464AE] dark:text-blue-300">
                                {t.brandTitle}
                            </h2>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {data[language]?.about}
                        </p>
                    </div>

                    {/* 2) Sahifalar */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            {t.pagesHeading}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {PAGES.map((to, i) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                    >
                                        {t.pages[i]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3) Aloqa */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            {t.contactHeading}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <FaMapMarkerAlt className="mt-0.5 text-[#2464AE] dark:text-blue-300" />
                                <span>{data[language]?.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-[#2464AE] dark:text-blue-300" />
                                <a
                                    href={telHref}
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    {data?.clinic_phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-[#2464AE] dark:text-blue-300" />
                                <a
                                    href={mailHref}
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300 break-all"
                                >
                                    {data?.clinic_email}
                                </a>
                            </li>
                            <li className="text-xs text-slate-500 dark:text-slate-400">
                                {t.worktime}
                            </li>
                        </ul>
                    </div>

                    {/* 4) Ijtimoiy tarmoqlar */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            {t.followHeading}
                        </h3>
                        <div className="flex items-center gap-3">
                            {/* Telegram (hozircha yo‘q — disabled) */}
                            <a
                                href={data?.social_telegram}
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label={t.social.telegram}
                                title={t.social.telegram}
                            >
                                <FaTelegram className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>

                            <a
                                href={data?.social_facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label={t.social.facebook}
                                title={t.social.facebook}
                            >
                                <FaFacebookF className="text-[18px] text-[#2464AE] dark:text-blue-300" />
                            </a>

                            <a
                                href={data?.social_instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label={t.social.instagram}
                                title={t.social.instagram}
                            >
                                <FaInstagram className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>

                            <a
                                href={data?.social_youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label={t.social.youtube}
                                title={t.social.youtube}
                            >
                                <IoLogoYoutube className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>

                            <a
                                href={data?.social_x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label={t.social.social_x}
                                title={t.social.social_x}
                            >
                                <FaXTwitter className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <hr className="border-slate-200 dark:border-slate-800 mb-4" />
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} NEURO.UZ — {t.copyright}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
