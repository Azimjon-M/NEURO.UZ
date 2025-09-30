import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
    full_name: Yup.string().trim().min(3, 'Kamida 3 harf').required('Majburiy'),
    age: Yup.number()
        .transform((v, o) => (o === '' ? undefined : v))
        .min(0, '0 dan katta bo‘lsin')
        .max(120, '120 dan kichik bo‘lsin')
        .nullable(),
    gender: Yup.string().oneOf(['male', 'female']).required('Majburiy'),
    phone: Yup.string().trim().required('Majburiy'),
});

export default function SupportChatAuthModal({ open, onClose, onSubmit }) {
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
            }
        },
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
        'rounded-xl border px-3 py-2 bg-white dark:bg-slate-900 ' +
        'border-slate-300 dark:border-slate-700 w-full';
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
                        Kirish / Chatni boshlash
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        aria-label="Bekor qilish"
                        type="button"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                <div className="p-5">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        Chatni boshlash uchun formani to‘ldiring.
                    </p>

                    {status && (
                        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3"
                    >
                        {/* F.I.O */}
                        <div className="md:col-span-2">
                            <input
                                name="full_name"
                                placeholder="F.I.O"
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
                                placeholder="Yosh"
                                className={inputClass}
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.age && errors.age && (
                                <div className={errorClass}>{errors.age}</div>
                            )}
                        </div>

                        {/* Jins */}
                        <div>
                            <select
                                name="gender"
                                className={inputClass}
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="male">Erkak</option>
                                <option value="female">Ayol</option>
                            </select>
                            {touched.gender && errors.gender && (
                                <div className={errorClass}>
                                    {errors.gender}
                                </div>
                            )}
                        </div>

                        {/* Telefon */}
                        <div className="md:col-span-3">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Telefon"
                                className={inputClass}
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {touched.phone && errors.phone && (
                                <div className={errorClass}>{errors.phone}</div>
                            )}
                        </div>

                        {/* Tugmalar */}
                        <div className="md:col-span-4 flex items-center justify-end gap-2 mt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-95 transition"
                            >
                                Bekor qilish
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-xl font-semibold bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition disabled:opacity-60"
                            >
                                {isSubmitting ? 'Boshlanmoqda…' : 'Boshlash'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
