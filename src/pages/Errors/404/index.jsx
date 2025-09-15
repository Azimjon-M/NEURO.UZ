import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../../assets/fons/astro.png';

const Error404 = () => {
    const message =
        "Siz qidirayotgan sahifani topa olmadik, sahifa mavjud emasga o'xshaydi";
    const [text, setText] = useState('');
    const [hidden, setHidden] = useState(true);
    const typingSpeed = 50;
    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                setText((prev) => prev + message[index]);
                index++;
            } else {
                clearInterval(interval);
                setHidden(false);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [message]);

    return (
        <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl bg-white dark:bg-gray-800 lg:rounded-xl lg:shadow-lg p-6">
                <div className="text-center lg:text-left">
                    <p className="text-2xl mb-2">
                        Ooops{' '}
                        <span className="font-digital text-blue-500 dark:text-blue-400">
                            404
                        </span>
                    </p>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                        SAHIFA TOPILMADI
                    </h1>
                    <p className="mb-6 text-base lg:text-lg">{text}</p>
                    <div className="flex justify-center lg:justify-start">
                        <button
                            onClick={() => navigate('/')}
                            hidden={hidden}
                            className="px-6 py-2 lg:py-3 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors duration-300"
                        >
                            Bosh sahifaga qaytish
                        </button>
                    </div>
                </div>
                <img
                    src={bg}
                    alt="astronavt"
                    className="w-48 md:w-64 lg:w-80 mt-6 lg:mt-0"
                />
            </div>
        </div>
    );
};

export default Error404;
