// src/pages/departments/PatNeuroOncology.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ======================== I18N ======================== */
const T = {
    uz: {
        pageTitle: 'Neyroonkologiya',
        pageSubtitle:
            'Ixcham tipografiya, raqamlangan ro‘yxatlar va bir xil uslub — qolgan sahifalarga ham oson ko‘chirish mumkin.',
        acc1Title: 'Bosh miya o‘smalari (neoplazmalar)',
        h2: 'Bosh miya neoplazmalari',
        introP: 'Bosh miya neoplazmasi — miya hujayralarining nazoratsiz ko‘payishi natijasida o‘sma hosil bo‘lishi. O‘smalar xulqiga ko‘ra — yaxshi (benign) yoki yomon (malign), kelib chiqishiga ko‘ra — birlamchi (miya to‘qimalari/yopinchalaridan) yoki ikkilamchi (boshqa a’zolardan metastaz). Yiliga ~10–15 ta holat / 100 000 aholiga to‘g‘ri keladi. O‘smalar har qanday yoshda uchrashi mumkin. Bosh ichi bo‘shlig‘i cheklangani sabab, hatto yaxshi sifatli o‘sma ham miya tuzilmalarini siqib, og‘ir asoratlar chaqirishi mumkin.',
        chH3: 'Asosiy xususiyatlar',
        classH4: 'Klassifikatsiya',
        benignP: 'Yaxshi sifatli o‘smalar:',
        benignL1: 'Sekin o‘sadi.',
        benignL2: 'Ko‘pincha chegaralari aniq bo‘ladi.',
        benignL3: 'Atrof to‘qimalarga kamroq kirib boradi.',
        benignL4: 'Misollar: meningiyoma, gipofiz adenomasi.',
        malignP: 'Yomon sifatli o‘smalar:',
        malignL1: 'Tez o‘sadi.',
        malignL2: 'Atrof to‘qimalarga infiltrativ o‘sadi.',
        malignL3: 'Ko‘pincha miya funksiyalarini buzadi.',
        malignL4: 'Misollar: glioblastoma, anaplastik astrositoma.',
        typesH4: 'Turlari',
        locP: 'Joylashuviga ko‘ra:',
        locL1: 'Ekstraaksial — miya pardalari yoki qon tomirlaridan.',
        locL2: 'Intraaksial (miyaning o‘zidan):',
        locL2a: 'Subtentorial',
        locL2b: 'Supratentorial',
        locL2c: 'Pushtalar (yarim sharlar)',
        locL2d: 'O‘rta chiziq tuzilmalari',
        locL2e: 'Bosh asosidagi o‘smalar',
        originP: 'Kelib chiqishiga ko‘ra:',
        originL1: 'Birlamchi va ikkilamchi (metastatik).',
        originL2:
            'Birlamchi — hujayra manbalariga ko‘ra: astrositar, neyronal, embrional, tomirga oid va boshq.',
        clinH3: 'Klinik ko‘rinishlar',
        clinL1: 'Bosh og‘rigi (ko‘proq ertalab, egilganda kuchayadi).',
        clinL2: 'Ko‘ngil aynishi va qusish (ovqat bilan bog‘liq emas).',
        clinL3: 'Tutqanoq xurujlari (epileptik tutqanoq).',
        clinL4: 'Ko‘rish, eshitish yoki nutqning buzilishi.',
        clinL5: 'Psixik/kognitiv o‘zgarishlar (xotira, xulq).',
        clinL6: 'O‘chokli nevrologik simptomlar (zaiflik, muvofiqlashuvning buzilishi, parezlar).',
        causeH3: 'Rivojlanish sabablari',
        causeP1:
            'Aniq sabablari noma’lum. Radiatsiya, toksinlar, ekologik omillar roli muhokama qilinadi. Bolalarda — tug‘ma rivojlanish nuqsonlari sabab bo‘lishi mumkin. Bosh-miya jarohatlari jarayonni boshlab yuborishi yoki faollashtirishi ehtimoli bor. Ba’zi o‘smalar nur terapiyasi, immunosupressiya yoki OIV fonida paydo bo‘ladi; irsiy moyillik ham mavjud.',
        causeP2:
            'Ikkilamchi (metastatik) o‘smalar 10–30% ni tashkil etadi; ularning ~60% ko‘p o‘choqli bo‘ladi. Ko‘proq metastaz beradigan birlamchi manbalar:',
        metaL1: 'Erkaklarda — o‘pka, yo‘g‘on ichak, buyrak raki.',
        metaL2: 'Ayollarda — ko‘krak, melanoma, yo‘g‘on ichak va o‘pka raki.',
        dxH3: 'Diagnostika',
        dxL1: 'MRT — eng informativ usul.',
        dxL2: 'KT — tezkor baholash uchun.',
        dxL3: 'Biopsiya — o‘sma turini tasdiqlash.',
        dxL4: 'EEG — tutqanoq bo‘lsa.',
        dxL5: 'PET-KT — metabolik faollikni baholash.',
        thH3: 'Davolash',
        thL1: 'Jarrohlik — to‘liq/qisman olib tashlash.',
        thL2: 'Nurlanish terapiyasi — o‘sma hujayralarini yo‘qotish.',
        thL3: 'Kimyoterapiya — o‘sishni susaytirish.',
        prevH3: 'Oldini olish',
        prevP: 'Umumiy tavsiyalar:',
        prevL1: 'Sog‘lom turmush tarzi.',
        prevL2: 'Mumkin qadar ochiq havoda jismoniy faollik.',
        prevL3: 'Yetarli dam olish.',
        prevL4: 'Zararli odatlardan voz kechish (chekish/alkogol — miya o‘smalari xavfini ~30% gacha oshiradi).',
        prevL5: 'Sabzavot-mevalarga boy ratsion.',
        prevL6: 'Stressni kamaytirish yoki unga bo‘lgan munosabatni o‘zgartirish.',
    },
    ru: {
        pageTitle: 'Нейроонкология',
        pageSubtitle:
            'Компактная типографика, нумерованные списки и единый стиль — легко переносится на другие страницы.',
        acc1Title: 'Новообразование головного мозга',
        h2: 'Новообразование головного мозга',
        introP: 'Новообразование — патологическое деление клеток с формированием опухоли. Опухоли бывают доброкачественными/злокачественными, первичными (из тканей мозга/оболочек) и вторичными (метастазы). Частота ~10–15 случаев на 100 000 населения; встречаются в любом возрасте. Из-за ограниченного объёма черепной коробки даже доброкачественная опухоль может вызывать тяжёлое состояние.',
        chH3: 'Основные характеристики',
        classH4: 'Классификация',
        benignP: 'Доброкачественные опухоли:',
        benignL1: 'Растут медленно.',
        benignL2: 'Часто имеют чёткие границы.',
        benignL3: 'Реже инфильтрируют окружающие ткани.',
        benignL4: 'Примеры: менингиома, аденома гипофиза.',
        malignP: 'Злокачественные опухоли:',
        malignL1: 'Растут быстро.',
        malignL2: 'Инфильтрируют окружающие ткани.',
        malignL3: 'Часто нарушают функции мозга.',
        malignL4: 'Примеры: глиобластома, анапластическая астроцитома.',
        typesH4: 'Виды',
        locP: 'По локализации:',
        locL1: 'Внемозговые — из оболочек мозга/сосудов.',
        locL2: 'Внутримозговые:',
        locL2a: 'субтенториальные',
        locL2b: 'супратенториальные',
        locL2c: 'полушарные',
        locL2d: 'срединные структуры',
        locL2e: 'основание черепа',
        originP: 'По происхождению:',
        originL1: 'Первичные и вторичные (метастатические).',
        originL2:
            'Первичные по клеткам-источникам: астроцитарные, нейрональные, эмбриональные, сосудистые и др.',
        clinH3: 'Клинические проявления',
        clinL1: 'Головные боли (чаще утром, усиливаются при наклоне).',
        clinL2: 'Тошнота и рвота (не связаны с едой).',
        clinL3: 'Эпилептические припадки.',
        clinL4: 'Нарушения зрения, слуха или речи.',
        clinL5: 'Психические/когнитивные изменения (память, поведение).',
        clinL6: 'Очаговая неврологическая симптоматика (слабость, координация, парезы).',
        causeH3: 'Причины развития',
        causeP1:
            'Точные причины не определены. Обсуждается роль радиации, токсинов, экологии. У детей возможны врождённые аномалии. ТЧМ может запускать процесс. Часть опухолей возникает после лучевой терапии, на фоне иммуносупрессии и ВИЧ; есть наследственная предрасположенность.',
        causeP2:
            'Метастатические опухоли составляют ~10–30%; около 60% — множественные. Чаще метастазируют:',
        metaL1: 'У мужчин — лёгкое, колоректальный рак, почка.',
        metaL2: 'У женщин — молочная железа, меланома, колоректальный и лёгкое.',
        dxH3: 'Диагностика',
        dxL1: 'МРТ — наиболее информативно.',
        dxL2: 'КТ — для быстрой оценки.',
        dxL3: 'Биопсия — верификация типа.',
        dxL4: 'ЭЭГ — при припадках.',
        dxL5: 'ПЭТ-КТ — метаболическая активность.',
        thH3: 'Лечение',
        thL1: 'Хирургическое удаление (полное/частичное).',
        thL2: 'Лучевая терапия.',
        thL3: 'Химиотерапия.',
        prevH3: 'Профилактика',
        prevP: 'Включает:',
        prevL1: 'Здоровый образ жизни.',
        prevL2: 'Адекватная физическая активность.',
        prevL3: 'Полноценный отдых.',
        prevL4: 'Отказ от вредных привычек (курение/алкоголь ↑ риск опухолей мозга ~на 30%).',
        prevL5: 'Рацион с большим количеством овощей и фруктов.',
        prevL6: 'Снижение стресса или изменение отношения к нему.',
    },
    en: {
        pageTitle: 'Neuro-oncology',
        pageSubtitle:
            'Compact typography, numbered lists, consistent style — easy to reuse on other pages.',
        acc1Title: 'Brain neoplasms (tumors)',
        h2: 'Brain neoplasms',
        introP: 'A brain neoplasm is an abnormal proliferation of cells forming a tumor. Tumors may be benign/malignant, primary (from brain/meninges) or secondary (metastases). Incidence ~10–15 per 100,000; any age. Due to the closed cranial vault, even benign tumors can compress the brain and cause severe symptoms.',
        chH3: 'Key characteristics',
        classH4: 'Classification',
        benignP: 'Benign tumors:',
        benignL1: 'Grow slowly.',
        benignL2: 'Often have clear borders.',
        benignL3: 'Less often infiltrate adjacent tissue.',
        benignL4: 'Examples: meningioma, pituitary adenoma.',
        malignP: 'Malignant tumors:',
        malignL1: 'Grow rapidly.',
        malignL2: 'Infiltrate surrounding tissue.',
        malignL3: 'Frequently impair brain function.',
        malignL4: 'Examples: glioblastoma, anaplastic astrocytoma.',
        typesH4: 'Types',
        locP: 'By location:',
        locL1: 'Extra-axial — from meninges or vessels.',
        locL2: 'Intra-axial (within brain parenchyma):',
        locL2a: 'subtentorial',
        locL2b: 'supratentorial',
        locL2c: 'hemispheric',
        locL2d: 'midline structures',
        locL2e: 'skull base tumors',
        originP: 'By origin:',
        originL1: 'Primary vs. secondary (metastatic).',
        originL2:
            'Primary by cell of origin: astrocytic, neuronal, embryonal, vascular, etc.',
        clinH3: 'Clinical manifestations',
        clinL1: 'Headache (often morning, worse on bending).',
        clinL2: 'Nausea/vomiting (not meal-related).',
        clinL3: 'Seizures.',
        clinL4: 'Visual, auditory or speech disturbances.',
        clinL5: 'Psychiatric/cognitive changes (memory, behavior).',
        clinL6: 'Focal deficits (weakness, ataxia/coordination issues, paresis).',
        causeH3: 'Etiology',
        causeP1:
            'Exact causes unclear. Radiation, toxins, environment may play a role. In children — congenital anomalies. TBI may trigger. Some occur after radiotherapy, with immunosuppression or HIV; genetic predisposition exists.',
        causeP2:
            'Metastatic tumors account for ~10–30%; ~60% are multiple. Most common primaries to metastasize to brain:',
        metaL1: 'Men — lung, colorectal, kidney.',
        metaL2: 'Women — breast, melanoma, colorectal and lung.',
        dxH3: 'Diagnosis',
        dxL1: 'MRI — most informative.',
        dxL2: 'CT — rapid assessment.',
        dxL3: 'Biopsy — histologic verification.',
        dxL4: 'EEG — when seizures present.',
        dxL5: 'PET-CT — metabolic activity.',
        thH3: 'Treatment',
        thL1: 'Surgery — complete/partial resection.',
        thL2: 'Radiotherapy.',
        thL3: 'Chemotherapy.',
        prevH3: 'Prevention',
        prevP: 'Generally includes:',
        prevL1: 'Healthy lifestyle.',
        prevL2: 'Regular physical activity (preferably outdoors).',
        prevL3: 'Adequate rest.',
        prevL4: 'Avoid harmful habits (smoking/alcohol ↑ brain tumor risk by ~30%).',
        prevL5: 'Diet rich in vegetables and fruits.',
        prevL6: 'Reduce stress or change response to it.',
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
const PatNeuroOncology = () => {
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

                {/* Accordions */}
                <div className="space-y-4">
                    {/* 1. Brain neoplasms */}
                    <Accordion title={t.acc1Title} defaultOpen={true}>
                        <SectionTitle as="h2">{t.h2}</SectionTitle>
                        <P>{t.introP}</P>

                        <HR />
                        <SectionTitle as="h3">{t.chH3}</SectionTitle>

                        <SectionTitle as="h4">{t.classH4}</SectionTitle>
                        <P>
                            <strong>{t.benignP}</strong>
                        </P>
                        <OL>
                            <LI>{t.benignL1}</LI>
                            <LI>{t.benignL2}</LI>
                            <LI>{t.benignL3}</LI>
                            <LI>{t.benignL4}</LI>
                        </OL>

                        <P>
                            <strong>{t.malignP}</strong>
                        </P>
                        <OL>
                            <LI>{t.malignL1}</LI>
                            <LI>{t.malignL2}</LI>
                            <LI>{t.malignL3}</LI>
                            <LI>{t.malignL4}</LI>
                        </OL>

                        <SectionTitle as="h4">{t.typesH4}</SectionTitle>
                        <P>
                            <strong>{t.locP}</strong>
                        </P>
                        <OL>
                            <LI>{t.locL1}</LI>
                            <LI>
                                {t.locL2}
                                <OL>
                                    <LI>{t.locL2a}</LI>
                                    <LI>{t.locL2b}</LI>
                                    <LI>{t.locL2c}</LI>
                                    <LI>{t.locL2d}</LI>
                                    <LI>{t.locL2e}</LI>
                                </OL>
                            </LI>
                        </OL>
                        <P>
                            <strong>{t.originP}</strong>
                        </P>
                        <OL>
                            <LI>{t.originL1}</LI>
                            <LI>{t.originL2}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.clinH3}</SectionTitle>
                        <OL>
                            <LI>{t.clinL1}</LI>
                            <LI>{t.clinL2}</LI>
                            <LI>{t.clinL3}</LI>
                            <LI>{t.clinL4}</LI>
                            <LI>{t.clinL5}</LI>
                            <LI>{t.clinL6}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.causeH3}</SectionTitle>
                        <P>{t.causeP1}</P>
                        <P>{t.causeP2}</P>
                        <OL>
                            <LI>{t.metaL1}</LI>
                            <LI>{t.metaL2}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.dxH3}</SectionTitle>
                        <OL>
                            <LI>{t.dxL1}</LI>
                            <LI>{t.dxL2}</LI>
                            <LI>{t.dxL3}</LI>
                            <LI>{t.dxL4}</LI>
                            <LI>{t.dxL5}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.thH3}</SectionTitle>
                        <OL>
                            <LI>{t.thL1}</LI>
                            <LI>{t.thL2}</LI>
                            <LI>{t.thL3}</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.prevH3}</SectionTitle>
                        <P>{t.prevP}</P>
                        <OL>
                            <LI>{t.prevL1}</LI>
                            <LI>{t.prevL2}</LI>
                            <LI>{t.prevL3}</LI>
                            <LI>{t.prevL4}</LI>
                            <LI>{t.prevL5}</LI>
                            <LI>{t.prevL6}</LI>
                        </OL>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatNeuroOncology;
