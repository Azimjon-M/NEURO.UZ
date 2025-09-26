import React from 'react';

const Contact = () => {
    return (
        <section
            id="contact"
            className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100 text-center">
                    Bog‘lanish
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-center mx-auto mb-10">
                    Quyidagi forma orqali biz bilan bog‘lanishingiz yoki
                    joylashuvimizni xaritada ko‘rishingiz mumkin.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Aloqa ma'lumotlari va forma */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                Manzil
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300">
                                Toshkent shahri, Chilonzor tumani, 7-mavze,
                                23-uy
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                Telefon
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300">
                                +998 (90) 123-45-67
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                Email
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300">
                                EXEMPLE@GMAIL.uz
                            </p>
                        </div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ismingiz"
                                className="w-full px-4 py-2 rounded-xl
                                    border border-slate-200 dark:border-slate-700
                                    bg-white dark:bg-slate-800/80
                                    text-slate-800 dark:text-slate-100
                                    placeholder-slate-400 dark:placeholder-slate-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                            />
                            <input
                                type="tel"
                                placeholder="Telefon raqamingiz"
                                className="w-full px-4 py-2 rounded-xl
                                    border border-slate-200 dark:border-slate-700
                                    bg-white dark:bg-slate-800/80
                                    text-slate-800 dark:text-slate-100
                                    placeholder-slate-400 dark:placeholder-slate-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                            />
                            <textarea
                                rows={4}
                                placeholder="Xabaringiz"
                                className="w-full px-4 py-2 rounded-xl
                                    border border-slate-200 dark:border-slate-700
                                    bg-white dark:bg-slate-800/80
                                    text-slate-800 dark:text-slate-100
                                    placeholder-slate-400 dark:placeholder-slate-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl text-white cursor-pointer
                                    bg-[#2464AE] hover:bg-[#1f59a0]
                                    dark:bg-blue-600 dark:hover:bg-blue-500
                                    transition
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                            >
                                Yuborish
                            </button>
                        </form>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200 dark:ring-slate-700 h-[400px] w-full bg-white dark:bg-slate-800">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.3799797849843!2d69.2034401!3d41.2757437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4e8557f26ef%3A0xa3fc5cf75e14e16a!2sChilonzor!5e0!3m2!1sen!2s!4v1697708626939!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
