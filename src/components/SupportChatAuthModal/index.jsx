// src/components/SupportChatAuthModal.jsx
import React, { useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Languages } from '@/context/LanguageContext';

const I18N = {
    uz: {
        title: 'Kirish',
        lead: 'Chatni boshlash uchun formani to‘ldiring.',
        cancel: 'Bekor qilish',
        starting: 'Boshlanmoqda…',
        start: 'Boshlash',
        labels: {
            fio: 'F.I.O',
            age: 'Yosh',
            gender: 'Jins',
            genderChoose: 'Jinsni tanlang',
            male: 'Erkak',
            female: 'Ayol',
            phone: 'Telefon',
        },
        errors: {
            fioReq: 'Majburiy',
            fioMin: 'Kamida 3 harf',
            ageMin: '0 dan katta bo‘lsin',
            ageMax: '120 dan kichik bo‘lsin',
            ageReq: 'Majburiy',
            genderReq: 'Majburiy',
            genderOne: 'Faqat male/female',
            phoneReq: 'Majburiy',
        },
        aria: {
            close: 'Bekor qilish',
        },
    },
    ru: {
        title: 'Вход',
        lead: 'Чтобы начать чат, заполните форму.',
        cancel: 'Отмена',
        starting: 'Запуск…',
        start: 'Начать',
        labels: {
            fio: 'Ф.И.О',
            age: 'Возраст',
            gender: 'Пол',
            genderChoose: 'Выберите пол',
            male: 'Мужчина',
            female: 'Женщина',
            phone: 'Телефон',
        },
        errors: {
            fioReq: 'Обязательно',
            fioMin: 'Минимум 3 символа',
            ageMin: 'Больше чем 0',
            ageMax: 'Меньше 120',
            ageReq: 'Обязательно',
            genderReq: 'Обязательно',
            genderOne: 'Только male/female',
            phoneReq: 'Обязательно',
        },
        aria: {
            close: 'Отмена',
        },
    },
    en: {
        title: 'Sign in',
        lead: 'Fill the form to start the chat.',
        cancel: 'Cancel',
        starting: 'Starting…',
        start: 'Start',
        labels: {
            fio: 'Full name',
            age: 'Age',
            gender: 'Gender',
            genderChoose: 'Select gender',
            male: 'Male',
            female: 'Female',
            phone: 'Phone',
        },
        errors: {
            fioReq: 'Required',
            fioMin: 'At least 3 characters',
            ageMin: 'Must be greater than 0',
            ageMax: 'Must be less than 120',
            ageReq: 'Required',
            genderReq: 'Required',
            genderOne: 'Only male/female',
            phoneReq: 'Required',
        },
        aria: {
            close: 'Cancel',
        },
    },
};

export default function SupportChatAuthModal({ open, onClose, onSubmit }) {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const t = I18N[language] ?? I18N.uz;

    // Yup sxema — i18n xabarlar bilan
    const schema = useMemo(
        () =>
            Yup.object({
                full_name: Yup.string()
                    .trim()
                    .min(3, t.errors.fioMin)
                    .required(t.errors.fioReq),
                age: Yup.number()
                    .transform((v, o) => (o === '' ? undefined : v))
                    .min(0, t.errors.ageMin)
                    .max(120, t.errors.ageMax)
                    .nullable()
                    .required(t.errors.ageReq),
                gender: Yup.string()
                    .oneOf(['male', 'female'], t.errors.genderOne)
                    .required(t.errors.genderReq),
                phone: Yup.string().trim().required(t.errors.phoneReq),
            }),
        [t]
    );

    const formik = useFormik({
        initialValues: { full_name: '', age: '', gender: 'male', phone: '' },
        validationSchema: schema,
        onSubmit: async (values, helpers) => {
            helpers.setStatus(null);
            try {
                await onSubmit?.(values); // parent -> start()
            } catch (err) {
                console.log(err);
            } finally {
                helpers.setSubmitting(false);
                localStorage.setItem('user_full_name', values.full_name);
                localStorage.setItem('user_phone', values.phone);
                localStorage.setItem('user_gender', values.gender);
                if (
                    values.age !== '' &&
                    values.age !== null &&
                    values.age !== undefined
                ) {
                    localStorage.setItem('user_age', values.age);
                }
            }
        },
        enableReinitialize: true, // til o‘zgarganda xabarlar yangilansin
    });

    // Modal yopilganda reset
    useEffect(() => {
        if (!open) formik.resetForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    if (!open) return null;

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
    } = formik;

    const inputClass =
        'rounded-xl border px-3 py-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 w-full';
    const errorClass = 'text-xs text-red-600 mt-1';

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-700/60 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60 dark:border-slate-700/60">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                        {t.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="cursor-pointer p-2 rounded-xl hover:bg-red-100 dark:hover:bg-slate-800 transition"
                        aria-label={t.aria.close}
                        type="button"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                <div className="sm:pb-5 p-5 pb-10">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {t.lead}
                    </p>

                    {status && (
                        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Chap ustun: F.I.O va Yosh */}
                        <div className="flex flex-col gap-3">
                            {/* F.I.O */}
                            <div>
                                <input
                                    name="full_name"
                                    placeholder={t.labels.fio}
                                    className={inputClass}
                                    value={values.full_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {touched.full_name && errors.full_name && (
                                    <div className={errorClass}>
                                        {errors.full_name}
                                    </div>
                                )}
                            </div>

                            {/* Yosh */}
                            <div>
                                <input
                                    type="number"
                                    name="age"
                                    min="0"
                                    placeholder={t.labels.age}
                                    className={inputClass}
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.age && errors.age && (
                                    <div className={errorClass}>
                                        {errors.age}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* O‘ng ustun: Jins va Telefon */}
                        <div className="flex flex-col gap-3">
                            {/* Jins */}
                            <div>
                                <select
                                    name="gender"
                                    className={inputClass}
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">
                                        {t.labels.genderChoose}
                                    </option>
                                    <option value="male">
                                        {t.labels.male}
                                    </option>
                                    <option value="female">
                                        {t.labels.female}
                                    </option>
                                </select>
                                {touched.gender && errors.gender && (
                                    <div className={errorClass}>
                                        {errors.gender}
                                    </div>
                                )}
                            </div>

                            {/* Telefon */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder={t.labels.phone}
                                    className={inputClass}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {touched.phone && errors.phone && (
                                    <div className={errorClass}>
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tugmalar */}
                        <div className="md:col-span-2 flex items-center justify-end gap-2 mt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-95 transition"
                            >
                                {t.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer px-4 py-2 rounded-xl font-semibold bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition disabled:opacity-60"
                            >
                                {isSubmitting ? t.starting : t.start}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
