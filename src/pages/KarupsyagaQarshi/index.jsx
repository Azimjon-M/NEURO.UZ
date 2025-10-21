// src/pages/KorruptsiyagaQarshi.jsx
import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Languages } from '@/context/LanguageContext';

/* ================= I18N ================= */
const UI_T = {
    uz: {
        title: 'Korruptsiyaga qarshi anonim so‘rov',
        subtitle:
            'Maqsad: tibbiy yordam ko‘rsatishda shaffoflikni baholash va noqonuniy to‘lovlar holatlarini anonim aniqlash.',
        s1: '1. Oxirgi 12 oyda muassasamizda tibbiy yordam oldingizmi?',
        s2: '2. Xizmatlar halol va shaffof, yashirin to‘lovlarsiz deb hisoblaysizmi?',
        s3: '3. Bepul va pullik xizmatlar haqida sizga ma’lumot berilganmi?',
        s4: '4. Xodim (shifokor, hamshira, administrator va b.) kassadan tashqari pul yoki sovg‘a so‘radimi?',
        s5: '5. Agar so‘rashgan bo‘lsa, nimaga?',
        s6: '6. Xodimlar barcha bemorlarga moddiy imkoniyatidan qat’i nazar teng munosabatda bo‘ladimi?',
        s7: '7. Korruptsiya haqida xabar berish kontaktlarini (ishonch telefoni, e-pochta va h.k.) bilasizmi?',
        s8: '8. Anonimlik kafolatlanganda bunday holatlar haqida xabar berishga tayyormisiz?',
        s9: '9. Muassasadagi halollik va shaffoflik darajasini 1–5 ball bilan baholang (1 — juda yomon, 5 — juda yaxshi)',
        s10: '10. Sizningcha, qaysi chora-tadbirlar korruptsiyani kamaytiradi?',
        yes: 'Ha',
        no: 'Yo‘q',
        always: 'Har doim',
        often: 'Ko‘pincha',
        sometimes_doubt: 'Ba’zan shubha tug‘iladi',
        often_informal: 'Yo‘q, ko‘pincha “noformal” to‘lovlar talab qilinadi',
        detailed: 'Ha, batafsil',
        partial: 'Qisman',
        none: 'Yo‘q',
        q4_yes_explain: 'Ha, masalan (izoh kiriting) va kim?',
        q4_hint_example: 'Masalan: muolaja uchun pul so‘radi',
        who: 'Kim?',
        q4_hint_who: 'Kim?',
        q4_hint_who_short: 'Kim?',
        q4_implied: 'Imo-ishora qildi. (Kim?)',
        q4_no: 'Yo‘q, uchramadi',
        faster_service: 'Xizmatni tezroq olish',
        operation: 'Operatsiya / gospitalizatsiya',
        meds: 'Dori-darmon / sarf materiallar',
        other_with_note: 'Boshqa (izoh)',
        other_reason_hint: 'Boshqa sabab',
        equal_yes: 'Ha',
        equal_not_always: 'Har doim emas',
        equal_no: 'Yo‘q',
        contacts_yes: 'Ha',
        contacts_unsure: 'Eshitganman, lekin aniq emas',
        contacts_no: 'Yo‘q',
        anonymous_yes: 'Ha',
        anonymous_unsure: 'Ishonchim komil emas',
        anonymous_no: 'Yo‘q, oqibatidan qo‘rqaman',
        measures_transparency:
            'Pullik/bepul xizmatlar haqidagi  ma’lumotni yanada oshkora qilish',
        measures_hotline:
            'Ishonch telefonlarini ko‘rinadigan joyga joylashtirish',
        measures_video: 'Videokuzatuv va nazoratni kuchaytirish',
        measures_salary: 'Xodimlar maoshini oshirish',
        measures_surveys: 'Doimiy anonim so‘rovlarni o‘tkazish',
        measures_other: 'Boshqa (izoh)',
        measures_other_hint: 'Qaysi boshqa choralar?',
        note: 'Eslatma: sizning javoblaringiz mutlaqo anonim. Maqsad — tibbiy yordam sifatida halollik va shaffoflikni yaxshilash.',
        submit: 'Yuborish',
        reset: 'Tozalash',
        val_select: 'Tanlang',
        val_too_short: 'Juda qisqa',
        val_example_req: 'Misolni yozing',
        val_who_req: 'Kim?',
        val_other_req: 'Izoh kiriting',
        error_generic: 'Xatolik yuz berdi. Keyinroq yana urinib ko‘ring.',
    },
    ru: {
        title: 'Анонимный опрос против коррупции',
        subtitle:
            'Цель: оценить прозрачность оказания медпомощи и анонимно выявить случаи незаконных платежей.',
        s1: '1. За последние 12 месяцев Вы получали медицинскую помощь в нашем учреждении?',
        s2: '2. Считаете ли услуги честными и прозрачными, без скрытых платежей?',
        s3: '3. Вам предоставляли информацию о бесплатных и платных услугах?',
        s4: '4. Просил ли сотрудник (врач, медсестра, администратор и т.п.) деньги/подарок вне кассы?',
        s5: '5. Если просили, по какой причине?',
        s6: '6. Ко всем пациентам относятся одинаково вне зависимости от материального положения?',
        s7: '7. Знаете ли Вы контакты для сообщений о коррупции (телефон доверия, e-mail и т.п.)?',
        s8: '8. Готовы ли Вы сообщать анонимно при гарантии конфиденциальности?',
        s9: '9. Оцените уровень честности и прозрачности в учреждении по шкале 1–5 (1 — очень плохо, 5 — отлично)',
        s10: '10. Какие меры, на ваш взгляд, снизят коррупцию?',
        yes: 'Да',
        no: 'Нет',
        always: 'Всегда',
        often: 'Часто',
        sometimes_doubt: 'Иногда возникают сомнения',
        often_informal: 'Нет, часто требуют «неформальные» платежи',
        detailed: 'Да, подробно',
        partial: 'Частично',
        none: 'Нет',
        q4_yes_explain: 'Да, например (введите пример) и кто?',
        q4_hint_example: 'Например: просили деньги за процедуру',
        who: 'Кто?',
        q4_hint_who: 'Кто?',
        q4_hint_who_short: 'Кто?',
        q4_implied: 'Намекали. (Кто?)',
        q4_no: 'Нет, не встречалось',
        faster_service: 'Быстрее получить услугу',
        operation: 'Операция / госпитализация',
        meds: 'Лекарства / расходные материалы',
        other_with_note: 'Другое (указать)',
        other_reason_hint: 'Другая причина',
        equal_yes: 'Да',
        equal_not_always: 'Не всегда',
        equal_no: 'Нет',
        contacts_yes: 'Да',
        contacts_unsure: 'Слышал(а), но не уверен(а)',
        contacts_no: 'Нет',
        anonymous_yes: 'Да',
        anonymous_unsure: 'Не уверен(а)',
        anonymous_no: 'Нет, боюсь последствий',
        measures_transparency:
            'Сделать информацию о платных/бесплатных услугах ещё более открытой',
        measures_hotline: 'Разместить телефоны доверия на видных местах',
        measures_video: 'Усилить видеонаблюдение и контроль',
        measures_salary: 'Повысить зарплату сотрудникам',
        measures_surveys: 'Проводить регулярные анонимные опросы',
        measures_other: 'Другое (указать)',
        measures_other_hint: 'Какие еще меры?',
        note: 'Примечание: ваши ответы полностью анонимны. Цель — повысить честность и прозрачность медпомощи.',
        submit: 'Отправить',
        reset: 'Очистить',
        val_select: 'Выберите',
        val_too_short: 'Слишком коротко',
        val_example_req: 'Опишите пример',
        val_who_req: 'Укажите: кто?',
        val_other_req: 'Добавьте пояснение',
        error_generic: 'Произошла ошибка. Попробуйте позже.',
    },
    en: {
        title: 'Anonymous Anti-Corruption Survey',
        subtitle:
            'Goal: assess transparency in healthcare delivery and anonymously identify illicit payment cases.',
        s1: '1. In the last 12 months, did you receive care at our facility?',
        s2: '2. Do you consider services honest and transparent, without hidden payments?',
        s3: '3. Were you informed about free and paid services?',
        s4: '4. Did any staff (doctor, nurse, administrator, etc.) ask for money/gifts outside the cashier?',
        s5: '5. If asked, what was the reason?',
        s6: '6. Are all patients treated equally regardless of financial status?',
        s7: '7. Do you know the contacts to report corruption (hotline, email, etc.)?',
        s8: '8. Would you report such cases anonymously if confidentiality is guaranteed?',
        s9: '9. Rate honesty and transparency in the facility from 1–5 (1 — very poor, 5 — excellent)',
        s10: '10. Which measures would reduce corruption?',
        yes: 'Yes',
        no: 'No',
        always: 'Always',
        often: 'Often',
        sometimes_doubt: 'Sometimes I have doubts',
        often_informal: 'No, “informal” payments are often demanded',
        detailed: 'Yes, in detail',
        partial: 'Partially',
        none: 'No',
        q4_yes_explain: 'Yes, for example (describe) and who?',
        q4_hint_example: 'E.g., asked money for a procedure',
        who: 'Who?',
        q4_hint_who: 'Who?',
        q4_hint_who_short: 'Who?',
        q4_implied: 'Hinted. (Who?)',
        q4_no: 'No, never happened',
        faster_service: 'To get service faster',
        operation: 'Operation / hospitalization',
        meds: 'Medicines / consumables',
        other_with_note: 'Other (specify)',
        other_reason_hint: 'Other reason',
        equal_yes: 'Yes',
        equal_not_always: 'Not always',
        equal_no: 'No',
        contacts_yes: 'Yes',
        contacts_unsure: 'Heard of them, not sure',
        contacts_no: 'No',
        anonymous_yes: 'Yes',
        anonymous_unsure: 'Not sure',
        anonymous_no: 'No, afraid of consequences',
        measures_transparency:
            'Make info on paid/free services even more transparent',
        measures_hotline: 'Place hotlines in visible locations',
        measures_video: 'Strengthen CCTV and oversight',
        measures_salary: 'Increase staff salaries',
        measures_surveys: 'Run regular anonymous surveys',
        measures_other: 'Other (specify)',
        measures_other_hint: 'What other measures?',
        note: 'Note: your responses are completely anonymous. The goal is to improve honesty and transparency in care.',
        submit: 'Submit',
        reset: 'Reset',
        val_select: 'Please select',
        val_too_short: 'Too short',
        val_example_req: 'Please describe an example',
        val_who_req: 'Please specify who',
        val_other_req: 'Please add a note',
        error_generic: 'An error occurred. Please try again later.',
    },
};

const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());

export default function KarupsyagaQarshi() {
    const { language } = Languages();
    const lang = normalizeLang(language);
    const t = useMemo(() => UI_T[lang] ?? UI_T.uz, [lang]);

    // Yup sxemani ham tilga bog‘laymiz
    const validationSchema = useMemo(
        () =>
            Yup.object({
                q1_12oy_yordam: Yup.string().required(t.val_select),
                q2_shaffoflik: Yup.string().required(t.val_select),

                q4_sorov_turi: Yup.string()
                    .oneOf(['ha_misol', 'imo', 'yoq', ''])
                    .nullable(),

                q4_misol: Yup.string().when('q4_sorov_turi', {
                    is: (v) => v === 'ha_misol',
                    then: (s) =>
                        s
                            .trim()
                            .min(2, t.val_too_short)
                            .required(t.val_example_req),
                    otherwise: (s) => s.notRequired(),
                }),

                q4_kim: Yup.string().when('q4_sorov_turi', {
                    is: (v) => v === 'ha_misol' || v === 'imo',
                    then: (s) =>
                        s
                            .trim()
                            .min(2, t.val_too_short)
                            .required(t.val_who_req),
                    otherwise: (s) => s.notRequired(),
                }),

                q5_boshqa_izoh: Yup.string().when('q5_sabablari', {
                    is: (arr) => Array.isArray(arr) && arr.includes('boshqa'),
                    then: (s) =>
                        s
                            .trim()
                            .min(2, t.val_too_short)
                            .required(t.val_other_req),
                    otherwise: (s) => s.notRequired(),
                }),

                q10_boshqa_izoh: Yup.string().when('q10_choralar', {
                    is: (arr) => Array.isArray(arr) && arr.includes('boshqa'),
                    then: (s) =>
                        s
                            .trim()
                            .min(2, t.val_too_short)
                            .required(t.val_other_req),
                    otherwise: (s) => s.notRequired(),
                }),
            }),
        [t]
    );

    const formik = useFormik({
        initialValues: {
            // 1
            q1_12oy_yordam: '',
            // 2
            q2_shaffoflik: '',
            // 3
            q3_bepul_pullik_info: '',
            // 4
            q4_sorov_turi: '',
            q4_misol: '',
            q4_kim: '',
            // 5
            q5_sabablari: [],
            q5_boshqa_izoh: '',
            // 6
            q6_teng_munosabat: '',
            // 7
            q7_kontaktlar_biladimi: '',
            // 8
            q8_anonim_xabar: '',
            // 9
            q9_baho_1_5: '',
            // 10
            q10_choralar: [],
            q10_boshqa_izoh: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                // TODO: API jo'natish
                console.log(values);
                resetForm();
            } catch (e) {
                console.error(e);
                alert(t.error_generic);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const Error = ({ name }) =>
        formik.touched[name] && formik.errors[name] ? (
            <div className="text-error text-sm mt-1">{formik.errors[name]}</div>
        ) : null;

    const SectionTitle = ({ children }) => (
        <h2 className="text-base md:text-lg font-semibold text-base-content/90">
            {children}
        </h2>
    );

    const Radio = ({ name, value, label }) => (
        <label className="label cursor-pointer justify-start gap-2 px-0">
            <input
                type="radio"
                name={name}
                className="radio radio-sm md:radio-md accent-[#2464AE] dark:accent-[#2464AE]"
                value={value}
                checked={formik.values[name] === value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <span className="label-text text-sm md:text-base">{label}</span>
        </label>
    );

    const Checkbox = ({ name, value, label }) => (
        <label className="label cursor-pointer justify-start gap-2 px-0">
            <input
                type="checkbox"
                className="checkbox checkbox-sm md:checkbox-md accent-[#2464AE] dark:accent-[#2464AE]"
                name={name}
                value={value}
                checked={formik.values[name].includes(value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <span className="label-text text-wrap text-sm md:text-base">
                {label}
            </span>
        </label>
    );

    return (
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 md:px-6 py-6 md:py-8">
            <div className="card bg-base-100 dark:bg-base-200/60 shadow-xl border border-base-200 dark:border-base-300">
                <div className="card-body">
                    <h1 className="text-xl md:text-2xl font-bold text-base-content">
                        {t.title}
                    </h1>
                    <p className="text-base-content/70 text-sm md:text-base">
                        {t.subtitle}
                    </p>

                    <form
                        onSubmit={formik.handleSubmit}
                        className="space-y-6 md:space-y-7"
                    >
                        {/* 1 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s1}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                <Radio
                                    name="q1_12oy_yordam"
                                    value="yes"
                                    label={t.yes}
                                />
                                <Radio
                                    name="q1_12oy_yordam"
                                    value="no"
                                    label={t.no}
                                />
                            </div>
                            <Error name="q1_12oy_yordam" />
                        </section>

                        {/* 2 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s2}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2 md:grid-cols-2">
                                <Radio
                                    name="q2_shaffoflik"
                                    value="har_doim"
                                    label={t.always}
                                />
                                <Radio
                                    name="q2_shaffoflik"
                                    value="kopincha"
                                    label={t.often}
                                />
                                <Radio
                                    name="q2_shaffoflik"
                                    value="bazan_shubha"
                                    label={t.sometimes_doubt}
                                />
                                <Radio
                                    name="q2_shaffoflik"
                                    value="noformal_kop"
                                    label={t.often_informal}
                                />
                            </div>
                            <Error name="q2_shaffoflik" />
                        </section>

                        {/* 3 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s3}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                <Radio
                                    name="q3_bepul_pullik_info"
                                    value="batafsil"
                                    label={t.detailed}
                                />
                                <Radio
                                    name="q3_bepul_pullik_info"
                                    value="qisman"
                                    label={t.partial}
                                />
                                <Radio
                                    name="q3_bepul_pullik_info"
                                    value="yoq"
                                    label={t.none}
                                />
                            </div>
                        </section>

                        {/* 4 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s4}</SectionTitle>

                            <div className="mt-1 grid gap-2">
                                <Radio
                                    name="q4_sorov_turi"
                                    value="ha_misol"
                                    label={t.q4_yes_explain}
                                />
                                {formik.values.q4_sorov_turi === 'ha_misol' && (
                                    <div className="grid sm:grid-cols-2 gap-2 pl-7">
                                        <input
                                            name="q4_misol"
                                            className="input input-bordered w-full dark:bg-base-200 dark:border-base-300"
                                            placeholder={t.q4_hint_example}
                                            value={formik.values.q4_misol}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <input
                                            name="q4_kim"
                                            className="input input-bordered w-full dark:bg-base-200 dark:border-base-300"
                                            placeholder={t.q4_hint_who}
                                            value={formik.values.q4_kim}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                )}

                                <Radio
                                    name="q4_sorov_turi"
                                    value="imo"
                                    label={t.q4_implied}
                                />
                                {formik.values.q4_sorov_turi === 'imo' && (
                                    <div className="pl-7">
                                        <input
                                            name="q4_kim"
                                            className="input input-bordered w-full dark:bg-base-200 dark:border-base-300"
                                            placeholder={t.q4_hint_who_short}
                                            value={formik.values.q4_kim}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                )}

                                <Radio
                                    name="q4_sorov_turi"
                                    value="yoq"
                                    label={t.q4_no}
                                />
                            </div>

                            <Error name="q4_misol" />
                            <Error name="q4_kim" />
                        </section>

                        {/* 5 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s5}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2 md:grid-cols-3">
                                <Checkbox
                                    name="q5_sabablari"
                                    value="tezroq"
                                    label={t.faster_service}
                                />
                                <Checkbox
                                    name="q5_sabablari"
                                    value="operatsiya"
                                    label={t.operation}
                                />
                                <Checkbox
                                    name="q5_sabablari"
                                    value="dori"
                                    label={t.meds}
                                />
                                <Checkbox
                                    name="q5_sabablari"
                                    value="boshqa"
                                    label={t.other_with_note}
                                />
                            </div>
                            {formik.values.q5_sabablari.includes('boshqa') && (
                                <div className="mt-2">
                                    <input
                                        name="q5_boshqa_izoh"
                                        className="input input-bordered w-full dark:bg-base-200 dark:border-base-300"
                                        placeholder={t.other_reason_hint}
                                        value={formik.values.q5_boshqa_izoh}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <Error name="q5_boshqa_izoh" />
                                </div>
                            )}
                        </section>

                        {/* 6 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s6}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                <Radio
                                    name="q6_teng_munosabat"
                                    value="ha"
                                    label={t.equal_yes}
                                />
                                <Radio
                                    name="q6_teng_munosabat"
                                    value="har_doim_emas"
                                    label={t.equal_not_always}
                                />
                                <Radio
                                    name="q6_teng_munosabat"
                                    value="yoq"
                                    label={t.equal_no}
                                />
                            </div>
                        </section>

                        {/* 7 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s7}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                <Radio
                                    name="q7_kontaktlar_biladimi"
                                    value="ha"
                                    label={t.contacts_yes}
                                />
                                <Radio
                                    name="q7_kontaktlar_biladimi"
                                    value="eshitganman_aniq_emas"
                                    label={t.contacts_unsure}
                                />
                                <Radio
                                    name="q7_kontaktlar_biladimi"
                                    value="yoq"
                                    label={t.contacts_no}
                                />
                            </div>
                        </section>

                        {/* 8 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s8}</SectionTitle>
                            <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                <Radio
                                    name="q8_anonim_xabar"
                                    value="ha"
                                    label={t.anonymous_yes}
                                />
                                <Radio
                                    name="q8_anonim_xabar"
                                    value="ishonchim_yoq"
                                    label={t.anonymous_unsure}
                                />
                                <Radio
                                    name="q8_anonim_xabar"
                                    value="yoq_qorqaman"
                                    label={t.anonymous_no}
                                />
                            </div>
                        </section>

                        {/* 9 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s9}</SectionTitle>
                            <div className="mt-1 grid grid-cols-5 gap-1 sm:gap-2 max-w-xs">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <Radio
                                        key={n}
                                        name="q9_baho_1_5"
                                        value={String(n)}
                                        label={String(n)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* 10 */}
                        <section className="grid gap-2">
                            <SectionTitle>{t.s10}</SectionTitle>

                            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                <Checkbox
                                    name="q10_choralar"
                                    value="oshkoralik"
                                    label={t.measures_transparency}
                                />
                                <Checkbox
                                    name="q10_choralar"
                                    value="ishonch_tel"
                                    label={t.measures_hotline}
                                />
                                <Checkbox
                                    name="q10_choralar"
                                    value="video"
                                    label={t.measures_video}
                                />
                                <Checkbox
                                    name="q10_choralar"
                                    value="maosh"
                                    label={t.measures_salary}
                                />
                                <Checkbox
                                    name="q10_choralar"
                                    value="sorovlar"
                                    label={t.measures_surveys}
                                />
                                <Checkbox
                                    name="q10_choralar"
                                    value="boshqa"
                                    label={t.measures_other}
                                />
                            </div>

                            {formik.values.q10_choralar.includes('boshqa') && (
                                <div className="mt-2">
                                    <input
                                        name="q10_boshqa_izoh"
                                        className="input input-bordered w-full dark:bg-base-200 dark:border-base-300"
                                        placeholder={t.measures_other_hint}
                                        value={formik.values.q10_boshqa_izoh}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <Error name="q10_boshqa_izoh" />
                                </div>
                            )}
                        </section>

                        {/* Footer / submit */}
                        <div className="rounded-xl bg-base-200 dark:bg-base-300/50 p-4">
                            <p className="text-xs md:text-sm">
                                <span className="font-medium">Eslatma:</span>{' '}
                                {t.note}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="btn border-0 text-white
                                    bg-[#2464AE] hover:bg-[#1f5da8]
                                    focus:outline-none focus:ring-2 focus:ring-[#2464AE]/30
                                    disabled:bg-[#2464AE]/60 disabled:cursor-not-allowed
                                    dark:bg-[#2464AE] dark:hover:bg-[#1d579b] dark:focus:ring-[#2464AE]/35"
                            >
                                {t.submit}
                            </button>

                            <button
                                type="button"
                                className="btn btn-ghost btn-outline dark:text-base-content"
                                onClick={() => formik.resetForm()}
                                disabled={formik.isSubmitting}
                            >
                                {t.reset}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
