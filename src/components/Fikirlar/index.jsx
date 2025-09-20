import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import Image_1 from '@/assets/icons/it-park.jpg';

const testimonials = [
    {
        name: 'Dilnoza Karimova',
        message:
            'Onamga o‘tkazilgan operatsiya va keyingi parvarish juda yuqori darajada amalga oshirildi. Shifokorlar ham bemor, ham oilasi bilan tinimsiz aloqa qilib, tushuntirib turishdi.',
        image: Image_1,
    },
    {
        name: 'Jahongir Xolmatov',
        message:
            'O‘g‘limda murakkab neyroxirurgik tashxis qo‘yildi. Markaz jamoasi bosqichma-bosqich tashxis, operatsiya va reabilitatsiyani juda puxta tashkil qildi. Rahmat sizlarga!',
        image: Image_1,
    },
    {
        name: 'Nodira Bekmurodova',
        message:
            'MRI va KT natijalari bo‘yicha tezkor qaror qabul qilindi. Jarayonning har bir bosqichi aniq tushuntirildi, natijadan mamnunmiz.',
        image: Image_1,
    },
];

const Fikirlar = () => {
    return (
        <section
            id="testimonials"
            className="py-12 md:py-16 bg-white dark:bg-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-slate-900 dark:text-slate-100">
                    Bemorlar va yaqinlar fikrlari
                </h2>
                <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
                    Markazimizdagi tashxis, davolash va parvarish jarayonlari
                    haqida qisqa mulohazalar.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <article
                            key={idx}
                            className="relative rounded-2xl p-6 bg-white/90 dark:bg-slate-800/70 backdrop-blur
                         shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700/60
                         hover:shadow-lg transition-all duration-200"
                        >
                            {/* Dekorativ quote belgisi */}
                            <MessageSquareQuote className="absolute right-4 top-4 w-6 h-6 text-[#2464AE]/60 dark:text-blue-300/60" />

                            {/* Header: avatar + name */}
                            <div className="flex items-center gap-4 mb-4">
                                {t.image ? (
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                                    />
                                ) : (
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2464AE] to-blue-400
                                  dark:from-blue-300 dark:to-blue-500
                                  flex items-center justify-center text-white"
                                    >
                                        <MessageSquareQuote className="w-6 h-6" />
                                    </div>
                                )}
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">
                                    {t.name}
                                </h3>
                            </div>

                            {/* Body: message */}
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-5">
                                {t.message}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fikirlar;
