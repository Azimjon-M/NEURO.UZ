import React from 'react';
import LanguageProvider from './LanguageContext';

export default function Context({ children }) {
    return <LanguageProvider>{children}</LanguageProvider>;
}
