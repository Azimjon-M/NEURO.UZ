// src/pages/education/EduEvents.jsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FiChevronDown, FiDownload } from 'react-icons/fi';
import ApiResult from '@/services/scienceEducation';
import { Languages } from '@/context/LanguageContext';

/* -------- I18N (UI matnlari) -------- */
const UI_T = {
    uz: {
        openFile: 'Faylni ochish',
        openAttachment: 'Ilovani ochish',
        empty: "Ma'lumot yuklanmadi",
        fallbackTitle: 'Kelgusi tadbirlar jadvali',
        fallbackDesc:
            'Ushbu bo‘limda yaqin kunlarda o‘tkazilishi rejalashtirilgan ilmiy, o‘quv va amaliy tadbirlar haqida ma’lumot olishingiz mumkin.',
    },
    ru: {
        openFile: 'Открыть файл',
        openAttachment: 'Открыть вложение',
        empty: 'Данные не загружены',
        fallbackTitle: 'График предстоящих мероприятий',
        fallbackDesc:
            'В этом разделе вы найдете информацию о ближайших научных, учебных и практических мероприятиях.',
    },
    en: {
        openFile: 'Open file',
        openAttachment: 'Open attachment',
        empty: 'No data loaded',
        fallbackTitle: 'Upcoming Events Schedule',
        fallbackDesc:
            'Here you can find information about upcoming scientific, educational and practical events.',
    },
};

/* Yengil Accordion: title/body string bo‘lib keladi */
const Accordion = ({ title, body, image, file, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    // \n -> <br/> (body allaqachon tozalangan bo‘ladi)
    const contentHtml = useMemo(
        () => (body || '').replace(/\n/g, '<br/>'),
        [body]
    );

    return (
        <div className="w-full m-0">
            <button
                onClick={() => setIsOpen((v) => !v)}
                className="w-full flex justify-between items-center py-3 px-4 
                    text-left bg-slate-100 dark:bg-slate-700 
                    hover:bg-slate-200 dark:hover:bg-slate-600 
                    rounded-md transition-colors"
            >
                <span className="font-medium text-slate-800 dark:text-slate-100">
                    {title || '—'}
                </span>
                <FiChevronDown
                    className={`transform transition-transform duration-500 
                        text-slate-500 dark:text-slate-300
                        ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    size={20}
                />
            </button>

            <div
                className={`transition-all duration-500 overflow-hidden mb-3 ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="rounded-md bg-white dark:bg-slate-800 px-3 py-3 text-slate-700 dark:text-slate-300 shadow-sm space-y-3">
                    {/* Body */}
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

                    {/* Optional image */}
                    {image ? (
                        <div className="pt-1">
                            <img
                                src={image}
                                alt={title || 'accordion image'}
                                className="w-full max-h-[420px] object-contain rounded-md ring-1 ring-slate-200 dark:ring-slate-700"
                                loading="lazy"
                            />
                        </div>
                    ) : null}

                    {/* Optional file link */}
                    {file ? (
                        <div className="pt-1">
                            <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-md
                           bg-slate-900 text-white hover:opacity-95 active:opacity-90
                           dark:bg-slate-100 dark:text-slate-900"
                            >
                                <FiDownload className="w-4 h-4" />
                                <span>{t.openFile}</span>
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default function EduEvents() {
    const { language } = Languages(); // 'uz' | 'ru' | 'en'
    const lang = (language || 'uz').toLowerCase();
    const t = UI_T[lang] || UI_T.uz;

    const [data, setData] = useState(null);

    /* --- "[uz]/[ru]/[en]" prefiksini string boshidan olib tashlaydigan helper --- */
    const stripLangTag = useCallback((s) => {
        if (typeof s !== 'string') return s || '';
        // boshdagi [uz]/[ru]/[en] (ixtiyoriy ":" yoki "-" va bo'shliq)
        return s.replace(/^\s*\[(?:uz|ru|en)\]\s*[:-]?\s*/i, '').trim();
    }, []);
    // Lang bo‘yicha qiymat tanlash (obj || string) + tozalash
    const pick = useCallback(
        (val) => {
            if (!val) return '';
            if (typeof val === 'string') return stripLangTag(val);
            const chosen = val?.[lang] || val?.uz || val?.en || val?.ru || '';
            return stripLangTag(chosen);
        },
        [lang, stripLangTag]
    );

    const getData = useCallback(async () => {
        try {
            const response = await ApiResult.getKelgusiTadbirlar();
            setData(response || null);
        } catch (e) {
            console.error(e);
            setData(null);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    // Accordions: sort + tilga mos map
    const accordions = useMemo(() => {
        const arr = Array.isArray(data?.accordions) ? data.accordions : [];
        const sorted = [...arr].sort((a, b) => {
            const ao = Number.isFinite(a?.order) ? a.order : 9999;
            const bo = Number.isFinite(b?.order) ? b.order : 9999;
            if (ao !== bo) return ao - bo;
            return (a?.id || 0) - (b?.id || 0);
        });
        return sorted.map((it) => ({
            id: it.id,
            title: pick(it.title),
            body: pick(it.body),
            image: it.image,
            file: it.file,
        }));
    }, [data, pick]);

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {UI_T[lang]?.fallbackTitle}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {UI_T[lang]?.fallbackDesc}
                    </p>
                </div>

                {/* Hero image + attachment */}
                {(data?.hero_image || data?.attachment) && (
                    <div className="mb-8">
                        {data?.hero_image ? (
                            <div className="w-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img
                                    src={data.hero_image}
                                    alt={UI_T[lang]?.fallbackTitle}
                                    className="w-full max-h-[520px] object-cover"
                                />
                            </div>
                        ) : null}

                        {data?.attachment ? (
                            <div className="mt-4 flex justify-end">
                                <a
                                    href={data.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                             bg-slate-900 text-white hover:opacity-95 active:opacity-90
                             dark:bg-slate-100 dark:text-slate-900"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    <span>{t.openAttachment}</span>
                                </a>
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Accordions */}
                {accordions.length ? (
                    <div className="space-y-2">
                        {accordions.map((item) => (
                            <Accordion
                                key={item.id}
                                title={item.title}
                                body={item.body}
                                image={item.image}
                                file={item.file}
                                t={t}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        {t.empty}
                    </div>
                )}
            </div>
        </section>
    );
}
