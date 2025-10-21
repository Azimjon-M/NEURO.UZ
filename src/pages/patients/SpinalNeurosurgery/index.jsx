// src/pages/departments/SpinalNeurosurgery.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ---------- I18N ---------- */
const T = {
    uz: {
        pageTitle: 'Umurtqa (Spinal) Neyroxirurgiya',
        pageSubtitle:
            'Sahifa kontenti ixcham tipografiya va bir xil uslubda. Quyida taqdim etilgan klinik izoh accordion ko‘rinishida joylashtirildi.',
        accTitle:
            'Hozirgi kunda bosh miya metastazlari onkologiya va neyroxirurgiyada dolzarb muammo hisoblanadi.',
        h2: 'Bosh miyaga o‘smalarning metastazi — klinik kuzatuv',
        p1: 'Bosh miyada metastazlar zamonaviy onkologiya va neyroxirurgiyaning eng dolzarb muammolaridan biri. So‘nggi yillardagi yutuqlarga qaramay, bunday bemorlarning umr davomiyligi ko‘pincha qisqa bo‘ladi, nogironlik darajasi esa yuqori. Barcha bosh miya o‘smalari orasida metastazlar 30% gacha ulushni tashkil etadi. Onkologik bemorlarning 40–50% ida autopsiya vaqtida bosh miyaga metastaz aniqlanadi. Bosh miyaga ko‘chish bo‘yicha yetakchi o‘rin — o‘pka raki, undan keyin — sut bezi raki, so‘ng — melanoma. O‘z vaqtida o‘tkazilgan jarrohlik davolash bemorning holatini sezilarli yaxshilashi va to‘laqonli hayot kechirishiga yordam beradi.',
        p2: 'Quyida o‘ng bazal yadrolar proeksiyasida joylashgan sut bezi raki metastazi bilan muvaffaqiyatli operatsiya qilingan bemor misoli keltiriladi. Lobo-temporal sohada kraniotomiya bajarildi; ultratovush navigatsiyasi yordamida o‘choq proeksiyasi aniqlandi va CUSA Exel+ ultratovush destruktor-aspiratori hamda mikroxirurgik texnikalar qo‘llanib, o‘smaviy to‘qima olib tashlandi. Operatsiyadan so‘ng bemor holati qoniqarli: kundalik faoliyatni cheklovsiz bajarishga qodir.',
    },
    ru: {
        pageTitle: 'Спинальная нейрохирургия',
        pageSubtitle:
            'Контент оформлен компактно и единообразно. Ниже — клиническое наблюдение в формате аккордеона.',
        accTitle:
            'Метастаз рака в головной мозг — одна из актуальных проблем современной онкологии и нейрохирургии.',
        h2: 'Метастазы рака в головной мозг — клиническое наблюдение',
        p1: 'Метастазы в головной мозг остаются серьёзной проблемой. Несмотря на успехи последних лет, продолжительность жизни часто невелика, инвалидизация высока. Среди всех опухолей головного мозга доля метастазов достигает ~30%. У 40–50% онкологических пациентов метастазы выявляются при аутопсии. Чаще всего метастазируют: рак лёгких, рак молочной железы, меланома. Своевременное хирургическое лечение способно значительно улучшить состояние пациента и вернуть его к полноценной жизни.',
        p2: 'Представляем случай: у пациента — глубинно расположенный метастаз рака молочной железы в проекции базальных ядер справа. Выполнена трепанация лобно-височной области; с использованием ультразвуковой навигации выполнено удаление образования с применением ультразвукового деструктора-аспиратора CUSA Exel+ и микрохирургической техники. После операции состояние удовлетворительное: пациент способен к повседневной деятельности без ограничений.',
    },
    en: {
        pageTitle: 'Spinal Neurosurgery',
        pageSubtitle:
            'Content uses compact, consistent typography. Below is a clinical note presented as an accordion.',
        accTitle:
            'Brain metastases remain a major challenge in modern oncology and neurosurgery.',
        h2: 'Brain metastasis — clinical observation',
        p1: 'Brain metastases are among the most pressing issues in oncology and neurosurgery. Despite recent advances, survival is often limited and disability rates are high. Metastases account for up to ~30% of intracranial tumors. In 40–50% of oncology patients, brain metastases are found at autopsy. The most common primaries are lung cancer, breast cancer, and melanoma. Timely surgery can markedly improve condition and help patients return to daily life.',
        p2: 'We present a case: a deeply located breast-cancer metastasis in the right basal ganglia region. A frontotemporal craniotomy was performed; using ultrasound navigation the lesion was removed with a CUSA Exel+ ultrasonic aspirator and microsurgical technique. Postoperatively the patient did well and could perform normal daily activities without limitations.',
    },
};

/* ---------- Reusable UI helpers (Tailwind-only) ---------- */
function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full pb-20">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-left"
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

/* ---------- Page ---------- */
const SpinalNeurosurgery = () => {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
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
                        <SectionTitle as="h2">{t.h2}</SectionTitle>
                        <P>{t.p1}</P>
                        <P>{t.p2}</P>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default SpinalNeurosurgery;
