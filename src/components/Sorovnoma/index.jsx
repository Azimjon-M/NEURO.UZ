import { BsFillMegaphoneFill } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';
import { Languages } from '@/context/LanguageContext';

const i18n = {
    uz: {
        title: "So'rovnomada ishtirok eting",
        btn: "So'rovnoma",
        aria: "So'rovnoma uchun ariza qoldirish",
    },
    ru: {
        title: 'Примите участие в опросе',
        btn: 'Опрос',
        aria: 'Оставить заявку для участия в опросе',
    },
    en: {
        title: 'Take part in the survey',
        btn: 'Survey',
        aria: 'Submit a survey application',
    },
};

const Sorovnoma = () => {
    const { language } = Languages();
    const t = i18n[language] ?? i18n.uz; // fallback: uz

    return (
        <section className="bg-blue-50 dark:bg-slate-900 py-6" id="request">
            <div className="container mx-auto px-4">
                <div
                    className="
                        flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6
                        bg-white dark:bg-slate-800/90 backdrop-blur
                        rounded-xl shadow-md ring-1 ring-slate-200 dark:ring-slate-700
                        px-4 sm:px-6 py-5
                        w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto
                    "
                >
                    {/* Left: Icon + Title */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <div className="text-[#005186] dark:text-blue-300 text-3xl sm:text-4xl shrink-0">
                            <BsFillMegaphoneFill />
                        </div>
                        <h2 className="text-base sm:text-xl mt-1 sm:mt-0 font-semibold text-gray-800 dark:text-slate-100 leading-snug">
                            {t.title}
                        </h2>
                    </div>

                    {/* Right: Button */}
                    <Link
                        to="/sorovnoma"
                        className="
                            inline-flex items-center justify-center gap-2
                            w-full sm:w-auto
                            px-4 sm:px-5 py-2.5 sm:py-2
                            rounded-lg sm:rounded-full
                            bg-[#005186] hover:bg-[#1f59a0]
                            dark:bg-blue-600 dark:hover:bg-blue-500
                            text-white
                            active:scale-[.98]
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                            transition
                            "
                        aria-label={t.aria}
                    >
                        {t.btn}
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Sorovnoma;
