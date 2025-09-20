import React from 'react';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

const RequestApplication = () => {
    return (
        <section className="bg-blue-50 py-6" id="request">
            <div className="container mx-auto  px-4">
                <div className="flex items-center justify-between bg-white rounded-xl shadow-md px-6 py-5 w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto">
                    {/* Left: Icon + Title */}
                    <div className="flex items-center gap-4">
                        <div className="text-[#005186] text-3xl">
                            <BsFillMegaphoneFill />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            So'rovnomada ishtirok etish
                        </h2>
                    </div>

                    {/* Right: Button */}
                    <a
                        href="#contact"
                        className="flex items-center leading-5 gap-2 bg-[#005186] text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Ariza qoldirish
                        <FaArrowRight />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RequestApplication;
