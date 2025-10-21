// src/pages/patients/PatPostDischarge.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';

/* ======================== I18N ======================== */
const T = {
    uz: {
        pageTitle: 'Bo‘shatilgandan keyin',
        pageSubtitle:
            'Quyidagi ko‘rsatmalar umumiy tavsiyalar. Eng asosiysi — davolovchi shifokoringiz bergan ko‘rsatmalarga amal qiling. Noaniqlik bo‘lsa, albatta shifokorga murojaat qiling.',
        accTitle:
            'Neyroxirurgik operatsiyadan so‘ng uyga bo‘shatilgandan keyingi yo‘riqnoma',
        commonH2: 'Umumiy tavsiyalar',
        commonLead:
            'Hurmatli bemor! Iltimos, barcha tavsiyalarni e’tibor bilan bajaring. Quyidagi ro‘yxat umumiy tamoyillarni yodda tutishga yordam beradi. Ishonch hosil qilingki, siz:',
        commonList: [
            'Nimani mumkin, nimani mumkin emas — aniq tushunasiz.',
            'Nazorat qabuliga o‘z vaqtida kelasiz.',
            'Savollar yoki bezovta qiluvchi alomatlar bo‘lsa, darhol shifokorga murojaat qilasiz.',
        ],
        homeH3: 'Uy sharoitida parvarish',
        homeLead:
            'Reabilitatsiya muddati umumiy ahvol, operatsiya turi va hajmiga bog‘liq. Shifokor bilan tiklanish rejasini kelishib oling. Odatdagi tavsiyalar:',
        homeList: [
            'Jismoniy faollikni bosqichma-bosqich oshiring.',
            'Avtomobil boshqarmang — faqat shifokor ruxsat bergach.',
            'Agar choklar bo‘lsa, ularni qachon olib tashlashni aniqlab oling.',
            'Dush qabul qilishda chok sohasini namlatmaslikka harakat qiling; choklar olingach, boshni iliq sovunli suv bilan yuvish va yaxshilab quritish mumkin. Moy/loson/krem surtmang.',
            'Og‘ir yuk ko‘tarmang — faqat ruxsatdan so‘ng.',
            'Dorilarni faqat ko‘rsatmaga muvofiq iching; nojo‘ya ta’sirda shifokorga qo‘ng‘iroq qiling. O‘zboshimchalik bilan to‘xtatmang.',
            'Ba’zi dori vositalarini (steroidlar, tutqanoqqa qarshi va b.) bosqichma-bosqich bekor qilish talab qilinishi mumkin — faqat shifokor ko‘rsatmasiga binoan.',
            'Bosh/umurtqa o‘smalari olib tashlangach, qo‘shimcha kimyo- va/yoki nur terapiyasi kerak bo‘lishi mumkin — onkolog ko‘rsatmasiga asosan o‘z vaqtida ro‘yxatdan o‘ting.',
        ],
        otherH4: 'Qo‘shimcha maslahatlar',
        otherList: [
            'Tayyorlash oson bo‘lgan mahsulotlardan foydalaning.',
            'Oqsilga boy, kaloriyali taom iste’mol qiling.',
            'Suv va suyuqlikni yetarlicha iching (agar shifokor cheklamagan bo‘lsa).',
            'Vitamin/BADlarni boshlashdan oldin shifokor bilan maslahat qiling.',
        ],
        whenH3: 'Qachon shifokorga murojaat qilish kerak?',
        whenLead: 'Quyidagi alomatlarda zudlik bilan bog‘laning:',
        whenList: [
            'Chok atrofida yallig‘lanish (qizarish, ajralma, issiqlik, og‘riq).',
            'Chok ochilib ketishi yoki ajralib qolishi.',
            'Hushning chalkashishi, gallyutsinatsiya.',
            'Behush bo‘lib qolish yoki hushning xiralashishi.',
            'Xotira yo‘qolishi yoki nutq bilan muammo.',
            'Ko‘rishning ikki bo‘lib ko‘rinishi/loyqalanishi yoki qisman/to‘liq yo‘qolishi.',
            'Yuz, qo‘l-oyoqda uvishish, karaxtlik yoki kuchsizlanish.',
            'Bo‘yinda qattiqlik.',
            'Isitma ≥ 38°C yoki titroq (yoki shifokor ko‘rsatgan chegaradan yuqori).',
            'Yorug‘likdan qo‘rqish yoki kuchli bosh og‘rig‘i.',
            'Tutqanoq xuruji.',
            'Siydik/kaltak ushlay olmaslik.',
            'Kuchayib borayotgan yoki to‘xtamaydigan bosh og‘rig‘i.',
            'Haddan tashqari holsizlik.',
            'Doimiy ko‘ngil aynishi yoki ich ketishi.',
            'Teri toshmalari.',
            'Boldir/ikra sohasida og‘riq, qizarish, shish — tromboz ehtimoli (zudlik bilan shifokorga).',
        ],
    },
    ru: {
        pageTitle: 'После выписки',
        pageSubtitle:
            'Ниже приведены общие рекомендации. Главное — следовать указаниям вашего лечащего врача. При любых сомнениях обязательно свяжитесь с врачом.',
        accTitle:
            'Инструкции после выписки из больницы после нейрохирургических операций',
        commonH2: 'Общие рекомендации',
        commonLead:
            'Уважаемый пациент! Пожалуйста, внимательно выполняйте все назначения. Этот список поможет помнить общие принципы. Убедитесь, что вы:',
        commonList: [
            'Понимаете, что можно и что нельзя.',
            'Посещаете контрольные приёмы вовремя.',
            'Обращаетесь к врачу при вопросах и тревожащих симптомах.',
        ],
        homeH3: 'Домашний уход после операции',
        homeLead:
            'Сроки реабилитации зависят от состояния и объёма вмешательства. Согласуйте с врачом план восстановления. Возможные рекомендации:',
        homeList: [
            'Постепенно увеличивайте физическую активность.',
            'Не садитесь за руль до разрешения врача.',
            'Если есть швы — уточните сроки их снятия.',
            'Душ — по необходимости, избегайте намокания шва. После снятия швов голову можно мыть тёплым мыльным раствором, тщательно высушивая. Не наносите масло/лосьон/крем на шов.',
            'Не поднимайте тяжести до разрешения врача.',
            'Принимайте лекарства строго по назначению; при побочных эффектах — позвоните врачу. Не отменяйте препараты самостоятельно.',
            'Отмена стероидов, противосудорожных и др. — только по схеме лечащего врача.',
            'После удаления опухолей головного/спинного мозга может потребоваться химио- и/или лучевая терапия — своевременно обратитесь в онкодиспансер.',
        ],
        otherH4: 'Другие советы',
        otherList: [
            'Используйте простые в приготовлении продукты.',
            'Ешьте калорийную, богатую белком пищу.',
            'Пейте достаточно жидкости (если не ограничено врачом).',
            'Перед витаминами/БАД — посоветуйтесь с врачом.',
        ],
        whenH3: 'Когда срочно обратиться к врачу',
        whenLead: 'Немедленно свяжитесь с врачом при следующих симптомах:',
        whenList: [
            'Признаки инфекции вокруг шва (покраснение, выделения, местная температура, боль).',
            'Шов открылся или разошёлся.',
            'Спутанность сознания, галлюцинации.',
            'Обморок или помутнение сознания.',
            'Проблемы с памятью или речью.',
            'Двоение/размытое зрение или потеря зрения.',
            'Онемение, покалывание или слабость мышц лица, рук, ног или стоп.',
            'Ригидность мышц шеи.',
            'Температура ≥ 38°C или озноб (или выше указанных вашим врачом значений).',
            'Светобоязнь или сильная головная боль.',
            'Судороги.',
            'Недержание мочи/кала.',
            'Усиливающаяся/постоянная головная боль.',
            'Выраженная слабость.',
            'Постоянная тошнота или понос.',
            'Новая сыпь.',
            'Боль/покраснение/отёк в голени — возможный тромбоз (срочно к врачу).',
        ],
    },
    en: {
        pageTitle: 'After Discharge',
        pageSubtitle:
            'The guidance below is general. Above all, follow your treating physician’s instructions. If unsure, contact your doctor.',
        accTitle: 'Post-discharge instructions after neurosurgical procedures',
        commonH2: 'General recommendations',
        commonLead:
            'Dear patient, please follow all instructions carefully. The list below helps you remember key principles. Make sure you:',
        commonList: [
            'Understand clearly what is allowed and what is restricted.',
            'Attend follow-up appointments on time.',
            'Contact your doctor if you have questions or concerning symptoms.',
        ],
        homeH3: 'Home care after surgery',
        homeLead:
            'Recovery time depends on your condition and the type/extent of surgery. Agree on a recovery plan with your doctor. Typical advice:',
        homeList: [
            'Increase physical activity gradually.',
            'Do not drive until your doctor clears you.',
            'If you have sutures, clarify when they will be removed.',
            'Showers as needed; avoid wetting the incision. After suture removal, you may wash hair with mild soap and dry thoroughly. Do not apply oil, powder, lotion, or cream to the incision.',
            'Avoid heavy lifting until allowed.',
            'Take medicines exactly as prescribed; call your doctor about side effects. Do not stop medications on your own.',
            'Tapering steroids, anti-seizure meds, etc. should follow your doctor’s plan only.',
            'After brain/spinal tumor removal, adjuvant chemo and/or radiotherapy may be required — arrange oncology follow-up promptly.',
        ],
        otherH4: 'Additional tips',
        otherList: [
            'Use easy-to-prepare foods.',
            'Choose protein-rich, calorie-dense meals.',
            'Drink enough fluids (unless restricted).',
            'Consult your doctor before starting vitamins/supplements.',
        ],
        whenH3: 'When to contact your doctor urgently',
        whenLead: 'Seek medical advice immediately if you develop:',
        whenList: [
            'Signs of wound infection (redness, discharge, warmth, pain).',
            'Incision opens or separates.',
            'Confusion or hallucinations.',
            'Fainting or clouded consciousness.',
            'Memory loss or speech problems.',
            'Double/blurred vision or partial/complete loss of vision.',
            'Numbness/tingling or weakness in face, arms, legs, or feet.',
            'Neck stiffness.',
            'Fever ≥ 38°C (100.4°F) or chills (or above thresholds set by your doctor).',
            'Photophobia or severe headache.',
            'Seizures.',
            'Loss of bladder/bowel control.',
            'Worsening or persistent headache.',
            'Marked weakness.',
            'Persistent nausea or diarrhea.',
            'New skin rash.',
            'Pain/redness/swelling in the calf — possible DVT (urgent!).',
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
                <span className="font-semibold text-[#2464AE] text-sm md:text-base leading-snug">
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
const UL = ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-[13.5px] md:text-[14px] text-slate-700 dark:text-slate-300">
        {children}
    </ul>
);
const LI = ({ children }) => <li>{children}</li>;

/* ---------- Page ---------- */
const PatPostDischarge = () => {
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
                        <SectionTitle as="h2">{t.commonH2}</SectionTitle>
                        <P>{t.commonLead}</P>
                        <UL>
                            {t.commonList.map((item, i) => (
                                <LI key={`c-${i}`}>{item}</LI>
                            ))}
                        </UL>

                        <HR />
                        <SectionTitle as="h3">{t.homeH3}</SectionTitle>
                        <P>{t.homeLead}</P>
                        <OL>
                            {t.homeList.map((item, i) => (
                                <LI key={`h-${i}`}>{item}</LI>
                            ))}
                        </OL>

                        <SectionTitle as="h4">{t.otherH4}</SectionTitle>
                        <OL>
                            {t.otherList.map((item, i) => (
                                <LI key={`o-${i}`}>{item}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.whenH3}</SectionTitle>
                        <P>{t.whenLead}</P>
                        <UL>
                            {t.whenList.map((item, i) => (
                                <LI key={`w-${i}`}>{item}</LI>
                            ))}
                        </UL>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatPostDischarge;
