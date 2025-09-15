import React from 'react';

const Contact = () => {
    return (
        <section className="py-16 bg-white" id="contact">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center">
                    Bog‘lanish
                </h2>
                <p className="text-gray-600 max-w-2xl text-center mx-auto mb-10">
                    Quyidagi forma orqali biz bilan bog‘lanishingiz yoki
                    joylashuvimizni xaritada ko‘rishingiz mumkin.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Aloqa ma'lumotlari va forma */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Manzil
                            </h3>
                            <p className="text-gray-600">
                                Toshkent shahri, Chilonzor tumani, 7-mavze,
                                23-uy
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Telefon
                            </h3>
                            <p className="text-gray-600">+998 (90) 123-45-67</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Email
                            </h3>
                            <p className="text-gray-600">
                                EXEMPLE@GMAIL.uz
                            </p>
                        </div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ismingiz"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="tel"
                                placeholder="Telefon raqamingiz"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Xabaringiz"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Yuborish
                            </button>
                        </form>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-2xl overflow-hidden shadow-md h-[400px] w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.3799797849843!2d69.2034401!3d41.2757437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4e8557f26ef%3A0xa3fc5cf75e14e16a!2sChilonzor!5e0!3m2!1sen!2s!4v1697708626939!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
