// src/pages/patients/PatFunctional.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ---------- I18N ---------- */
const T = {
    uz: {
        pageTitle: 'Funktsional neyroxirurgiya: Reabilitatsiya',
        pageSubtitle:
            'Markazimizda reabilitatsiya — LFK, massaj, fizioterapiya va zamonaviy TMS (transkranial magnit stimulyatsiya) usullari asosida, bolalar va kattalar uchun individual dasturlar bilan.',
        accTitle: 'Reabilitatsiya',
        rehabH2: 'Kompleks tiklovchi xizmatlar',
        rehabIntroP:
            'Respublika ixtisoslashtirilgan neyroxirurgiya markazi quyidagi reabilitatsion xizmatlarni taqdim etadi: <strong>davolovchi jismoniy tarbiya (LFK)</strong>, <strong>massaj</strong>, <strong>fizioterapiya</strong>.',
        lfkH3: 'Davolovchi jismoniy tarbiya (LFK)',
        lfkP: 'LFK markaziy va periferik asab tizimi patologiyalarida, umurtqa kasalliklarida (kattalar va bolalarda) individual yoki guruh metodikasi bo‘yicha o‘tkaziladi. Maqsad: erta (hatto operatsiyadan so‘ng) davrda xavfsiz tiklanish va funksiyalarni qayta tiklash.',
        lfkIndicationsH4: 'LFK uchun ko‘rsatmalar',
        lfkIndications: [
            'Bosh/Orqa miya shikastlari va insult oqibatlari, vegetativ holatlar.',
            'Umurtqa kasalliklari: osteoxondroz, churra/protruziya, skolioz, yallig‘lanish, o‘smalardan so‘ng.',
            'Umurtqa travmalaridan keyingi reabilitatsiya.',
            'Bosh miya o‘smalari va qon-tomir kasalliklari (anevrizma, ONMK, Parkinson, DЭП)dan so‘ng.',
            'Periferik nerv shikastlari (nevritlar, travmatik zararlanish).',
            'Boshqa profillar: yurak-o‘pka, revmatizm, ODA/bo‘g‘im jarohatlaridan so‘ng.',
            'Vaznni boshqarish, qomatni modellashtirish, umumiy sog‘lomlashtirish.',
        ],
        lfkFootP:
            'LFK boshlanishidan oldin mutaxassis va LFK shifokori ko‘rigi o‘tkaziladi, ko‘rsatma/qarshi ko‘rsatmalar aniqlanadi, kurs davomida dinamik nazorat yuritiladi.',
        massageH3: 'Massaj',
        massageP1:
            'Massaj pre- va postoperatsion davrda muhim. Asab-reflektor va mexanik ta’sirlar orqali qon-limfa aylanishini yaxshilaydi, to‘qima nafasini kuchaytiradi, shish va dimlanishni kamaytiradi, ODA harakatchanligini tiklaydi.',
        massageP2:
            'Odatda 10–12 seans tavsiya etiladi (har kuni yoki kunora). Mahalliy massaj 8–20 daqiqa, umumiy ~45 daqiqa. Takroriy kurslar individual belgilanadi.',
        massageTypesH4: 'Markazimizda o‘tkaziladigan massaj turlari',
        massageTypes: [
            'klassik',
            'akupressura (nuqtaviy)',
            '“sharikoterapiya” (instrumental nuqta ta’siri)',
            'segmentar-reflektor',
            'periostal',
            'biriktiruvchi to‘qima massaji',
            'aromaterapevtik',
            'antitsellyulit',
        ],
        physioH3: 'Fizioterapiya',
        physioP1:
            'Toklar, UF/laser, UHF, magnit maydonlar va boshqa usullar bilan davolash dori yukini kamaytiradi, reabilitatsiya samaradorligini oshiradi, xurujlarning oldini oladi, nojo‘ya ta’sirlar minimal.',
        physioP2:
            'Fizioterapiya markaziy/vegetativ asab tizimi faoliyatini, qon-limfa aylanishini, tiklanish jarayonlarini va nerv-mushak o‘tkazuvchanligini yaxshilaydi; bolalar va kattalarda yo‘qolgan funksiyalarni tiklashda qo‘llanadi.',
        tmsH3: 'Transkranial magnit stimulyatsiya (TMS)',
        tmsP1: 'TMS — noinvaziv usul: miya sohalaridagi neyronlarni magnit impulslar bilan faollashtiradi yoki tormozlaydi. Maqsadli ta’sir nutq va kognitiv funksiyalarni ishga tushirishga, mikrotsirkulyatsiyani normallashtirishga yordam beradi.',
        tmsChildrenH4: 'Bolalarda (korrektsiya uchun) qo‘llanadi',
        tmsChildren: [
            'alaliya, dizartriya',
            'nutq/psixorivojlanish kechikishi (ZRR/ZPR), bolalar afaziyasi',
            'RDA/РАС (autistik spektr buzilishlari)',
            'aqliy orqada qolish, genetik sindromlar',
            'logonevroz (tutilish), gipoksiya oqibatlari, ensefalopatiyalar',
            'muayyan shakldagi epilepsiya',
        ],
        tmsAdultsH4: 'Kattalarda qo‘llanadi',
        tmsAdults: [
            'ChMT, insult, miya operatsiyalaridan keyingi holatlar',
            'Kognitiv/nutq buzilishlari: afaziya, dizartriya, apraksiya, agnoziya, amneziya, tafakkur, agrafiya/aleksiya',
        ],
    },
    ru: {
        pageTitle: 'Функциональная нейрохирургия: Реабилитация',
        pageSubtitle:
            'В центре реабилитация строится на ЛФК, массаже, физиотерапии и современной ТМС (транскраниальная магнитная стимуляция) — с индивидуальными программами для детей и взрослых.',
        accTitle: 'Реабилитация',
        rehabH2: 'Комплекс восстановительных услуг',
        rehabIntroP:
            'Центр предоставляет: <strong>лечебную физкультуру (ЛФК)</strong>, <strong>массаж</strong>, <strong>физиотерапию</strong>.',
        lfkH3: 'Лечебная физкультура (ЛФК)',
        lfkP: 'ЛФК проводится по индивидуальной/групповой методике при патологиях ЦНС и ПНС, заболеваниях позвоночника у взрослых и детей. Цель — безопасное раннее восстановление (даже после операций) и возобновление функций.',
        lfkIndicationsH4: 'Показания к ЛФК',
        lfkIndications: [
            'Последствия ЧМТ/СМТ и инсульта, вегетативные состояния.',
            'Заболевания позвоночника: остеохондроз, грыжа/протрузия, сколиоз, воспаление, после опухолей.',
            'Реабилитация после травм позвоночника.',
            'После опухолей головного мозга и сосудистых заболеваний (аневризма, ОНМК, паркинсонизм, ДЭП).',
            'Поражения периферических нервов (невриты, травмы).',
            'Другие профили: кардио-респираторные, ревматизм, травмы ОДА/суставов.',
            'Контроль веса, коррекция осанки, общеоздоровительные программы.',
        ],
        lfkFootP:
            'Перед началом ЛФК — осмотр профильного специалиста и врача ЛФК, определение показаний/противопоказаний, динамический контроль в ходе курса.',
        massageH3: 'Массаж',
        massageP1:
            'Важен в пред- и послеоперационный период. Улучшает крово- и лимфообращение, трофику тканей, снижает отёк/застой, восстанавливает подвижность ОДА.',
        massageP2:
            'Обычно рекомендовано 10–12 сеансов (ежедневно/через день). Локальный 8–20 мин, общий ~45 мин. Повторные курсы — индивидуально.',
        massageTypesH4: 'Виды массажа в центре',
        massageTypes: [
            'классический',
            'акупрессура (точечный)',
            '«шарикотерапия» (инструментальное воздействие)',
            'сегментарно-рефлекторный',
            'периостальный',
            'массаж соединительной ткани',
            'ароматерапевтический',
            'антицеллюлитный',
        ],
        physioH3: 'Физиотерапия',
        physioP1:
            'Токи, УФ/лазер, УВЧ, магнитные поля и др. уменьшают лекарственную нагрузку, повышают эффективность реабилитации, предупреждают обострения, минимизируют побочные эффекты.',
        physioP2:
            'Улучшает работу ЦНС/ВНС, микроциркуляцию, регенерацию и нейромышечную проводимость; применяется для восстановления утраченных функций у детей и взрослых.',
        tmsH3: 'Транскраниальная магнитная стимуляция (ТМС)',
        tmsP1: 'Неинвазивный метод: активирует/тормозит нейроны целевых зон мозга магнитными импульсами. Помогает запускать речь и когнитивные функции, нормализует микроциркуляцию.',
        tmsChildrenH4: 'У детей (коррекция)',
        tmsChildren: [
            'алалия, дизартрия',
            'ЗРР/ЗПР, детская афазия',
            'РАС/аутизм',
            'умственная отсталость, генетические синдромы',
            'логоневроз, последствия гипоксии, энцефалопатии',
            'отдельные формы эпилепсии',
        ],
        tmsAdultsH4: 'У взрослых',
        tmsAdults: [
            'последствия ЧМТ, инсульта, операций на мозге',
            'когнитивные/речевые нарушения: афазия, дизартрия, апраксия, агнозия, амнезия, расстройства мышления, аграфия/алексия',
        ],
    },
    en: {
        pageTitle: 'Functional Neurosurgery: Rehabilitation',
        pageSubtitle:
            'Our rehabilitation programs include therapeutic exercise (PT), massage, physiotherapy, and modern TMS (transcranial magnetic stimulation) with individualized plans for adults and children.',
        accTitle: 'Rehabilitation',
        rehabH2: 'Comprehensive restorative services',
        rehabIntroP:
            'We provide <strong>therapeutic exercise (PT)</strong>, <strong>massage</strong>, and <strong>physiotherapy</strong>.',
        lfkH3: 'Therapeutic exercise (PT)',
        lfkP: 'PT is delivered individually or in groups for CNS/PNS disorders and spinal disease in adults and children. Goal: safe early recovery (even post-op) and restoration of function.',
        lfkIndicationsH4: 'Indications for PT',
        lfkIndications: [
            'Sequelae of TBI/SCI and stroke; vegetative states.',
            'Spinal disorders: osteochondrosis, herniation/protrusion, scoliosis, inflammation; post-tumor.',
            'Rehabilitation after spinal trauma.',
            'After brain tumors and cerebrovascular disease (aneurysm, stroke, parkinsonism, chronic ischemia).',
            'Peripheral nerve injuries (neuritis, trauma).',
            'Other profiles: cardiopulmonary, rheumatic, musculoskeletal injuries.',
            'Weight control, posture correction, general wellness.',
        ],
        lfkFootP:
            'Before PT, a specialist and PT physician assess indications/contraindications; progress is monitored dynamically during the course.',
        massageH3: 'Massage',
        massageP1:
            'Important pre-/post-operatively. Improves blood/lymph flow, tissue trophism, reduces edema and stasis, restores musculoskeletal mobility.',
        massageP2:
            'Typically 10–12 sessions (daily or every other day). Local 8–20 min; general ~45 min. Repeat courses as needed.',
        massageTypesH4: 'Massage types offered',
        massageTypes: [
            'classic',
            'acupressure',
            '“ball therapy” (instrumental point technique)',
            'segmental-reflex',
            'periosteal',
            'connective-tissue massage',
            'aromatherapy massage',
            'anti-cellulite',
        ],
        physioH3: 'Physiotherapy',
        physioP1:
            'Currents, UV/laser, UHF, magnetic fields, etc. reduce drug load, improve rehab efficacy, prevent relapses, and have minimal side effects.',
        physioP2:
            'Improves CNS/ANS function, microcirculation, repair, and neuromuscular conduction; used to restore lost functions in adults and children.',
        tmsH3: 'Transcranial magnetic stimulation (TMS)',
        tmsP1: 'A non-invasive method that activates/inhibits neurons in targeted cortical areas using magnetic pulses, helping recover speech and cognition and normalize microcirculation.',
        tmsChildrenH4: 'Pediatric indications',
        tmsChildren: [
            'alalia, dysarthria',
            'speech/psychomotor delay, childhood aphasia',
            'ASD spectrum',
            'intellectual disability, genetic syndromes',
            'stuttering (logoneurosis), hypoxic sequelae, encephalopathies',
            'selected epilepsy forms',
        ],
        tmsAdultsH4: 'Adult indications',
        tmsAdults: [
            'TBI, stroke, post-craniotomy recovery',
            'cognitive/speech disorders: aphasia, dysarthria, apraxia, agnosia, amnesia, thought disorders, agraphia/alexia',
        ],
    },
};

/* ---------- Reusable UI helpers (Tailwind-only) ---------- */
function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full">
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
    <p
        className="text-[13.5px] md:text-[14px] leading-7 text-slate-700 dark:text-slate-300 mb-3"
        dangerouslySetInnerHTML={{ __html: children }}
    />
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
const PatFunctional = () => {
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
                        <SectionTitle as="h2">{t.rehabH2}</SectionTitle>
                        <P>{t.rehabIntroP}</P>

                        <HR />
                        <SectionTitle as="h3">{t.lfkH3}</SectionTitle>
                        <P>{t.lfkP}</P>
                        <SectionTitle as="h4">
                            {t.lfkIndicationsH4}
                        </SectionTitle>
                        <OL>
                            {t.lfkIndications.map((it, i) => (
                                <LI key={`lfk-${i}`}>{it}</LI>
                            ))}
                        </OL>
                        <P>{t.lfkFootP}</P>

                        <HR />
                        <SectionTitle as="h3">{t.massageH3}</SectionTitle>
                        <P>{t.massageP1}</P>
                        <P>{t.massageP2}</P>
                        <SectionTitle as="h4">{t.massageTypesH4}</SectionTitle>
                        <OL>
                            {t.massageTypes.map((it, i) => (
                                <LI key={`ms-${i}`}>{it}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.physioH3}</SectionTitle>
                        <P>{t.physioP1}</P>
                        <P>{t.physioP2}</P>

                        <HR />
                        <SectionTitle as="h3">{t.tmsH3}</SectionTitle>
                        <P>{t.tmsP1}</P>
                        <SectionTitle as="h4">{t.tmsChildrenH4}</SectionTitle>
                        <OL>
                            {t.tmsChildren.map((it, i) => (
                                <LI key={`tc-${i}`}>{it}</LI>
                            ))}
                        </OL>
                        <SectionTitle as="h4">{t.tmsAdultsH4}</SectionTitle>
                        <OL>
                            {t.tmsAdults.map((it, i) => (
                                <LI key={`ta-${i}`}>{it}</LI>
                            ))}
                        </OL>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatFunctional;
