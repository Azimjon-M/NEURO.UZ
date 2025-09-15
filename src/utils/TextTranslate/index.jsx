import languageJSON from '../../language';
import { Languages } from '../../context/LanguageContext';

const TextTranslate = ({ data }) => {
    const { language } = Languages();

    if (!data || data.length !== 2) return '⚠️ Notranslate';

    const section = data[0];
    const key = data[1];

    const res = languageJSON[language]?.[section]?.[key];

    return res || '❌ Missing';
};

export default TextTranslate;
