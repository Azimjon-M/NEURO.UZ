// src/pages/SurveyForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStar } from 'react-icons/fa';

// ⭐ Yulduzli baholash
const StarRating = ({ name, value, setFieldValue }) => (
    <div className="flex gap-1 mt-2">
        {[...Array(10)].map((_, i) => {
            const rating = i + 1;
            return (
                <FaStar
                    key={rating}
                    onClick={() => setFieldValue(name, rating)}
                    className={`cursor-pointer w-6 h-6 ${
                        value >= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                />
            );
        })}
    </div>
);

// 📌 Yup validatsiya (endilikda faqat required bo‘lgan qismlar)
const validationSchema = Yup.object({
    fullName: Yup.string().required('To‘liq ism majburiy'),
    phone: Yup.string()
        .matches(/^\+998[0-9]{9}$/, 'Telefon raqam noto‘g‘ri')
        .required('Telefon raqamingiz majburiy'),
    ward: Yup.string().required('Bo‘lim/palata majburiy'),
    q3DoctorName: Yup.string().required('Shifokor ismi majburiy'),
});

const SurveyForm = () => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: '',
            ward: '',
            birthDate: '',
            gender: '',
            q1Rate: 0,
            q1Comment: '',
            q2Doctor: 0,
            q2Nurse: 0,
            q2Sanitar: 0,
            q2Comment: '',
            q3DoctorName: '',
            q3Rate: 0,
            q3Comment: '',
            q4Rate: 0,
            q4Comment: '',
            q5Rate: 0,
            q5Comment: '',
            q6Rate: 0,
            q6Comment: '',
            q7Rate: 0,
            q7Comment: '',
            q8Rate: 0,
            q8Comment: '',
            q9Rate: 0,
            q9Comment: '',
            q10: '',
            q11: '',
            q12: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form yuborildi:', values);
            alert('So‘rovnoma yuborildi ✅');
        },
    });

    const InputError = ({ name }) =>
        formik.touched[name] && formik.errors[name] ? (
            <div className="text-red-500 text-sm mt-1">
                {formik.errors[name]}
            </div>
        ) : null;

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow p-8 space-y-10"
        >
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-[#2464AE]">
                    Respublika Ixtisoslashtirilgan Neyroxirurgiya Markazi
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    Hurmatli fuqaro! Sizdan tibbiy xizmat sifatini oshirish
                    maqsadida anonim so‘rovnomani to‘ldirishingizni so‘raymiz.
                </p>
            </div>

            {/* Shaxsiy ma'lumotlar */}
            <div>
                <h2 className="text-lg font-semibold text-[#2464AE] mb-4">
                    Shaxsiy ma’lumotlaringiz
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium mb-1"
                        >
                            To‘liq ism <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        <InputError name="fullName" />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-1"
                        >
                            Telefon raqam{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        <InputError name="phone" />
                    </div>
                    <div>
                        <label
                            htmlFor="ward"
                            className="block text-sm font-medium mb-1"
                        >
                            Bo‘lim/palata{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="ward"
                            type="text"
                            name="ward"
                            className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ward}
                        />
                        <InputError name="ward" />
                    </div>
                    <div>
                        <label
                            htmlFor="birthDate"
                            className="block text-sm font-medium mb-1"
                        >
                            Tug‘ilgan sana
                        </label>
                        <input
                            id="birthDate"
                            type="date"
                            name="birthDate"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.birthDate}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium mb-1"
                        >
                            Jins (ixtiyoriy)
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                        >
                            <option value="">Tanlang</option>
                            <option value="male">Erkak</option>
                            <option value="female">Ayol</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr />

            {/* Savollar grid */}
            <div className="flex gap-4">
                <div>
                    {/* Q1 */}
                    <div>
                        <h2 className="q-title">
                            1. Bo‘lim sharoitidan qoniqdingizmi?
                        </h2>
                        <StarRating
                            name="q1Rate"
                            value={formik.values.q1Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q1Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q1Comment}
                        />
                    </div>
                    {/* Q2 */}
                    <div>
                        <h2 className="q-title">
                            2. Shifokor, hamshira va sanitarlar munosabati
                        </h2>
                        <p className="mt-2 text-sm">Shifokor:</p>
                        <StarRating
                            name="q2Doctor"
                            value={formik.values.q2Doctor}
                            setFieldValue={formik.setFieldValue}
                        />
                        <p className="mt-2 text-sm">Hamshira:</p>
                        <StarRating
                            name="q2Nurse"
                            value={formik.values.q2Nurse}
                            setFieldValue={formik.setFieldValue}
                        />
                        <p className="mt-2 text-sm">Sanitar:</p>
                        <StarRating
                            name="q2Sanitar"
                            value={formik.values.q2Sanitar}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q2Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q2Comment}
                        />
                    </div>
                    {/* Q3 */}
                    <div>
                        <h2 className="q-title">
                            3. Sizni davolagan shifokor ismi-sharifi{' '}
                            <span className="text-red-500">*</span>
                        </h2>
                        <input
                            type="text"
                            name="q3DoctorName"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.q3DoctorName}
                        />
                        <InputError name="q3DoctorName" />
                        <h3 className="mt-2">Shifokorning muomalasi</h3>
                        <StarRating
                            name="q3Rate"
                            value={formik.values.q3Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q3Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q3Comment}
                        />
                    </div>
                    {/* Q4 */}
                    <div>
                        <h2 className="q-title">4. Davolash sifati</h2>
                        <StarRating
                            name="q4Rate"
                            value={formik.values.q4Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q4Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q4Comment}
                        />
                    </div>
                    {/* Q5 */}
                    <div>
                        <h2 className="q-title">5. Hamshira xizmati</h2>
                        <StarRating
                            name="q5Rate"
                            value={formik.values.q5Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q5Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q5Comment}
                        />
                    </div>
                </div>
                <div>
                    {/* Q6 */}
                    <div>
                        <h2 className="q-title">6. Sanitariya holati</h2>
                        <StarRating
                            name="q6Rate"
                            value={formik.values.q6Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q6Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q6Comment}
                        />
                    </div>
                    {/* Q7 */}
                    <div>
                        <h2 className="q-title">7. Ovqatlanish sifati</h2>
                        <StarRating
                            name="q7Rate"
                            value={formik.values.q7Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q7Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q7Comment}
                        />
                    </div>
                    {/* Q8 */}
                    <div>
                        <h2 className="q-title">8. Laboratoriya xizmati</h2>
                        <StarRating
                            name="q8Rate"
                            value={formik.values.q8Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q8Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q8Comment}
                        />
                    </div>
                    {/* Q9 */}
                    <div>
                        <h2 className="q-title">9. Diagnostika sifati</h2>
                        <StarRating
                            name="q9Rate"
                            value={formik.values.q9Rate}
                            setFieldValue={formik.setFieldValue}
                        />
                        <textarea
                            name="q9Comment"
                            placeholder="Sababi..."
                            className="input mt-2"
                            rows={2}
                            onChange={formik.handleChange}
                            value={formik.values.q9Comment}
                        />
                    </div>
                    {/* Q10 */}
                    <div>
                        <h2 className="q-title">
                            10. Siz qay darajada qoniqdingiz?
                        </h2>
                        <textarea
                            name="q10"
                            placeholder="Sababi..."
                            className="input"
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.q10}
                        />
                    </div>
                    {/* Q11 */}
                    <div>
                        <h2 className="q-title">11. Takliflaringiz</h2>
                        <textarea
                            name="q11"
                            placeholder="Sababi..."
                            className="input"
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.q11}
                        />
                    </div>
                    {/* Q12 */}
                    <div>
                        <h2 className="q-title">
                            12. Umumiy fikr-mulohazangiz
                        </h2>
                        <textarea
                            name="q12"
                            placeholder="Sababi..."
                            className="input"
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.q12}
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full px-6 py-3 bg-[#2464AE] hover:bg-[#1f59a0] text-white font-semibold rounded-lg shadow"
            >
                Yuborish
            </button>
        </form>
    );
};

export default SurveyForm;
