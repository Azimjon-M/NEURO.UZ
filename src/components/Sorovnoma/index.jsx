import { BsFillMegaphoneFill } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';

const Sorovnoma = () => {
    return (
        <section className="bg-blue-50 py-6" id="request">
            <div className="container mx-auto px-4">
                <div
                    className="
                        flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6
                        bg-white rounded-xl shadow-md px-4 sm:px-6 py-5
                        w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto
                    "
                >
                    {/* Left: Icon + Title */}
                    <div className="flex items-start sm:items-center  gap-3 sm:gap-4">
                        <div className="text-[#005186] text-3xl sm:text-4xl shrink-0">
                            <BsFillMegaphoneFill />
                        </div>
                        <h2 className="text-base sm:text-xl mt-1 sm:mt-0 font-semibold text-gray-800 leading-snug">
                            So'rovnomada ishtirok etish
                        </h2>
                    </div>

                    {/* Right: Button */}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://neurouzb.pythonanywhere.com/polls/uz/"
                        className="
                            inline-flex items-center justify-center gap-2
                            bg-[#005186] text-white
                            w-full sm:w-auto
                            px-4 sm:px-5 py-2.5 sm:py-2
                            rounded-lg sm:rounded-full
                            hover:bg-blue-700 active:scale-[.98]
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                            transition
                        "
                        aria-label="So'rovnoma uchun ariza qoldirish"
                    >
                        Ariza qoldirish
                        <FaArrowRight />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Sorovnoma;
