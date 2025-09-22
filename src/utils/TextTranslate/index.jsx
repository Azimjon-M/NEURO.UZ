import languageJSON from '@/language';
import { Languages } from '@/context/LanguageContext';

const DEFAULT_LANG = 'uz';

const TextTranslate = ({ id, data, fallback }) => {
    const { language } = Languages();
    const key =
        id ??
        (Array.isArray(data) && data.length > 0
            ? data[data.length - 1]
            : undefined);

    if (!key) return fallback || '⚠️ Notranslate';

    const lang = language || DEFAULT_LANG;
    const res =
        languageJSON?.[lang]?.[key] ??
        languageJSON?.[DEFAULT_LANG]?.[key] ??
        languageJSON?.en?.[key];

    return <>{res ?? fallback ?? '❌ Missing'}</>;
};

export default TextTranslate;
