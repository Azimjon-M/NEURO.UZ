import React from 'react';
import { FaTelegram, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Logo from '../../assets/logo/newLogo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 pt-16 pb-6">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 pb-10">
                    {/* 1. Logo + Tavsif */}
                    <div>
                        <div className="flex items-center space-x-3 mb-3">
                            <img
                                className="w-8 h-8 object-contain"
                                src={Logo}
                                alt="Logo"
                            />
                            <h2 className="text-xl font-bold">NEURO</h2>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Bizning maktab — zamonaviy ta’lim, kuchli jamoa va
                            yuksak maqsadlar sari intilish.
                        </p>
                    </div>

                    {/* 2. Sahifalar linklari */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Sahifalar
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#home" className="hover:text-blue-600">
                                    Asosiy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#courses"
                                    className="hover:text-blue-600"
                                >
                                    Kurslar
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#teachers"
                                    className="hover:text-blue-600"
                                >
                                    Ustozlar
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="hover:text-blue-600"
                                >
                                    Bog‘lanish
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Ijtimoiy tarmoqlar */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Bizni kuzating
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://t.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl hover:text-blue-600"
                            >
                                <FaTelegram />
                            </a>
                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl hover:text-blue-600"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl hover:text-blue-600"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Pastgi chiziq va copyright */}
                <hr className="border-gray-300 mb-4" />
                <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} "NEURO.UZ". Barcha huquqlar
                    himoyalangan.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
