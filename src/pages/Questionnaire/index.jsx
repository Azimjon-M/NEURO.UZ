// src/pages/SurveyForm.jsx
import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStar } from 'react-icons/fa';
import { Languages } from '@/context/LanguageContext';
import ApiResult from '@/services/sorovnoma';

/* ---------------------- Tailwind helpers ---------------------- */
const brand = '#2464AE';
const containerCls =
    'mx-auto w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4';

const inputCls =
    'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 ' +
    'px-4 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent ' +
    'focus:ring-[#2464AE] transition';

const areaCls = inputCls + ' min-h-[88px]';

/* ---------------------- I18N ---------------------- */
const T = {
    uz: {
        siteTitle: 'Respublika Ixtisoslashtirilgan Neyroxirurgiya Markazi',
        siteSub: 'Tibbiy xizmat sifatini oshirish maqsadida anonim so‘rovnoma',
        bannerTitle: 'Hurmatli fuqaro!',
        bannerSub:
            'Iltimos, quyidagi savollarga javob bering. * bilan belgilangan maydonlar majburiy.',
        bannerNote: 'Ma’lumotlaringiz maxfiy saqlanadi.',
        formTitle: 'Shaxsiy ma’lumotlaringiz',
        fullName: 'To‘liq ism',
        phone: 'Telefon raqam',
        phonePH: '+998901234567',
        ward: 'Bo‘lim/palata',
        birthDate: 'Tug‘ilgan sana',
        gender: 'Jins (ixtiyoriy)',
        choose: 'Tanlang',
        male: 'Erkak',
        female: 'Ayol',

        s1: '1. Bo‘lim sharoitidan qoniqdingizmi?',
        s2: '2. Tibbiyot xodimlari munosabati',
        s2_doctor: 'Shifokor:',
        s2_nurse: 'Hamshira:',
        s2_sanitary: 'Sanitar:',
        s3: '3. Sizni davolagan shifokor',
        fio: 'Ism-sharifi',
        s3_politeness: 'Muomala',
        s4: '4. Davolash sifati',
        s5: '5. Hamshira xizmati',
        s6: '6. Sanitariya holati',
        s7: '7. Ovqatlanish sifati',
        s8: '8. Laboratoriya xizmati',
        s9: '9. Diagnostika sifati',
        s10: '10. Umumiy qoniqish',
        s11: '11. Takliflaringiz',
        s12: '12. Umumiy fikr-mulohazangiz',

        reasonPH: 'Sababi...',
        offerPH: 'Taklifingiz...',
        thoughtPH: 'Fikringiz...',
        submit: 'Yuborish',

        starAria: 'Yulduzli baho',
        starUnit: 'baho',
        valueOutOf: (v) => `${v}/10`,

        errors: {
            fullName: 'To‘liq ism majburiy',
            phone: 'Telefon raqamingiz majburiy',
            ward: 'Bo‘lim/palata majburiy',
            fio: 'Shifokor ismi majburiy',
            phonePattern: 'Raqam formati: +998XXXXXXXXX',
        },
    },
    ru: {
        siteTitle: 'Республиканский специализированный центр нейрохирургии',
        siteSub: 'Анонимный опрос для повышения качества медицинских услуг',
        bannerTitle: 'Уважаемый гражданин!',
        bannerSub:
            'Пожалуйста, ответьте на вопросы ниже. Поля, отмеченные *, обязательны.',
        bannerNote: 'Ваши данные будут храниться конфиденциально.',
        formTitle: 'Ваши персональные данные',
        fullName: 'Ф.И.О.',
        phone: 'Номер телефона',
        phonePH: '+998901234567',
        ward: 'Отделение/палата',
        birthDate: 'Дата рождения',
        gender: 'Пол (необязательно)',
        choose: 'Выберите',
        male: 'Мужчина',
        female: 'Женщина',

        s1: '1. Удовлетворены ли условиями отделения?',
        s2: '2. Отношение медперсонала',
        s2_doctor: 'Врач:',
        s2_nurse: 'Медсестра:',
        s2_sanitary: 'Санитар:',
        s3: '3. Лечащий врач',
        fio: 'Ф.И.О.',
        s3_politeness: 'Общение',
        s4: '4. Качество лечения',
        s5: '5. Работа медсестры',
        s6: '6. Санитарное состояние',
        s7: '7. Качество питания',
        s8: '8. Лабораторная служба',
        s9: '9. Качество диагностики',
        s10: '10. Общая удовлетворенность',
        s11: '11. Ваши предложения',
        s12: '12. Ваше общее мнение',

        reasonPH: 'Причина...',
        offerPH: 'Ваше предложение...',
        thoughtPH: 'Ваше мнение...',
        submit: 'Отправить',

        starAria: 'Оценка звездами',
        starUnit: 'оценка',
        valueOutOf: (v) => `${v}/10`,

        errors: {
            fullName: 'Ф.И.О. обязательно',
            phone: 'Номер телефона обязателен',
            ward: 'Отделение/палата обязательно',
            fio: 'Имя врача обязательно',
            phonePattern: 'Формат: +998XXXXXXXXX',
        },
    },
    en: {
        siteTitle: 'Republican Specialized Neurosurgery Center',
        siteSub: 'Anonymous survey to improve the quality of care',
        bannerTitle: 'Dear patient!',
        bannerSub:
            'Please answer the questions below. Fields marked with * are required.',
        bannerNote: 'Your information will be kept confidential.',
        formTitle: 'Your personal information',
        fullName: 'Full name',
        phone: 'Phone number',
        phonePH: '+998901234567',
        ward: 'Department/ward',
        birthDate: 'Date of birth',
        gender: 'Gender (optional)',
        choose: 'Select',
        male: 'Male',
        female: 'Female',

        s1: '1. Are you satisfied with the ward conditions?',
        s2: '2. Attitude of medical staff',
        s2_doctor: 'Doctor:',
        s2_nurse: 'Nurse:',
        s2_sanitary: 'Orderly:',
        s3: '3. Your attending physician',
        fio: 'Full name',
        s3_politeness: 'Communication',
        s4: '4. Quality of treatment',
        s5: '5. Nursing service',
        s6: '6. Sanitary conditions',
        s7: '7. Food quality',
        s8: '8. Laboratory service',
        s9: '9. Quality of diagnostics',
        s10: '10. Overall satisfaction',
        s11: '11. Your suggestions',
        s12: '12. Overall feedback',

        reasonPH: 'Reason...',
        offerPH: 'Your suggestion...',
        thoughtPH: 'Your feedback...',
        submit: 'Submit',

        starAria: 'Star rating',
        starUnit: 'rating',
        valueOutOf: (v) => `${v}/10`,

        errors: {
            fullName: 'Full name is required',
            phone: 'Phone number is required',
            ward: 'Department/ward is required',
            fio: 'Physician name is required',
            phonePattern: 'Format must be: +998XXXXXXXXX',
        },
    },
};

/* ---------------------- Accessible Star Rating ---------------------- */
const StarRating = ({
    name,
    value = 0,
    setFieldValue,
    max = 10,
    ariaLabel,
    ariaLabelledBy,
    unitText = 'rating',
    valueText = (v) => `${v}/10`,
}) => {
    const [hover, setHover] = useState(0);
    const active = hover || value;

    const stars = useMemo(
        () => Array.from({ length: max }, (_, i) => i + 1),
        [max]
    );

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            setFieldValue(name, Math.min((value || 0) + 1, max));
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            setFieldValue(name, Math.max((value || 0) - 1, 0));
        }
        if (e.key === 'Home') {
            e.preventDefault();
            setFieldValue(name, 0);
        }
        if (e.key === 'End') {
            e.preventDefault();
            setFieldValue(name, max);
        }
    };

    return (
        <div className="flex items-center gap-2 select-none">
            <div
                className="flex gap-1 mt-1"
                role="slider"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {stars.map((rating) => (
                    <FaStar
                        key={rating}
                        onMouseEnter={() => setHover(rating)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setFieldValue(name, rating)}
                        className={`cursor-pointer h-6 w-6 transition-transform ${
                            active >= rating
                                ? 'text-yellow-400'
                                : 'text-slate-300 dark:text-slate-600'
                        } hover:scale-110`}
                        aria-label={`${rating} ${unitText}`}
                    />
                ))}
            </div>
            <span className="ml-1 text-sm text-slate-600 dark:text-slate-300">
                {valueText(value)}
            </span>
        </div>
    );
};

/* ---------------------- Tashqariga ko‘chirilgan yordamchi komponentlar ---------------------- */
const Card = ({ title, children, subtitle, titleId }) => (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm p-4 sm:p-6">
        <div className="mb-3">
            <h2
                id={titleId}
                className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100"
            >
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {subtitle}
                </p>
            ) : null}
        </div>
        {children}
    </section>
);

const InputError = ({ formik, name }) =>
    formik.touched[name] && formik.errors[name] ? (
        <div className="mt-1 text-sm text-red-500">{formik.errors[name]}</div>
    ) : null;

/* ---------------------- Component ---------------------- */
export default function SurveyForm() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const t = useMemo(() => T[language] ?? T.uz, [language]);

    /* ---------------------- Yup validation (i18n) ---------------------- */
    const validationSchema = useMemo(
        () =>
            Yup.object({
                fullName: Yup.string().required(t.errors.fullName),
                phone: Yup.string()
                    .required(t.errors.phone)
                    .matches(/^\+998[0-9]{9}$/, t.errors.phonePattern),
                ward: Yup.string().required(t.errors.ward),
                davolaganShifokorFIO: Yup.string().required(t.errors.fio),
            }),
        [t]
    );

    /* ---------------------- Formik ---------------------- */
    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: '',
            ward: '',
            birthDate: '',
            gender: '',

            // 1. Bo‘lim sharoiti
            bolimSharoitRate: 0,
            bolimSharoitIzoh: '',

            // 2. Tibbiyot xodimlari munosabati
            shifokorMunosabatRate: 0,
            hamshiraMunosabatRate: 0,
            sanitarMunosabatRate: 0,
            tibbiyotXodimlariIzoh: '',

            // 3. Sizni davolagan shifokor
            davolaganShifokorFIO: '',
            shifokorMuomalaRate: 0,
            shifokorMuomalaIzoh: '',

            // 4–9 bo‘limlar
            davolashSifatiRate: 0,
            davolashSifatiIzoh: '',
            hamshiraXizmatiRate: 0,
            hamshiraXizmatiIzoh: '',
            sanitariyaHolatiRate: 0,
            sanitariyaHolatiIzoh: '',
            ovqatlanishSifatiRate: 0,
            ovqatlanishSifatiIzoh: '',
            laboratoriyaXizmatiRate: 0,
            laboratoriyaXizmatiIzoh: '',
            diagnostikaSifatiRate: 0,
            diagnostikaSifatiIzoh: '',

            // 10–12 ochiq javoblar
            umumiyQoniqishIzoh: '',
            takliflar: '',
            umumiyFikr: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await ApiResult.postSorovnoma(values);
                alert(
                    language === 'ru'
                        ? 'Опрос отправлен ✅'
                        : language === 'en'
                        ? 'Survey submitted ✅'
                        : 'So‘rovnoma yuborildi ✅'
                );
                resetForm();
            } catch (e) {
                alert(
                    language === 'ru'
                        ? 'Опрос не отправлен ❌'
                        : language === 'en'
                        ? 'Survey not sent ❌'
                        : 'So‘rovnoma yuborilmadi ❌'
                );
                console.error(e);
            }
        },
        // enableReinitialize: true, // kerak bo'lmasa yoq
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header / Title */}
            <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur bg-white/70 dark:bg-slate-900/70">
                <div
                    className={
                        containerCls +
                        ' py-3 flex items-center justify-between gap-3'
                    }
                >
                    <div className="text-sm sm:text-base">
                        <h1 className="font-bold text-[#2464AE]">
                            {t.siteTitle}
                        </h1>
                        <p className="hidden sm:block text-slate-600 dark:text-slate-300">
                            {t.siteSub}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main form */}
            <main className={containerCls + ' py-6 sm:py-10'}>
                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-6 sm:space-y-8"
                    noValidate
                >
                    {/* Kirish banner */}
                    <Card
                        title={t.bannerTitle}
                        subtitle={t.bannerSub}
                        titleId="bannerTitle"
                    >
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {t.bannerNote}
                        </p>
                    </Card>

                    {/* Shaxsiy ma'lumotlar */}
                    <Card title={t.formTitle} titleId="personalInfo">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                                >
                                    {t.fullName}{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    className={inputCls}
                                    autoComplete="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                />
                                <InputError formik={formik} name="fullName" />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                                >
                                    {t.phone}{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    inputMode="tel"
                                    placeholder={t.phonePH}
                                    pattern="^\+998[0-9]{9}$"
                                    className={inputCls}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                <InputError formik={formik} name="phone" />
                            </div>

                            <div>
                                <label
                                    htmlFor="ward"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                                >
                                    {t.ward}{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="ward"
                                    type="text"
                                    name="ward"
                                    className={inputCls}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ward}
                                />
                                <InputError formik={formik} name="ward" />
                            </div>

                            <div>
                                <label
                                    htmlFor="birthDate"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                                >
                                    {t.birthDate}
                                </label>
                                <input
                                    id="birthDate"
                                    type="date"
                                    name="birthDate"
                                    className={inputCls}
                                    onChange={formik.handleChange}
                                    value={formik.values.birthDate}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                                >
                                    {t.gender}
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className={inputCls}
                                    onChange={formik.handleChange}
                                    value={formik.values.gender}
                                >
                                    <option value="">{t.choose}</option>
                                    <option value="male">{t.male}</option>
                                    <option value="female">{t.female}</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Savollar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title={t.s1} titleId="s1Title">
                            <StarRating
                                name="bolimSharoitRate"
                                value={formik.values.bolimSharoitRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s1Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="bolimSharoitIzoh"
                                className="sr-only"
                            >
                                {t.s1}
                            </label>
                            <textarea
                                id="bolimSharoitIzoh"
                                name="bolimSharoitIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.bolimSharoitIzoh}
                            />
                        </Card>

                        <Card title={t.s2} titleId="s2Title">
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                {t.s2_doctor}
                            </p>
                            <StarRating
                                name="shifokorMunosabatRate"
                                value={formik.values.shifokorMunosabatRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s2Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                {t.s2_nurse}
                            </p>
                            <StarRating
                                name="hamshiraMunosabatRate"
                                value={formik.values.hamshiraMunosabatRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s2Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                {t.s2_sanitary}
                            </p>
                            <StarRating
                                name="sanitarMunosabatRate"
                                value={formik.values.sanitarMunosabatRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s2Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="tibbiyotXodimlariIzoh"
                                className="sr-only"
                            >
                                {t.s2}
                            </label>
                            <textarea
                                id="tibbiyotXodimlariIzoh"
                                name="tibbiyotXodimlariIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.tibbiyotXodimlariIzoh}
                            />
                        </Card>

                        <Card title={t.s3} titleId="s3Title">
                            <label
                                htmlFor="davolaganShifokorFIO"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                            >
                                {t.fio} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="davolaganShifokorFIO"
                                type="text"
                                name="davolaganShifokorFIO"
                                className={inputCls}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.davolaganShifokorFIO}
                            />
                            <InputError
                                formik={formik}
                                name="davolaganShifokorFIO"
                            />

                            <h3
                                id="s3Politeness"
                                className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                {t.s3_politeness}
                            </h3>
                            <StarRating
                                name="shifokorMuomalaRate"
                                value={formik.values.shifokorMuomalaRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s3Politeness"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="shifokorMuomalaIzoh"
                                className="sr-only"
                            >
                                {t.s3_politeness}
                            </label>
                            <textarea
                                id="shifokorMuomalaIzoh"
                                name="shifokorMuomalaIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.shifokorMuomalaIzoh}
                            />
                        </Card>

                        <Card title={t.s4} titleId="s4Title">
                            <StarRating
                                name="davolashSifatiRate"
                                value={formik.values.davolashSifatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s4Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="davolashSifatiIzoh"
                                className="sr-only"
                            >
                                {t.s4}
                            </label>
                            <textarea
                                id="davolashSifatiIzoh"
                                name="davolashSifatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.davolashSifatiIzoh}
                            />
                        </Card>

                        <Card title={t.s5} titleId="s5Title">
                            <StarRating
                                name="hamshiraXizmatiRate"
                                value={formik.values.hamshiraXizmatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s5Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="hamshiraXizmatiIzoh"
                                className="sr-only"
                            >
                                {t.s5}
                            </label>
                            <textarea
                                id="hamshiraXizmatiIzoh"
                                name="hamshiraXizmatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.hamshiraXizmatiIzoh}
                            />
                        </Card>

                        <Card title={t.s6} titleId="s6Title">
                            <StarRating
                                name="sanitariyaHolatiRate"
                                value={formik.values.sanitariyaHolatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s6Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="sanitariyaHolatiIzoh"
                                className="sr-only"
                            >
                                {t.s6}
                            </label>
                            <textarea
                                id="sanitariyaHolatiIzoh"
                                name="sanitariyaHolatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.sanitariyaHolatiIzoh}
                            />
                        </Card>

                        <Card title={t.s7} titleId="s7Title">
                            <StarRating
                                name="ovqatlanishSifatiRate"
                                value={formik.values.ovqatlanishSifatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s7Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="ovqatlanishSifatiIzoh"
                                className="sr-only"
                            >
                                {t.s7}
                            </label>
                            <textarea
                                id="ovqatlanishSifatiIzoh"
                                name="ovqatlanishSifatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.ovqatlanishSifatiIzoh}
                            />
                        </Card>

                        <Card title={t.s8} titleId="s8Title">
                            <StarRating
                                name="laboratoriyaXizmatiRate"
                                value={formik.values.laboratoriyaXizmatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s8Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="laboratoriyaXizmatiIzoh"
                                className="sr-only"
                            >
                                {t.s8}
                            </label>
                            <textarea
                                id="laboratoriyaXizmatiIzoh"
                                name="laboratoriyaXizmatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.laboratoriyaXizmatiIzoh}
                            />
                        </Card>

                        <Card title={t.s9} titleId="s9Title">
                            <StarRating
                                name="diagnostikaSifatiRate"
                                value={formik.values.diagnostikaSifatiRate}
                                setFieldValue={formik.setFieldValue}
                                ariaLabel={t.starAria}
                                ariaLabelledBy="s9Title"
                                unitText={t.starUnit}
                                valueText={t.valueOutOf}
                            />
                            <label
                                htmlFor="diagnostikaSifatiIzoh"
                                className="sr-only"
                            >
                                {t.s9}
                            </label>
                            <textarea
                                id="diagnostikaSifatiIzoh"
                                name="diagnostikaSifatiIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls + ' mt-3'}
                                rows={2}
                                onChange={formik.handleChange}
                                value={formik.values.diagnostikaSifatiIzoh}
                            />
                        </Card>

                        <Card title={t.s10} titleId="s10Title">
                            <label
                                htmlFor="umumiyQoniqishIzoh"
                                className="sr-only"
                            >
                                {t.s10}
                            </label>
                            <textarea
                                id="umumiyQoniqishIzoh"
                                name="umumiyQoniqishIzoh"
                                placeholder={t.reasonPH}
                                className={areaCls}
                                rows={3}
                                onChange={formik.handleChange}
                                value={formik.values.umumiyQoniqishIzoh}
                            />
                        </Card>

                        <Card title={t.s11} titleId="s11Title">
                            <label htmlFor="takliflar" className="sr-only">
                                {t.s11}
                            </label>
                            <textarea
                                id="takliflar"
                                name="takliflar"
                                placeholder={t.offerPH}
                                className={areaCls}
                                rows={3}
                                onChange={formik.handleChange}
                                value={formik.values.takliflar}
                            />
                        </Card>

                        <Card title={t.s12} titleId="s12Title">
                            <label htmlFor="umumiyFikr" className="sr-only">
                                {t.s12}
                            </label>
                            <textarea
                                id="umumiyFikr"
                                name="umumiyFikr"
                                placeholder={t.thoughtPH}
                                className={areaCls}
                                rows={3}
                                onChange={formik.handleChange}
                                value={formik.values.umumiyFikr}
                            />
                        </Card>
                    </div>

                    {/* Submit bar */}
                    <div className="sticky bottom-3 z-10">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 shadow-lg">
                            <button
                                type="submit"
                                className="w-full rounded-lg px-6 py-3 font-semibold text-white shadow hover:opacity-95 active:opacity-90"
                                style={{ backgroundColor: brand }}
                            >
                                {t.submit}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
