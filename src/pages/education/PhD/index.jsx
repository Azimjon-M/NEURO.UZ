// src/pages/education/EduPhD.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiDownload } from 'react-icons/fi';
import ApiResult from '@/services/scienceEducation'; // API chaqirig'iga TEGMADIM
import { Languages } from '@/context/LanguageContext';

/* ================= I18N (UI matnlari) ================= */
const UI_T = {
    uz: {
        openFile: 'Faylni ochish',
        openAttachment: 'Ilovani ochish',
        empty: "Ma'lumot yuklanmadi",
        fallbackTitle: 'Tayanch doktorantura',
        fallbackDesc:
            'Tayanch doktorantura bo‘limida qabul shartlari, ilmiy rahbarlar, o‘quv rejalari va tegishli hujjatlar bilan tanishing.',
    },
    ru: {
        openFile: 'Открыть файл',
        openAttachment: 'Открыть вложение',
        empty: 'Данные не загружены',
        fallbackTitle: 'Целевая докторантура (PhD)',
        fallbackDesc:
            'Ознакомьтесь с условиями приёма, научными руководителями, учебными планами и соответствующими документами.',
    },
    en: {
        openFile: 'Open file',
        openAttachment: 'Open attachment',
        empty: 'No data loaded',
        fallbackTitle: 'PhD (Doctoral Studies)',
        fallbackDesc:
            'Learn about admission requirements, supervisors, curricula, and related documents for the PhD program.',
    },
};

// "un" kelganda "en"ga normallashtiramiz
const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());

// "uz"/"ru"/"en" dan biri bo'lmasa, UI_T.uz ga fallback
const getT = (lang) => UI_T[lang] ?? UI_T.uz;

/** Matndan tildagi markerlarni olib tashlash:
 *  - "[RU] ...."  -> "...."
 *  - "EN: ...."   -> "...."
 *  - "UZ - ...."  -> "...."
 */
const stripLangTag = (val) => {
    if (typeof val !== 'string') return '';
    let s = val.trim();

    // Boshida kvadrat qavs bilan keladigan qismlar: [UZ] / [RU] / [EN]
    s = s.replace(/^\s*\[(?:uz|ru|en)\]\s*/i, '');

    // Boshida UZ/RU/EN va keyin : yoki - yoki – belgisi bilan kelgan qismlar
    s = s.replace(/^\s*(?:UZ|RU|EN)\s*[:\-–]\s*/i, '');

    return s;
};

/* ================= Ichki Accordion ================= */
const Accordion = ({ title, body, image, file, btnLabel }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                                <span>{btnLabel}</span>
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

const EduPhD = () => {
    // Context: Languages() dan 'uz' | 'ru' | 'un' keladi (senda shunday)
    const { language } = Languages();
    const lang = normalizeLang(language);
    const t = useMemo(() => getT(lang), [lang]);

    const [data, setData] = useState(null);

    // Lang bo‘yicha qiymat tanlash (obj || string) + markerlarni tozalash
    const pick = useCallback(
        (val) => {
            if (!val) return '';
            if (typeof val === 'string') return stripLangTag(val);
            const chosen = val?.[lang] || val?.uz || val?.en || val?.ru || '';
            return stripLangTag(chosen);
        },
        [lang]
    );

    // API — aynan shu holatda qoldirildi; endpoint nomi o‘zgarmagan
    const getData = useCallback(async () => {
        try {
            const response = await ApiResult.getTayanchDoktorantura();
            setData(response || null);
        } catch (e) {
            console.error(e);
            setData(null);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    // Title/Desc — backend bo'sh bo'lsa, UI fallback ishlaydi
    const sectionName = useMemo(() => {
        return (
            pick(data?.section?.name) || pick(data?.title) || t.fallbackTitle
        );
    }, [data, pick, t]);

    const sectionDesc = useMemo(() => {
        return pick(data?.description) || t.fallbackDesc;
    }, [data, pick, t]);

    // Accordions — tartib + tilga mos map
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

    const emptyText = t.empty;

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-4">
                {/* Title & Description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                        {sectionName}
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {sectionDesc}
                    </p>
                </div>

                {/* Hero image + attachment */}
                {(data?.hero_image || data?.attachment) && (
                    <div className="mb-8">
                        {data?.hero_image ? (
                            <div className="w-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img
                                    src={data.hero_image}
                                    alt={sectionName}
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
                                btnLabel={t.openFile}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-slate-500 dark:text-slate-400">
                        {emptyText}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EduPhD;
