import languageJSON from '@/language';
import { Languages } from '@/context/LanguageContext';

const TextTranslate = ({ data, fallback }) => {
    const { language } = Languages();
    if (!data || data.length !== 2) return fallback || '⚠️ Notranslate';

    const [section, key] = data;
    const res = languageJSON?.[language]?.[section]?.[key];

    return res ?? fallback ?? '❌ Missing';
};

export default TextTranslate;
