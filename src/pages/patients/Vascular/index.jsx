// src/pages/patients/PatVascular.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ---------- I18N ---------- */
const T = {
    uz: {
        pageTitle: 'Qon tomir neyroxirurgiyasi',
        pageSubtitle:
            'Ushbu sahifada markazimizga yotqizish tartibi (“Gospitalizatsiya”) va zarur hujjatlar/tekshiruvlar haqida ma’lumot topasiz.',
        accTitle: 'Markazga gospitalizatsiya',
        introH2: 'Gospitalizatsiya bo‘yicha ma’lumot',
        introP: 'Respublika ixtisoslashtirilgan neyroxirurgiya ilmiy-amaliy tibbiyot markazi markaziy va periferik asab tizimi kasalliklarini diagnostika va davolash bilan shug‘ullanadi.',
        docsH3: 'Gospitalizatsiyada kerakli hujjatlar',
        docsList: [
            'O‘zbekiston Respublikasi fuqarosining pasporti (rasm va propiska sahifasi).',
            'Tug‘ilganlik haqida guvohnoma (bolalar uchun).',
            'Ota-onalardan birining pasporti (bolalar uchun).',
        ],
        phoneLead: 'Barcha savollar uchun registraturaga qo‘ng‘iroq qiling:',
        phoneLabel: '+998 71 264 96 09',
        hoursH3: 'Ish vaqti',
        hoursText:
            'Du, Se, Ch, Pa, Ju, Sh: 08:00 — 14:00 • Yakshanba: dam olish',
        benefitsH3: 'Imtiyozli toifalar',
        benefitsP1:
            'O‘zbekiston Respublikasi Davlat byudjeti hisobidan ko‘rsatiladigan yordam toifasi Prezidentning 2003-yil 26-fevraldagi PF-3214-son Farmoni bilan tartibga solingan.',
        benefitsLinkLabel: 'lex.uz hujjati',
        benefitsLinkHref: 'https://lex.uz/docs/170150',
        checklistH3:
            'RINPITM Neyroxirurgiya markaziga (Toshkent shahri) yotqizishda yoningizda bo‘lishi zarur',
        checklistList: [
            'Tekshiruvlar va analizlar natijalari.',
            'Hujjatlar: shaxsni tasdiqlovchi hujjat; bolaning tug‘ilganlik haqida guvohnomasi (bolalar uchun); ota-onalardan birining pasporti (bolalar uchun); gospitalizatsiyaga yo‘llanma.',
            'Mehnatga layoqatsizlik varaqasi (mavjud bo‘lsa).',
        ],
        checklistNote: 'Gospitalizatsiya ish kunlari 08:00 dan 14:00 gacha.',
        personalH4: 'Shaxsiy gigiyena buyumlari (tavsiya etiladi)',
        personalList: [
            'Tish cho‘tkasi va pasta.',
            'Bir martalik ustara.',
            'Gubka (moycha).',
            'Qulay, keng kiyim va poyabzal.',
            'Kichik piyola/qo‘lqop va qoshiq (asosiy ovqatdan tashqari tamaddi uchun).',
        ],
        noteValuables:
            'Iltimos, qimmatbaho buyumlar va katta miqdordagi pul olib kelmang. Mobil telefonlar — faqat jim (vibratsiya) rejimida. Yo‘l/joylashish xarajatlari bemor va hamroh zimmasida.',
        requiredH3: 'Muhim! Majburiy tekshiruv va analizlar',
        requiredIntro: '(RINPITM poliklinikasida o‘tkaziladi)',
        requiredList: [
            'EKG (plyonka va xulosa).',
            'Umumiy qon tahlili (eritrotsit, trombotsit, gemoglobin, leykotsit, SOE).',
            'OIV (amal qilish muddati — 6 oy).',
            'Gepatit B va C (amal qilish muddati — 1 oy).',
            'RW (sifilis) (amal qilish muddati — 1 oy).',
            'Tor mutaxassislar xulosalari (ko‘rsatmaga ko‘ra): endokrinolog, kardiolog, LOR va boshqalar — operatsiyaga qarshi ko‘rsatma yo‘qligi haqida.',
            'Stomatolog xulosasi — og‘iz bo‘shlig‘i sanatsiyasi haqida.',
            'Flyuorografiya (kattalar uchun).',
            'KT, MRT, rentgen tekshiruvlari (mavjud bo‘lsa — butun arxiv).',
            'Terapevt xulosasi (bolalarda — pediatr xulosasi).',
            'Qo‘shimcha: koronavirus infeksiyasiga test.',
        ],
        noteCovid:
            'Hamroh shaxslar (ona, ota va h.k.) uchun ham koronavirus test natijasi talab etiladi. Biror tahlil bo‘lmasa, gospitalizatsiya rad etilishi mumkin.',
        groomingNote:
            'Gospitalizatsiyadan oldin qo‘l va oyoq tirnoqlari kalta qilib olinishi lozim. Sun’iy qoplama/soxta tirnoqlar va lak olib tashlansin.',
    },
    ru: {
        pageTitle: 'Сосудистая нейрохирургия',
        pageSubtitle:
            'Здесь вы найдёте порядок госпитализации и перечень необходимых документов/обследований.',
        accTitle: 'Госпитализация в центр',
        introH2: 'Информация для госпитализации',
        introP: 'Республиканский специализированный научно-практический медицинский Центр нейрохирургии выполняет диагностику и лечение патологии центральной и периферической нервной системы.',
        docsH3: 'Документы при госпитализации',
        docsList: [
            'Паспорт гражданина Республики Узбекистан (страница с фото и с пропиской).',
            'Свидетельство о рождении (для детей).',
            'Паспорт одного из родителей (для детей).',
        ],
        phoneLead: 'По всем вопросам звоните в регистратуру:',
        phoneLabel: '+998 71 264 96 09',
        hoursH3: 'График работы',
        hoursText: 'Пн–Сб: 08:00 — 14:00 • Вс: выходной',
        benefitsH3: 'Льготные категории',
        benefitsP1:
            'Перечень льгот регулируется Указом Президента №УП-3214 от 26.02.2003 «О мерах по дальнейшему реформированию системы здравоохранения».',
        benefitsLinkLabel: 'lex.uz документ',
        benefitsLinkHref: 'https://lex.uz/docs/170150',
        checklistH3:
            'Что иметь при себе для госпитализации в РСНПМЦНХ (г. Ташкент)',
        checklistList: [
            'Результаты обследований и анализов.',
            'Документы: удостоверение личности; свидетельство о рождении пациента (для детей); паспорт одного из родителей (для детей); направление на госпитализацию.',
            'Листок нетрудоспособности (при наличии).',
        ],
        checklistNote: 'Госпитализация в будние дни с 08:00 до 14:00.',
        personalH4: 'Предметы личной гигиены (рекомендуем иметь)',
        personalList: [
            'Зубная щётка и паста.',
            'Одноразовые бритвенные станки.',
            'Мочалка.',
            'Удобная свободная одежда и обувь.',
            'Кружка и ложка (для перекусов).',
        ],
        noteValuables:
            'Просьба не брать в стационар ценные вещи и крупные суммы денег. Мобильные телефоны — в беззвучном режиме. Расходы на дорогу/проживание пациенты и сопровождающие несут самостоятельно.',
        requiredH3: 'Важно! Обязательные обследования и анализы',
        requiredIntro: '(Проводятся в поликлинике РСНПМЦН)',
        requiredList: [
            'ЭКГ (плёнка и заключение).',
            'ОАК (эритроциты, тромбоциты, гемоглобин, лейкоциты, СОЭ).',
            'Анализ на ВИЧ (срок годности — 6 мес).',
            'Гепатит B и C (срок — 1 мес).',
            'Кровь на RW (срок — 1 мес).',
            'Заключения узких специалистов (по показаниям) об отсутствии противопоказаний к операции: эндокринолог, кардиолог, оториноларинголог и др.',
            'Заключение стоматолога о санации полости рта.',
            'Флюорография (для взрослых).',
            'КТ, МРТ, рентген (при наличии — весь архив).',
            'Заключение терапевта (у детей — педиатра).',
            'Дополнительно: анализ на коронавирусную инфекцию.',
        ],
        noteCovid:
            'Сопровождающим также требуется результат анализа на коронавирусную инфекцию. При отсутствии какого-либо анализа в госпитализации может быть отказано.',
        groomingNote:
            'Перед госпитализацией у пациента должны быть коротко подстрижены ногти на руках и ногах. Просьба снять искусственное покрытие/накладные ногти и лак.',
    },
    en: {
        pageTitle: 'Cerebrovascular Neurosurgery',
        pageSubtitle:
            'Here you’ll find the hospital admission procedure and the required documents/tests.',
        accTitle: 'Hospital admission',
        introH2: 'Admission information',
        introP: 'The Republican Specialized Neurosurgery Center provides diagnostics and treatment for disorders of the central and peripheral nervous system.',
        docsH3: 'Documents for admission',
        docsList: [
            'National passport (photo and registration pages).',
            'Birth certificate (for pediatric patients).',
            'Passport of one parent (for pediatric patients).',
        ],
        phoneLead: 'For inquiries, call the reception desk:',
        phoneLabel: '+998 71 264 96 09',
        hoursH3: 'Working hours',
        hoursText: 'Mon–Sat: 08:00 — 14:00 • Sun: closed',
        benefitsH3: 'Beneficiary categories',
        benefitsP1:
            'Beneficiary care covered by the state budget is regulated by Presidential Decree No. UP-3214 dated 26-Feb-2003.',
        benefitsLinkLabel: 'lex.uz document',
        benefitsLinkHref: 'https://lex.uz/docs/170150',
        checklistH3: 'What to bring for admission to the Center (Tashkent)',
        checklistList: [
            'Results of examinations and lab tests.',
            'Documents: ID; patient’s birth certificate (children); passport of one parent (children); hospital referral.',
            'Sick leave certificate (if available).',
        ],
        checklistNote: 'Admission on weekdays from 08:00 to 14:00.',
        personalH4: 'Personal hygiene items (recommended)',
        personalList: [
            'Toothbrush and toothpaste.',
            'Disposable razor.',
            'Sponge/washcloth.',
            'Comfortable loose clothing and shoes.',
            'Cup and spoon (for snacks between meals).',
        ],
        noteValuables:
            'Please do not bring valuables or large sums of cash. Phones should be on silent. Travel/accommodation costs are not covered by the Center.',
        requiredH3: 'Important! Mandatory tests and examinations',
        requiredIntro: '(Performed at the Center’s outpatient clinic)',
        requiredList: [
            'ECG (strip and report).',
            'Complete blood count (RBC, platelets, hemoglobin, WBC, ESR).',
            'HIV test (valid for 6 months).',
            'Hepatitis B and C tests (valid for 1 month).',
            'Syphilis (RW) test (valid for 1 month).',
            'Specialist clearances when indicated: endocrinologist, cardiologist, ENT, etc. — confirming no contraindications to surgery.',
            'Dentist clearance (oral sanitation).',
            'Chest X-ray/fluorography (adults).',
            'CT/MRI/X-ray (bring full archive if available).',
            'Physician’s report (pediatrician for children).',
            'Additionally: COVID-19 test.',
        ],
        noteCovid:
            'Caregivers must also provide a COVID-19 test result. Admission may be refused if any required test is missing.',
        groomingNote:
            'Before admission, fingernails and toenails must be trimmed short. Please remove artificial/press-on nails and nail polish.',
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
const PatVascular = () => {
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
                        <SectionTitle as="h2">{t.introH2}</SectionTitle>
                        <P>{t.introP}</P>

                        <SectionTitle as="h3">{t.docsH3}</SectionTitle>
                        <OL>
                            {t.docsList.map((x, i) => (
                                <LI key={`doc-${i}`}>{x}</LI>
                            ))}
                        </OL>
                        <P>
                            {t.phoneLead}{' '}
                            <a
                                href="tel:+998712649609"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.phoneLabel}
                            </a>
                        </P>

                        <HR />
                        <SectionTitle as="h3">{t.hoursH3}</SectionTitle>
                        <P>{t.hoursText}</P>

                        <HR />
                        <SectionTitle as="h3">{t.benefitsH3}</SectionTitle>
                        <P>{t.benefitsP1}</P>
                        <P>
                            Link:{' '}
                            <a
                                href={t.benefitsLinkHref}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-sky-700 dark:text-sky-300 underline"
                            >
                                {t.benefitsLinkLabel}
                            </a>
                        </P>

                        <HR />
                        <SectionTitle as="h3">{t.checklistH3}</SectionTitle>
                        <OL>
                            {t.checklistList.map((x, i) => (
                                <LI key={`ch-${i}`}>{x}</LI>
                            ))}
                        </OL>
                        <P>{t.checklistNote}</P>

                        <SectionTitle as="h4">{t.personalH4}</SectionTitle>
                        <OL>
                            {t.personalList.map((x, i) => (
                                <LI key={`pi-${i}`}>{x}</LI>
                            ))}
                        </OL>
                        <P className="italic">{t.noteValuables}</P>

                        <HR />
                        <SectionTitle as="h3">{t.requiredH3}</SectionTitle>
                        <P>{t.requiredIntro}</P>
                        <OL>
                            {t.requiredList.map((x, i) => (
                                <LI key={`req-${i}`}>{x}</LI>
                            ))}
                        </OL>
                        <P className="italic">{t.noteCovid}</P>
                        <P>{t.groomingNote}</P>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatVascular;
