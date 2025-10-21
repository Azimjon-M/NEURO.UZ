// src/pages/patients/PatFAQ.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ---------- Reusable UI helpers ---------- */
function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen((v) => !v)}
                className="cursor-pointer w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-left"
            >
                <span className="font-bold text-[#2464AE] text-md md:text-lg leading-snug">
                    {title}
                </span>
                <FiChevronDown
                    className={`text-slate-500 dark:text-slate-300 transition-transform ${
                        open ? 'rotate-180' : ''
                    }`}
                    size={18}
                />
            </button>

            {open && (
                <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 md:p-5 shadow-sm">
                    {children}
                </div>
            )}
        </div>
    );
}
const P = ({ children }) => (
    <p className="text-[13.5px] md:text-[14px] leading-7 text-slate-700 dark:text-slate-300 mb-3">
        {children}
    </p>
);
const UL = ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-[13.5px] md:text-[14px] text-slate-700 dark:text-slate-300">
        {children}
    </ul>
);
const LI = ({ children }) => <li>{children}</li>;

/* ======================== I18N ======================== */
const T = {
    uz: {
        pageTitle: 'Ko‘p so‘ralgan savollar',
        pageSubtitle:
            'Quyida tez-tez beriladigan savollarga qisqa va aniq javoblar keltirilgan.',
        faqs: [
            {
                title: '1) Chet davlatlarda davolanishda yoki moddiy qo‘llab-quvvatlashda SSV qanday yordam beradi?',
                blocks: [
                    {
                        type: 'p',
                        text: 'Moddiy yordam ko‘rsatish SSV vakolatiga kirmaydi. Moddiy yordam uchun mahalliy hokimliklar, homiy tashkilotlar va jamoat fondlariga murojaat qilish maqsadga muvofiq.',
                    },
                ],
            },
            {
                title: '2) Sog‘liqni saqlash tizimidagi sihatgohlarga yo‘llanma ajratish tartibi',
                blocks: [
                    {
                        type: 'p',
                        text: 'Tibbiy ijtimoiy xizmatlarni rivojlantirish agentligi vakolatida. Faqat sil kasalligiga qarshi sanatoriyga yo‘llanmalar tuman sil dispanseri tomonidan beriladi.',
                    },
                ],
            },
            {
                title: '3) Nogironlarni protez-ortopediya mahsulotlari va reabilitatsiya texnik vositalari bilan ta’minlash tartibi',
                blocks: [
                    {
                        type: 'p',
                        text: 'Tibbiy ijtimoiy xizmatlarni rivojlantirish agentligi vakolatida.',
                    },
                ],
            },
            {
                title: '4) Tibbiyot muassasalarida, xususan oilaviy poliklinikalarda dori-darmon bilan ta’minlash tartibi',
                blocks: [
                    {
                        type: 'p',
                        text: 'Bugungi kunda OShPlar, oilaviy poliklinikalar va markaziy ko‘p tarmoqli poliklinikalarda 66 turdagi dori va antiseptik vositalar davolash uchun bepul qo‘llaniladi.',
                    },
                ],
            },
            {
                title: '5) Nogironlik guruhini kim belgilaydi?',
                blocks: [
                    {
                        type: 'p',
                        text: 'Tibbiy mehnat ekspertiza komissiyasi tomonidan belgilanadi.',
                    },
                ],
            },
            {
                title: '6) Nogironlik guruhini belgilash uchun qanday hujjatlar kerak?',
                blocks: [
                    {
                        type: 'p',
                        text: '0,86 shakl, kasallik tarixidan ko‘chirmalar, mehnatga layoqatsizlik varaqasi talab etiladi. Ushbu hujjatlar oilaviy poliklinika tomonidan rasmiylashtiriladi.',
                    },
                ],
            },
            {
                title: '7) Imtiyozga ega bo‘lmagan shaxslarning respublika va viloyat markazlarida davolanish tartibi',
                blocks: [
                    {
                        type: 'p',
                        text: 'Respublika ixtisoslashtirilgan tibbiyot markazlarida imtiyozga ega bo‘lmagan shaxslar standartlarga muvofiq pulli asosda davolanadi.',
                    },
                ],
            },
            {
                title: '8) Davolanish uchun moddiy yordam ajratish bo‘yicha: OP/TTB tizimidagi muassasalarda davolanish bepul',
                blocks: [
                    {
                        type: 'p',
                        text: 'Moddiy yordam “Kam ta’minlangan oilalarga ijtimoiy nafaqalar va moddiy yordam tayinlash va to‘lash tartibi” nizomi asosida mahalliy hokimiyat organlari tomonidan amalga oshiriladi. SSV budjetdan moliyalashtirilgani sababli davolanish uchun alohida moddiy yordam ajratmaydi.',
                    },
                ],
            },
            {
                title: '9) Bepul tibbiy yordam ko‘rsatish tartibi',
                blocks: [
                    {
                        type: 'ul',
                        items: [
                            'Aholining barcha qatlamlari TTB tasarrufidagi shifoxonalarda davolanish va parvarish bilan bepul ta’minlanadi.',
                            'Birinchi tibbiy yordam — barcha uchun bepul.',
                            'Poliklinika yo‘llanmasi bilan shifoxonaga yotqizilganda davolash va parvarish bepul.',
                        ],
                    },
                ],
            },
            {
                title: '10) Elektron order va elektron navbat haqida',
                blocks: [
                    {
                        type: 'p',
                        text: 'Bemor oilaviy poliklinikaga kelishi bilan ro‘yxatga olinadi. Ma’lumotlar TTBga yuboriladi va ixtisoslashgan viloyat muassasasiga uzatiladi. Navbat va yotqizish muddatlari SMS orqali xabar qilinadi.',
                    },
                ],
            },
            {
                title: '11) Viloyat muassasalariga imtiyozli davolanish uchun yo‘llanma',
                blocks: [
                    {
                        type: 'p',
                        text: 'Bemor QVP, qishloq/shahar oilaviy poliklinikalari orqali TTBga qarashli markaziy ko‘p tarmoqli poliklinikalardan yo‘llanma oladi. Ijtimoiy ahamiyatga ega kasalliklardagi bemorlarga yo‘llanmalar to‘g‘ridan-to‘g‘ri tegishli viloyat tashkilotlariga berilishi mumkin.',
                    },
                    {
                        type: 'ul',
                        items: [
                            'Markaziy ko‘p tarmoqli poliklinikalar → tuman/ shahar statsionar yoki viloyat tashkilotlari.',
                            'Viloyat tashkilotlari → respublika darajasidagi tashkilotlar.',
                        ],
                    },
                ],
            },
            {
                title: '12) Respublika ixtisoslashgan muassasalariga imtiyozli yo‘llanma',
                blocks: [
                    {
                        type: 'p',
                        text: 'Imtiyozli toifadagilar elektron axborot tizimi orqali hisobga olinadi va navbat asosida yo‘naltiriladi. Agar fuqaro ushbu toifaga kirsa, yashash manzilidagi oilaviy poliklinikadagi shifokori orqali tizimga ro‘yxatdan o‘tib yo‘llanma oladi.',
                    },
                ],
            },
        ],
    },

    ru: {
        pageTitle: 'Часто задаваемые вопросы',
        pageSubtitle: 'Ниже собраны краткие ответы на самые частые вопросы.',
        faqs: [
            {
                title: '1) Чет государства: лечение и материальная поддержка — чем помогает МЗ?',
                blocks: [
                    {
                        type: 'p',
                        text: 'Материальная помощь не относится к компетенции МЗ. За поддержкой целесообразно обращаться в местные хокимияты, благотворительные организации и общественные фонды.',
                    },
                ],
            },
            {
                title: '2) Путёвки в санатории системы здравоохранения',
                blocks: [
                    {
                        type: 'p',
                        text: 'В компетенции Агентства по развитию медико-социальных услуг. Путёвки в противотуберкулёзные санатории выдаются тубдиспансером.',
                    },
                ],
            },
            {
                title: '3) Обеспечение инвалидов протезно-ортопедической продукцией и ТСР',
                blocks: [
                    {
                        type: 'p',
                        text: 'В компетенции Агентства по развитию медико-социальных услуг.',
                    },
                ],
            },
            {
                title: '4) Обеспечение лекарствами в ЛПУ, в т.ч. семейных поликлиниках',
                blocks: [
                    {
                        type: 'p',
                        text: 'В семейных врачебных пунктах, семейных и центральных многопрофильных поликлиниках бесплатно используются 66 наименований лекарств и антисептиков.',
                    },
                ],
            },
            {
                title: '5) Кто устанавливает группу инвалидности?',
                blocks: [
                    {
                        type: 'p',
                        text: 'Медико-трудовая экспертная комиссия (МТЭК).',
                    },
                ],
            },
            {
                title: '6) Документы для установления инвалидности',
                blocks: [
                    {
                        type: 'p',
                        text: 'Форма 0,86, выписки из истории болезни, лист нетрудоспособности — оформляются семейной поликлиникой.',
                    },
                ],
            },
            {
                title: '7) Порядок лечения в республиканских/областных центрах для лиц без льгот',
                blocks: [
                    {
                        type: 'p',
                        text: 'В республиканских специализированных центрах пациенты без льгот лечатся на платной основе согласно стандартам.',
                    },
                ],
            },
            {
                title: '8) Матпомощь на лечение: в учреждениях ОП/ТТБ лечение бесплатно',
                blocks: [
                    {
                        type: 'p',
                        text: 'Вопрос матпомощи решается местными органами власти по Низому о назначении соцпособий/матпомощи. МЗ не выделяет отдельную матпомощь на лечение из бюджета.',
                    },
                ],
            },
            {
                title: '9) Порядок оказания бесплатной медпомощи',
                blocks: [
                    {
                        type: 'ul',
                        items: [
                            'Во всех больницах ТТБ лечение и уход — бесплатно.',
                            'Первая медпомощь — бесплатно.',
                            'При госпитализации по направлению из поликлиники лечение и уход — бесплатно.',
                        ],
                    },
                ],
            },
            {
                title: '10) Об электронном ордере и электронной очереди',
                blocks: [
                    {
                        type: 'p',
                        text: 'Пациент регистрируется в семейной поликлинике, данные направляются в ТТБ и профильное областное учреждение. Очередь и сроки госпитализации сообщаются по SMS.',
                    },
                ],
            },
            {
                title: '11) Направление на льготное лечение в областные учреждения',
                blocks: [
                    {
                        type: 'p',
                        text: 'Выдаётся через ФАП/семейные поликлиники → центральные многопрофильные поликлиники ТТБ. По соцзначимым заболеваниям возможно прямое направление в областные учреждения.',
                    },
                    {
                        type: 'ul',
                        items: [
                            'Центральные МПП → районные/городские стационары или областные учреждения.',
                            'Областные учреждения → республиканские организации.',
                        ],
                    },
                ],
            },
            {
                title: '12) Льготное направление в республиканские специализированные учреждения',
                blocks: [
                    {
                        type: 'p',
                        text: 'Льготные категории учитываются в ИС и направляются по очереди. Регистрация и направление — через лечащего врача семейной поликлиники по месту жительства.',
                    },
                ],
            },
        ],
    },

    en: {
        pageTitle: 'Frequently Asked Questions',
        pageSubtitle: 'Quick answers to common questions.',
        faqs: [
            {
                title: '1) Overseas treatment & financial aid — does the MOH help?',
                blocks: [
                    {
                        type: 'p',
                        text: 'Direct financial aid is not within the Ministry of Health’s remit. For support, contact local authorities, charity organizations, and public funds.',
                    },
                ],
            },
            {
                title: '2) Referrals to health-system sanatoria',
                blocks: [
                    {
                        type: 'p',
                        text: 'Handled by the Agency for Development of Medico-Social Services. TB sanatorium referrals are issued by the TB dispensary.',
                    },
                ],
            },
            {
                title: '3) Provision of prosthetics and assistive devices for people with disabilities',
                blocks: [
                    {
                        type: 'p',
                        text: 'Also within the Medico-Social Services Agency’s authority.',
                    },
                ],
            },
            {
                title: '4) Free medicines in primary care facilities',
                blocks: [
                    {
                        type: 'p',
                        text: 'Family clinics and central multiprofile polyclinics provide 66 essential medicines and antiseptics free of charge.',
                    },
                ],
            },
            {
                title: '5) Who assigns disability groups?',
                blocks: [
                    { type: 'p', text: 'The Medical-Labor Expert Commission.' },
                ],
            },
            {
                title: '6) Documents required to assign disability status',
                blocks: [
                    {
                        type: 'p',
                        text: 'Form 0.86, extracts from the medical record, and a sick-leave certificate — prepared by the family clinic.',
                    },
                ],
            },
            {
                title: '7) Care in republican/regional centers for non-privileged patients',
                blocks: [
                    {
                        type: 'p',
                        text: 'Treatment is on a paid basis in republican specialized centers according to standards.',
                    },
                ],
            },
            {
                title: '8) Financial aid for treatment',
                blocks: [
                    {
                        type: 'p',
                        text: 'Decided by local authorities under the regulation on social benefits/aid. The MOH does not allocate separate treatment grants from the state budget.',
                    },
                ],
            },
            {
                title: '9) When is medical care free?',
                blocks: [
                    {
                        type: 'ul',
                        items: [
                            'Treatment and nursing in TTB hospitals are free for all.',
                            'Emergency/first medical aid is free.',
                            'If hospitalized with a clinic referral, treatment and nursing are free.',
                        ],
                    },
                ],
            },
            {
                title: '10) Electronic order and queue',
                blocks: [
                    {
                        type: 'p',
                        text: 'Patients are registered at the family clinic; data go to the district system and then to the regional facility. Queue status and admission dates are sent via SMS.',
                    },
                ],
            },
            {
                title: '11) Preferential referrals to regional facilities',
                blocks: [
                    {
                        type: 'p',
                        text: 'Issued through rural/city family clinics → central multiprofile polyclinics. For socially significant diseases, direct referrals to regional institutions may be issued.',
                    },
                    {
                        type: 'ul',
                        items: [
                            'Central multiprofile polyclinics → district/city hospitals or regional institutions.',
                            'Regional institutions → republican organizations.',
                        ],
                    },
                ],
            },
            {
                title: '12) Preferential referrals to republican specialized institutions',
                blocks: [
                    {
                        type: 'p',
                        text: 'Beneficiaries are registered in the information system and scheduled by queue. Apply via your family clinic doctor at your place of residence.',
                    },
                ],
            },
        ],
    },
};

/* ---------- Page ---------- */
const PatFAQ = () => {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    return (
        <section className="py-10 md:py-12 bg-slate-50 dark:bg-slate-900">
            <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px]">
                {/* Page header */}
                <div className="mb-7 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        {t.pageTitle}
                    </h1>
                    <p className="mt-2 text-[13.5px] md:text-[14px] text-slate-600 dark:text-slate-300">
                        {t.pageSubtitle}
                    </p>
                </div>

                {/* Accordions */}
                <div className="space-y-4">
                    {t.faqs.map((faq, idx) => (
                        <Accordion
                            key={idx}
                            title={faq.title}
                            defaultOpen={idx === 0}
                        >
                            {faq.blocks.map((b, i) =>
                                b.type === 'ul' ? (
                                    <UL key={i}>
                                        {b.items.map((it, k) => (
                                            <LI key={k}>{it}</LI>
                                        ))}
                                    </UL>
                                ) : (
                                    <P key={i}>{b.text}</P>
                                )
                            )}
                        </Accordion>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PatFAQ;
