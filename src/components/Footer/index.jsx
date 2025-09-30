import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaTelegram,
    FaFacebookF,
    FaInstagram,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEnvelope,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLogoYoutube } from 'react-icons/io5';
import Logo from '@/assets/logo/newLogo.png';
import { BsYoutube } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 pt-12 pb-6 border-t border-slate-200 dark:border-slate-800">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4 pb-10">
                    {/* 1) Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={Logo}
                                alt="NEURO.UZ logo"
                                className="w-9 h-9 object-contain"
                            />
                            <h2 className="text-xl font-bold text-[#2464AE] dark:text-blue-300">
                                NEURO
                            </h2>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Neyroxirurgiya markazi: zamonaviy diagnostika,
                            tajribali jarrohlar va bemor xavfsizligiga
                            yo‘naltirilgan yondashuv.
                        </p>
                    </div>

                    {/* 2) Sahifalar */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            Sahifalar
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Asosiy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Markaz haqida
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/departments"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Bo‘limlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/services"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Xizmatlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/patients"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Bemorlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/education"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Fan va ta’lim
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Yangiliklar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    Aloqa
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3) Aloqa */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            Aloqa
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <FaMapMarkerAlt className="mt-0.5 text-[#2464AE] dark:text-blue-300" />
                                <span>
                                    Toshkent shahri, (manzilni kiriting)
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-[#2464AE] dark:text-blue-300" />
                                <a
                                    href="tel:+998000000000"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    +998 (00) 000-00-00
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-[#2464AE] dark:text-blue-300" />
                                <a
                                    href="mailto:info@neuro.uz"
                                    className="hover:text-[#2464AE] dark:hover:text-blue-300"
                                >
                                    info@neuro.uz
                                </a>
                            </li>
                            <li className="text-xs text-slate-500 dark:text-slate-400">
                                Ish vaqti: Dushanba–Juma, 09:00–18:00
                            </li>
                        </ul>
                    </div>

                    {/* 4) Ijtimoiy tarmoqlar */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                            Bizni kuzating
                        </h3>
                        <div className="flex items-center gap-3">
                            <a
                                aria-disabled
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Telegram"
                            >
                                <FaTelegram className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                            <a
                                href="https://www.facebook.com/neurosurgerycenter"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-[18px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                            <a
                                href="https://www.youtube.com/@neyrosentrtashkent"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Instagram"
                            >
                                <IoLogoYoutube className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                            <a
                                href="https://@neuro.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full grid place-items-center ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Instagram"
                            >
                                <HiOutlineMail className="text-[20px] text-[#2464AE] dark:text-blue-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <hr className="border-slate-200 dark:border-slate-800 mb-4" />
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} NEURO.UZ — Barcha huquqlar
                    himoyalangan.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
