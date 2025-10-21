// src/pages/patients/BoshSuyagiAsosi.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ======================== I18N ======================== */
const T = {
    uz: {
        pageTitle: 'Bosh suyagi asosidagi neyroxirurgiya',
        pageSubtitle:
            'Bosh suyagi asosi (skull base) — ko‘rish/eshitish nervlari, gipofiz va asosiy qon tomirlari joylashgan murakkab soha. Quyida tashxis, davolash va tiklanish bo‘yicha ixcham ma’lumot.',
        accTitle: 'Bosh suyagi asosidagi neyroxirurgiya — umumiy ma’lumot',
        sec1H2: 'Bosh suyagi asosidagi kasalliklar nimalar?',
        sec1P: 'Bu yo‘nalish bosh suyagi asosida joylashgan o‘smalar va tomir–nerv tuzilmalariga yaqin patologiyalarni davolaydi. Markaziy joylashuvi sabab maxsus yondashuv talab etiladi.',
        sec2H3: 'Ko‘p uchraydigan kasalliklar',
        dL1: 'Gipofiz o‘smalari: adenomalar (prolaktinoma va boshqalar).',
        dL2: 'Meningiomalar (bosh suyagi asosi, kavernoz sinus sohalari).',
        dL3: 'Vestibulyar shvannoma (akustik nevroma).',
        dL4: 'Kordoma va xondrosarkoma (klivus sohasi).',
        dL5: 'Trigeminal nevralgiya, glomus (paraganglioma), kolesteatoma.',
        dL6: 'Travma va tug‘ma nuqsonlar (baza sinishlari, likvorrea).',
        sec3H3: 'Qanday belgilar bo‘lishi mumkin?',
        sL1: 'Bosh og‘rig‘i, ikki ko‘rish, ko‘rishning pasayishi.',
        sL2: 'Quloqda shovqin/eshitishning pasayishi, yuz nervi zaifligi.',
        sL3: 'Gormon buzilishlari (gipofiz o‘smalarida).',
        sL4: 'Yuz og‘rig‘i yoki uvushishi (V juft nerv).',
        sL5: 'Muvozanat buzilishi, bosh aylanishi.',
        sL6: 'Burun orqali suyuqlik kelishi (likvorrea), infeksiya xavfi.',
        sec4H3: 'Diagnostika',
        dxL1: 'MRT — yumshoq to‘qimalar va nerv tuzilmalarini baholashda asosiy.',
        dxL2: 'KT — suyak strukturasi va baza anatomiyasini aniqlash.',
        dxL3: 'Gormonlar paneli — gipofiz patologiyalarida.',
        dxL4: 'Angiografiya — tomirlar bilan yaqinlikni baholash (zarurat bo‘lsa).',
        dxL5: 'Endoskopiya — burun yo‘llari/likvorrea manbasini aniqlash.',
        sec5H3: 'Davolash yondashuvlari',
        sec5P: 'Tanlov kasallik turi, o‘lchami, tarqalishi va bemor holatiga qarab individual belgilanadi.',
        s5H41: '1) Endoskopik endonazal (burun orqali) yondashuv',
        s5L1a: 'Teri kesmasiz; tezroq tiklanish va yaxshi kosmetik natija.',
        s5L1b: 'Gipofiz adenomalarida “gold standard”.',
        s5H42: '2) Kraniotomiya (mikroxirurgik) yondashuvlar',
        s5L2a: '“Keyhole” (kichik kesma) yoki klassik kraniotomiya.',
        s5L2b: 'Maqsad — to‘liq yoki xavfsiz maksimal rezeksiya, nerv/arteriyalarni saqlash.',
        s5H43: '3) Qo‘shimcha usullar',
        s5L3a: 'Radiokirurgiya / stereotaktik nur terapiyasi (Gamma Knife/CyberKnife analoglari).',
        s5L3b: 'Dori-darmon terapiyasi (gormonal holatni nazorat qilish va b.).',
        s5L3c: 'Likvorrea — qoplash va baza rekonstruksiyasi, zaruratda bel punksiyasi drenaji.',
        sec6H3: 'Xavf va asoratlar',
        sec6P: 'Qon ketishi, infeksiya, likvor oqishi, ko‘rish/eshitish nervlari shikastlanishi, gormon buzilishi mumkin. Markazimizda neyromonitoring va yuqori aniqlikdagi navigatsiya yordamida xavflar minimallashtiriladi.',
        sec7H3: 'Tiklanish va kuzatuv',
        rL1: 'Odatda 2–5 kun shifoxonada qolish.',
        rL2: 'Endonazal operatsiyadan so‘ng 1–2 hafta jismoniy zo‘riqishdan tiyilish.',
        rL3: 'MRT/KT nazorati va gormonlar monitoringi (gipofiz holatlarida).',
        rL4: 'Reabilitatsiya: fizioterapiya, LOR/oftalmolog/endokrinolog nazorati.',
        sec8H3: 'Nega aynan biz?',
        bL1: 'Skull base bo‘yicha tajribali jamoa va multidisiplinar yondashuv.',
        bL2: 'Endoskopik endonazal va “keyhole” mikroxirurgiya.',
        bL3: 'Intraoperatsion neyromonitoring, aniq navigatsiya va mikroskopiya.',
        bL4: 'Individual davolash rejasi va yaqin kuzatuv.',
        sec9H3: 'Biz bilan bog‘laning',
        cP1: 'Savollar bormi yoki maslahat kerakmi? Hoziroq qo‘ng‘iroq qiling: ',
        phone: '📞 +998 99 074 96 30',
        cP2: 'Yoki saytimizdagi shakl orqali ariza qoldiring — mutaxassislarimiz batafsil ma’lumot beradi va qabulga yozib qo‘yadi.',
    },
    ru: {
        pageTitle: 'Нейрохирургия основания черепа',
        pageSubtitle:
            'Основание черепа — сложная зона (зрение/слуховые нервы, гипофиз, крупные сосуды). Ниже — кратко о диагностике, лечении и реабилитации.',
        accTitle: 'Нейрохирургия основания черепа — общее',
        sec1H2: 'Какие заболевания относятся к основе черепа?',
        sec1P: 'Раздел охватывает опухоли и патологии, расположенные у основания черепа рядом с сосудами и нервами. Из-за критической локализации требуется особый подход.',
        sec2H3: 'Наиболее частые заболевания',
        dL1: 'Опухоли гипофиза: аденомы (пролактинома и др.).',
        dL2: 'Менингиомы (основание черепа, кавернозный синус).',
        dL3: 'Вестибулярная шваннома (акустическая невринома).',
        dL4: 'Хордома и хондросаркома (область кливуса).',
        dL5: 'Тройничная невралгия, гломус-опухоли (параганглиомы), холестеатома.',
        dL6: 'Травмы и врожденные дефекты (переломы основания, ликворея).',
        sec3H3: 'Какие симптомы возможны?',
        sL1: 'Головная боль, двоение, снижение зрения.',
        sL2: 'Шум в ухе/снижение слуха, слабость мимики.',
        sL3: 'Гормональные нарушения (при опухолях гипофиза).',
        sL4: 'Боли/онемение лица (V пара).',
        sL5: 'Нарушение равновесия, головокружение.',
        sL6: 'Течение жидкости из носа (ликворея), риск инфекции.',
        sec4H3: 'Диагностика',
        dxL1: 'МРТ — основной метод для мягких тканей и нервных структур.',
        dxL2: 'КТ — оценка костных структур основания.',
        dxL3: 'Гормональные панели — при патологии гипофиза.',
        dxL4: 'Ангиография — при близости к сосудам (по показаниям).',
        dxL5: 'Эндоскопия — носовые ходы/поиск источника ликвореи.',
        sec5H3: 'Подходы к лечению',
        sec5P: 'Тактика индивидуальна и зависит от типа, размера, распространенности и состояния пациента.',
        s5H41: '1) Эндоскопический эндоназальный доступ',
        s5L1a: 'Без кожных разрезов; быстрее восстановление, лучший косметический эффект.',
        s5L1b: '“Золотой стандарт” при аденомах гипофиза.',
        s5H42: '2) Краниотомия (микрохирургия)',
        s5L2a: '“Keyhole” или классическая краниотомия.',
        s5L2b: 'Цель — полная/максимально безопасная резекция с сохранением нервов/сосудов.',
        s5H43: '3) Дополнительные методы',
        s5L3a: 'Радиохирургия / стереотаксическая лучевая терапия (Gamma/CyberKnife).',
        s5L3b: 'Медикаментозная терапия (контроль гормонального статуса и др.).',
        s5L3c: 'Ликворея — пластика основания, реконструкция; при необходимости поясничный дренаж.',
        sec6H3: 'Риски и осложнения',
        sec6P: 'Кровотечение, инфекция, ликворея, поражение зрительных/слуховых нервов, гормональные сбои. Мы минимизируем риски за счет нейромониторинга и точной навигации.',
        sec7H3: 'Восстановление и наблюдение',
        rL1: 'Обычно 2–5 дней стационара.',
        rL2: 'После эндоназальных операций — ограничения 1–2 недели.',
        rL3: 'Контроль МРТ/КТ и гормонов (при гипофизарной патологии).',
        rL4: 'Реабилитация: ЛФК/физиотерапия, ЛОР/офтальмолог/эндокринолог.',
        sec8H3: 'Почему мы?',
        bL1: 'Опытная skull base-команда и мультидисциплинарный подход.',
        bL2: 'Эндоназальная эндоскопия и “keyhole” микрохирургия.',
        bL3: 'Интраоперационный нейромониторинг, навигация и микроскопия.',
        bL4: 'Индивидуальные планы лечения и плотное наблюдение.',
        sec9H3: 'Свяжитесь с нами',
        cP1: 'Нужна консультация? Позвоните: ',
        phone: '📞 +998 99 074 96 30',
        cP2: 'Или оставьте заявку на сайте — мы свяжемся, уточним детали и запишем на прием.',
    },
    en: {
        pageTitle: 'Skull Base Neurosurgery',
        pageSubtitle:
            'The skull base houses optic/auditory nerves, the pituitary, and major vessels. Below is a compact overview of diagnosis, treatment, and recovery.',
        accTitle: 'Skull base neurosurgery — overview',
        sec1H2: 'What are skull base conditions?',
        sec1P: 'We treat tumors and pathologies located at the skull base near critical neurovascular structures. Due to the central location, specialized approaches are required.',
        sec2H3: 'Common conditions',
        dL1: 'Pituitary tumors: adenomas (e.g., prolactinoma).',
        dL2: 'Meningiomas (skull base, cavernous sinus).',
        dL3: 'Vestibular schwannoma (acoustic neuroma).',
        dL4: 'Chordoma and chondrosarcoma (clivus).',
        dL5: 'Trigeminal neuralgia, glomus (paraganglioma), cholesteatoma.',
        dL6: 'Trauma and congenital defects (basal fractures, CSF leak).',
        sec3H3: 'Possible symptoms',
        sL1: 'Headache, diplopia, reduced vision.',
        sL2: 'Tinnitus/hearing loss, facial nerve weakness.',
        sL3: 'Endocrine changes (pituitary tumors).',
        sL4: 'Facial pain or numbness (CN V).',
        sL5: 'Imbalance, vertigo.',
        sL6: 'Clear nasal discharge (CSF rhinorrhea), infection risk.',
        sec4H3: 'Diagnostics',
        dxL1: 'MRI — main tool for soft tissues and cranial nerves.',
        dxL2: 'CT — bony anatomy of the skull base.',
        dxL3: 'Hormonal panels — in pituitary disease.',
        dxL4: 'Angiography — if vascular proximity suspected.',
        dxL5: 'Endoscopy — nasal pathways/locating CSF leak.',
        sec5H3: 'Treatment approaches',
        sec5P: 'Chosen individually by lesion type, size, extension, and patient status.',
        s5H41: '1) Endoscopic endonasal approach',
        s5L1a: 'No skin incisions; faster recovery, better cosmesis.',
        s5L1b: 'Gold standard for many pituitary adenomas.',
        s5H42: '2) Craniotomy (microsurgical) approaches',
        s5L2a: '“Keyhole” or classic craniotomy.',
        s5L2b: 'Aim — total or maximal safe resection preserving nerves/vessels.',
        s5H43: '3) Adjuncts',
        s5L3a: 'Radiosurgery / stereotactic radiotherapy (Gamma/CyberKnife).',
        s5L3b: 'Medical therapy (e.g., endocrine control).',
        s5L3c: 'CSF leak — reconstruction of skull base; lumbar drain when indicated.',
        sec6H3: 'Risks and complications',
        sec6P: 'Bleeding, infection, CSF leak, injury to optic/auditory nerves, endocrine issues. We minimize risks using intraoperative neuromonitoring and high-precision navigation.',
        sec7H3: 'Recovery and follow-up',
        rL1: 'Typically 2–5 days in hospital.',
        rL2: 'After endonasal surgery: avoid strain/nose-blowing for 1–2 weeks.',
        rL3: 'MRI/CT surveillance and hormonal monitoring (pituitary cases).',
        rL4: 'Rehab: physiotherapy; ENT/ophthalmology/endocrinology as needed.',
        sec8H3: 'Why choose us?',
        bL1: 'Experienced skull base team; multidisciplinary care.',
        bL2: 'Endonasal endoscopy and “keyhole” microsurgery.',
        bL3: 'Intraoperative neuromonitoring, precise navigation and microscopy.',
        bL4: 'Individualized treatment plans and close follow-up.',
        sec9H3: 'Contact us',
        cP1: 'Questions or a consult? Call: ',
        phone: '📞 +998 99 074 96 30',
        cP2: 'Or leave a request on the website — we’ll contact you to clarify details and schedule.',
    },
};

/* ---------- Reusable UI helpers (Tailwind-only) ---------- */
function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-left cursor-pointer"
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
const SectionTitle = ({ as = 'h3', children }) => {
    const base = 'text-slate-900 dark:text-white font-semibold';
    const map = {
        h2: `text-base md:text-[15px] ${base}`,
        h3: `text-sm md:text-[14px] ${base}`,
        h4: `text-[13px] ${base}`,
    };
    const Tag = as;
    return <Tag className={`${map[as]} mt-3 mb-2`}>{children}</Tag>;
};
const P = ({ children }) => (
    <p className="text-[13.5px] md:text-[14px] leading-7 text-slate-700 dark:text-slate-300 mb-3">
        {children}
    </p>
);
const HR = () => (
    <hr className="my-3 border-0 h-px bg-gradient-to-r from-sky-400/40 via-indigo-400/30 to-pink-400/30" />
);
const OL = ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 text-[13.5px] md:text-[14px] text-slate-700 dark:text-slate-300">
        {children}
    </ol>
);
const LI = ({ children }) => <li>{children}</li>;

/* ---------- Page ---------- */
const PatSkullBase = () => {
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

                {/* Single accordion */}
                <div className="space-y-4">
                    <Accordion title={t.accTitle} defaultOpen={true}>
                        <SectionTitle as="h2">{t.sec1H2}</SectionTitle>
                        <P>{t.sec1P}</P>

                        <HR />
                        <SectionTitle as="h3">{t.sec2H3}</SectionTitle>
                        <OL>
                            <LI>{t.dL1}</LI>
                            <LI>{t.dL2}</LI>
                            <LI>{t.dL3}</LI>
                            <LI>{t.dL4}</LI>
                            <LI>{t.dL5}</LI>
                            <LI>{t.dL6}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec3H3}</SectionTitle>
                        <OL>
                            <LI>{t.sL1}</LI>
                            <LI>{t.sL2}</LI>
                            <LI>{t.sL3}</LI>
                            <LI>{t.sL4}</LI>
                            <LI>{t.sL5}</LI>
                            <LI>{t.sL6}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec4H3}</SectionTitle>
                        <OL>
                            <LI>{t.dxL1}</LI>
                            <LI>{t.dxL2}</LI>
                            <LI>{t.dxL3}</LI>
                            <LI>{t.dxL4}</LI>
                            <LI>{t.dxL5}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec5H3}</SectionTitle>
                        <P>{t.sec5P}</P>

                        <SectionTitle as="h4">{t.s5H41}</SectionTitle>
                        <OL>
                            <LI>{t.s5L1a}</LI>
                            <LI>{t.s5L1b}</LI>
                        </OL>

                        <SectionTitle as="h4">{t.s5H42}</SectionTitle>
                        <OL>
                            <LI>{t.s5L2a}</LI>
                            <LI>{t.s5L2b}</LI>
                        </OL>

                        <SectionTitle as="h4">{t.s5H43}</SectionTitle>
                        <OL>
                            <LI>{t.s5L3a}</LI>
                            <LI>{t.s5L3b}</LI>
                            <LI>{t.s5L3c}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec6H3}</SectionTitle>
                        <P>{t.sec6P}</P>

                        <HR />
                        <SectionTitle as="h3">{t.sec7H3}</SectionTitle>
                        <OL>
                            <LI>{t.rL1}</LI>
                            <LI>{t.rL2}</LI>
                            <LI>{t.rL3}</LI>
                            <LI>{t.rL4}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec8H3}</SectionTitle>
                        <OL>
                            <LI>{t.bL1}</LI>
                            <LI>{t.bL2}</LI>
                            <LI>{t.bL3}</LI>
                            <LI>{t.bL4}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.sec9H3}</SectionTitle>
                        <P>
                            {t.cP1}
                            <a
                                href="tel:+998990749630"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.phone}
                            </a>
                        </P>
                        <P>{t.cP2}</P>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatSkullBase;
