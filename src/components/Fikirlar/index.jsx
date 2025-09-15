import React from 'react';
import { MessageSquareQuoteIcon } from 'lucide-react';
import Image_1 from '../../assets/icons/it-park.jpg';

const testimonials = [
    {
        name: 'Dilnoza Karimova',
        message:
            'Farzandim bu maktabda o‘qiyotganidan juda mamnunmiz. O‘qituvchilar juda mehribon va bilimli.',
        image: Image_1,
    },
    {
        name: 'Jahongir Xolmatov',
        message:
            'O‘zim ham ustozman. Bu yerda o‘quvchilarga e’tibor yuqori darajada ekanligiga guvoh bo‘ldim.',
        image: '', // no image
    },
    {
        name: 'Nodira Bekmurodova',
        message:
            'Dars metodikasi juda zamonaviy va samarali. O‘g‘lim o‘qishdan zavqlanmoqda.',
        image: 'data:image/png;base64,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', // O‘rnatilgan rasm
    },
];

const Fikirlar = () => {
    return (
        <section className="py-16 bg-gray-50" id="testimonials">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                    Fikrlar
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Ota-onalar va o‘quvchilar biz haqimizda nima deyishmoqda?
                </p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                        <MessageSquareQuoteIcon className="w-6 h-6" />
                                    </div>
                                )}
                                <h3 className="font-semibold text-gray-800">
                                    {item.name}
                                </h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {item.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fikirlar;
