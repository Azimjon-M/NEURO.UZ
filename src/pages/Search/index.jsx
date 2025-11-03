// src/pages/Search.jsx
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import ApiResult from '@/services/search.js';
import { Languages } from '@/context/LanguageContext';

/* ================= I18N (UI matnlari) ================= */
const UI_T = {
    uz: {
        // header
        pageTitle: 'Qidiruv natijalari',
        searchedFor: 'So‘rov',
        forQuery: 'bo‘yicha natijalar',
        // ui
        placeholder: 'Qidirish...',
        searchBtn: 'Qidirish',
        loading: 'Yuklanmoqda…',
        errorPrefix: 'Xatolik:',
        noResults: 'Natija topilmadi.',
        tip: 'Qidiruv so‘rovini kiriting va “Qidirish” tugmasini bosing.',
        badgeSpecialist: 'Mutaxassis',
        badgeNews: 'Yangilik',
        badgeGallery: 'Galereya',
        countPrefix: 'Topildi:',
        countSep: ' • ',
        countSpec: 'mutaxassis',
        countNews: 'yangilik',
        countGal: 'galereya',
        fallbackSpecTitle: 'Mutaxassis',
        fallbackNewsTitle: 'Yangilik',
        fallbackGalleryTitle: 'Galereya',
    },
    ru: {
        pageTitle: 'Результаты поиска',
        searchedFor: 'Запрос',
        forQuery: '— найдено по запросу',
        placeholder: 'Поиск...',
        searchBtn: 'Искать',
        loading: 'Загрузка…',
        errorPrefix: 'Ошибка:',
        noResults: 'Ничего не найдено.',
        tip: 'Введите запрос и нажмите «Искать».',
        badgeSpecialist: 'Специалист',
        badgeNews: 'Новость',
        badgeGallery: 'Галерея',
        countPrefix: 'Найдено:',
        countSep: ' • ',
        countSpec: 'специалистов',
        countNews: 'новостей',
        countGal: 'галерей',
        fallbackSpecTitle: 'Специалист',
        fallbackNewsTitle: 'Новость',
        fallbackGalleryTitle: 'Галерея',
    },
    en: {
        pageTitle: 'Search Results',
        searchedFor: 'Query',
        forQuery: 'results for',
        placeholder: 'Search...',
        searchBtn: 'Search',
        loading: 'Loading…',
        errorPrefix: 'Error:',
        noResults: 'No results found.',
        tip: 'Type a query and press “Search”.',
        badgeSpecialist: 'Specialist',
        badgeNews: 'News',
        badgeGallery: 'Gallery',
        countPrefix: 'Found:',
        countSep: ' • ',
        countSpec: 'specialists',
        countNews: 'news',
        countGal: 'gallery',
        fallbackSpecTitle: 'Specialist',
        fallbackNewsTitle: 'News',
        fallbackGalleryTitle: 'Gallery',
    },
};

// "un" → "en"
const normalizeLang = (l) => (l === 'un' ? 'en' : (l || 'uz').toLowerCase());

export default function Search() {
    const { language } = Languages();
    const [params, setParams] = useSearchParams();
    const qFromURL = (params.get('q') || '').trim();

    const lang = normalizeLang(language);
    const t = useMemo(() => UI_T[lang] ?? UI_T.uz, [lang]);

    const [q, setQ] = useState(qFromURL);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const [dataSpecialists, setDataSpecialists] = useState([]);
    const [dataNews, setDataNews] = useState([]);
    const [dataGallery, setDataGallery] = useState([]);

    const abortRef = useRef(null);

    // 🧠 Title ni yangilash
    useEffect(() => {
        document.title = qFromURL
            ? `${t.pageTitle} — "${qFromURL}"`
            : t.pageTitle;
    }, [t.pageTitle, qFromURL]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = q.trim();
        setParams((prev) => {
            const next = new URLSearchParams(prev);
            if (query) next.set('q', query);
            else next.delete('q');
            // ❌ URLga lang yozmaymiz
            return next;
        });
    };
    // lang-ga mos qiymat o‘quvchi
    const pickLang = useCallback(
        (obj, key, fallbackKeys = []) => {
            try {
                if (!obj) return '';
                if (obj[lang] && obj[lang][key] != null)
                    return String(obj[lang][key]).trim();
                if (obj[key] && obj[key][lang] != null)
                    return String(obj[key][lang]).trim();
                if (obj[key] != null && typeof obj[key] !== 'object')
                    return String(obj[key]).trim();
                for (const k of fallbackKeys) {
                    if (obj[k] && obj[k][lang] != null)
                        return String(obj[k][lang]).trim();
                }
            } catch (err) {
                console.log(err);
            }
            return '';
        },
        [lang]
    );

    const mapSpecialist = useCallback(
        (item) => {
            const fullName =
                pickLang(item, 'full_name') ||
                item?.[lang]?.full_name ||
                item?.uz?.full_name ||
                item?.ru?.full_name ||
                item?.en?.full_name ||
                '';

            const position =
                pickLang(item, 'position') ||
                item?.[lang]?.position ||
                item?.uz?.position ||
                item?.ru?.position ||
                item?.en?.position ||
                '';

            const depName =
                pickLang(item?.department, 'name') ||
                item?.department?.[lang]?.name ||
                item?.department?.uz?.name ||
                item?.department?.ru?.name ||
                item?.department?.en?.name ||
                '';

            const title = fullName || t.fallbackSpecTitle;
            const desc = [position, depName].filter(Boolean).join(' • ');
            const url = `/departments/${item.id}/`;

            return {
                id: `dep-${item.id}`,
                type: 'departments',
                title,
                desc,
                url,
                thumb: item.photo_url || null,
            };
        },
        [lang, t.fallbackSpecTitle, pickLang]
    );

    const mapNews = useCallback(
        (item) => {
            const title =
                pickLang(item, 'title', ['titles']) ||
                item?.titles?.[lang] ||
                item?.title ||
                t.fallbackNewsTitle;

            const description =
                pickLang(item, 'description', ['descriptions']) ||
                item?.descriptions?.[lang] ||
                item?.description ||
                '';

            const url = `/news/${item.id}/`;
            return {
                id: `news-${item.id}`,
                type: 'news',
                title,
                desc: description,
                url,
                thumb: null,
            };
        },
        [lang, t.fallbackNewsTitle, pickLang]
    );
    const mapGallery = useCallback(
        (item) => {
            const title =
                pickLang(item, 'title') ||
                item?.[lang]?.title ||
                item?.uz?.title ||
                item?.ru?.title ||
                item?.en?.title ||
                t.fallbackGalleryTitle;

            const description =
                pickLang(item, 'description') ||
                item?.[lang]?.description ||
                item?.uz?.description ||
                item?.ru?.description ||
                item?.en?.description ||
                '';

            const url = `/gallery/${item.id}/`;
            const thumb =
                Array.isArray(item.media) && item.media[0]?.url
                    ? item.media[0].url
                    : null;

            return {
                id: `gal-${item.id}`,
                type: 'gallery',
                title,
                desc: description,
                url,
                thumb,
            };
        },
        [lang, t.fallbackGalleryTitle, pickLang]
    );

    // Fetch
    // ⬇️ FETCH useEffect — faqat params o'zgarsa ishlaydi
    useEffect(() => {
        const query = (params.get('q') || '').trim();
        if (!query) {
            setDataSpecialists([]);
            setDataNews([]);
            setDataGallery([]);
            setErr('');
            setLoading(false);
            return;
        }

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setErr('');

        Promise.all([
            ApiResult.getSpecioalSearch(query, { signal: controller.signal }),
            ApiResult.getNewsSearch(query, { signal: controller.signal }),
            ApiResult.getGallerySearch(query, { signal: controller.signal }),
        ])
            .then(([specRes, newsRes, galRes]) => {
                const specList = Array.isArray(specRes?.results)
                    ? specRes.results
                    : Array.isArray(specRes)
                    ? specRes
                    : [];
                const newsList = Array.isArray(newsRes?.results)
                    ? newsRes.results
                    : Array.isArray(newsRes)
                    ? newsRes
                    : [];
                const galList = Array.isArray(galRes?.results)
                    ? galRes.results
                    : Array.isArray(galRes)
                    ? galRes
                    : [];

                setDataSpecialists(specList);
                setDataNews(newsList);
                setDataGallery(galList);
            })
            .catch((e) => {
                if (e?.name !== 'AbortError') setErr(e?.message || 'Xatolik');
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [params]); // ✅ faqat params

    const normalized = useMemo(() => {
        const a = dataSpecialists.map(mapSpecialist);
        const b = dataNews.map(mapNews);
        const c = dataGallery.map(mapGallery);
        return [...a, ...b, ...c];
    }, [
        dataSpecialists,
        dataNews,
        dataGallery,
        mapSpecialist,
        mapNews,
        mapGallery,
    ]);

    return (
        <div className="w-full mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px] px-4 py-10">
            {/* Header: Title + searched query */}
            <header className="mb-4 flex justify-center flex-col items-center text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                    {t.pageTitle}
                </h1>
                {qFromURL ? (
                    <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                        {t.searchedFor}:{' '}
                        <span className="font-semibold">“{qFromURL}”</span>{' '}
                        <span className="opacity-70">— {t.forQuery}</span>
                    </p>
                ) : null}
            </header>

            {/* Mobil qidiruv */}
            <form
                onSubmit={handleSubmit}
                className="lg:hidden mx-auto max-w-xl rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl p-3"
            >
                <div className="flex w-full">
                    <div className="flex items-center gap-2 flex-1 pl-3 pr-2 rounded-l-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <AiOutlineSearch className="shrink-0 text-slate-500 dark:text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') setQ('');
                            }}
                            type="text"
                            placeholder={t.placeholder}
                            className="w-full bg-transparent outline-none py-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-r-xl font-semibold bg-[#2464AE] hover:bg-[#1f59a0] text-white border border-l-0 border-slate-200 dark:border-slate-700 transition-colors"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {t.searchBtn}
                    </button>
                </div>
            </form>

            {/* Natijalar */}
            <div className="max-w-3xl mx-auto mt-6">
                {loading && (
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <span className="inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                        <span>{t.loading}</span>
                    </div>
                )}

                {!loading && err && (
                    <div className="text-red-600 dark:text-red-400">
                        {t.errorPrefix} {err}
                    </div>
                )}

                {!loading && !err && qFromURL && normalized.length === 0 && (
                    <div className="text-slate-600 dark:text-slate-300">
                        {t.noResults}
                    </div>
                )}

                {!loading && !err && !qFromURL && (
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                        {t.tip}
                    </div>
                )}

                <ul className="mt-4 space-y-3">
                    {normalized.map((item) => {
                        const Badge = (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-[#2464AE]/20 text-[#2464AE]">
                                {item.type === 'specialist'
                                    ? t.badgeSpecialist
                                    : item.type === 'news'
                                    ? t.badgeNews
                                    : item.type === 'gallery'
                                    ? t.badgeGallery
                                    : item.type}
                            </span>
                        );

                        const Inner = (
                            <div className="flex items-start gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {Badge}
                                    </div>

                                    <div className="font-semibold text-[#2464AE] dark:text-blue-300 group-hover:underline underline-offset-2 break-words">
                                        {item.title}
                                    </div>

                                    {item.desc && (
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 group-hover:underline underline-offset-2 break-words">
                                            {item.desc}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );

                        if (item.url) {
                            return (
                                <Link
                                    key={item.id}
                                    to={item.url}
                                    className="group block p-4 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm active:scale-[0.99] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2464AE] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                                >
                                    {Inner}
                                </Link>
                            );
                        }

                        return (
                            <li key={item.id}>
                                <div className="group p-4 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm active:scale-[0.99] cursor-default">
                                    {Inner}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {(dataSpecialists.length > 0 ||
                    dataNews.length > 0 ||
                    dataGallery.length > 0) && (
                    <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
                        {t.countPrefix}{' '}
                        {`${t.countSpec} ${dataSpecialists.length}${t.countSep}${t.countNews} ${dataNews.length}${t.countSep}${t.countGal} ${dataGallery.length}`}
                    </div>
                )}
            </div>
        </div>
    );
}
