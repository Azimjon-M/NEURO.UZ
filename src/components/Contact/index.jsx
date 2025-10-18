// src/components/Contact.jsx
import React, { useEffect, useState } from 'react';
import { Languages } from '@/context/LanguageContext';
import ApiResult from '@/services/main';

const I18N = {
    uz: {
        heading: 'Bog‘lanish',
        sub: 'Quyidagi forma orqali biz bilan bog‘lanishingiz yoki joylashuvimizni xaritada ko‘rishingiz mumkin.',
        addressLabel: 'Manzil',
        address: 'Toshkent shahri, Chilonzor tumani, 7-mavze, 23-uy',
        phoneLabel: 'Telefon',
        phone: '+998 (90) 123-45-67',
        emailLabel: 'Email',
        email: 'EXEMPLE@GMAIL.uz',
        namePh: 'Ismingiz',
        phonePh: 'Telefon raqamingiz',
        msgPh: 'Xabaringiz',
        submit: 'Yuborish',
        mapTitle: 'Xarita: Chilonzor',
    },
    ru: {
        heading: 'Связаться с нами',
        sub: 'Вы можете связаться с нами через форму ниже или посмотреть наше местоположение на карте.',
        addressLabel: 'Адрес',
        address: 'Город Ташкент, Чиланзарский район, 7-й квартал, дом 23',
        phoneLabel: 'Телефон',
        phone: '+998 (90) 123-45-67',
        emailLabel: 'Эл. почта',
        email: 'EXEMPLE@GMAIL.uz',
        namePh: 'Ваше имя',
        phonePh: 'Ваш номер телефона',
        msgPh: 'Ваше сообщение',
        submit: 'Отправить',
        mapTitle: 'Карта: Чиланзар',
    },
    en: {
        heading: 'Contact',
        sub: 'Use the form below to contact us or view our location on the map.',
        addressLabel: 'Address',
        address: 'Tashkent, Chilonzor district, 7th block, house 23',
        phoneLabel: 'Phone',
        phone: '+998 (90) 123-45-67',
        emailLabel: 'Email',
        email: 'EXEMPLE@GMAIL.uz',
        namePh: 'Your name',
        phonePh: 'Your phone number',
        msgPh: 'Your message',
        submit: 'Send',
        mapTitle: 'Map: Chilonzor',
    },
};

const MAP_EMBED_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.4550483293133!2d69.38018192407844!3d41.3424619713056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4209cb7d693%3A0xde7be566ff52359e!2sRespublikanskiy%20Nauchnyy%20Tsentr%20Neyrokhirurgii%2C%20Khumayun%20Street%2040%2C%20100201%2C%20Tashkent%2C%20O%CA%BBzbekiston!5e0!3m2!1suz!2s!4v1760420027173!5m2!1suz!2s';

const Contact = () => {
    const [data, setData] = useState([]);
    const { language } = Languages();
    const t = I18N[language] ?? I18N.uz;

    const getData = async () => {
        try {
            const res = await ApiResult.getContact();
            setData(res);
        } catch (error) {
            console.error('Error fetching contact data:', error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    // Telefon va emailni klikka moslashtirish
    const mailHref = `mailto:${t.email}`;

    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900"
        >
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                <h2
                    id="contact-title"
                    className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100 text-center"
                >
                    {t.heading}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-center mx-auto mb-10">
                    {data[language]?.about}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Aloqa ma'lumotlari va forma */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                {t.addressLabel}
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300">
                                {data[language]?.address}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                {t.phoneLabel}
                            </h3>
                            <a
                                href={data?.clinic_phone}
                                className="text-slate-700 dark:text-slate-300 hover:underline"
                            >
                                {data?.clinic_phone}
                            </a>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                                {t.emailLabel}
                            </h3>
                            <a
                                href={mailHref}
                                className="text-slate-700 dark:text-slate-300 hover:underline break-all"
                            >
                                {data?.clinic_email}
                            </a>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200 dark:ring-slate-700 h-[400px] w-full bg-white dark:bg-slate-800">
                        <iframe
                            title={t.mapTitle}
                            src={MAP_EMBED_SRC}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
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
