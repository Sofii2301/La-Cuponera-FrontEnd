import React from 'react';
import { IntlProvider } from 'react-intl';
import { useLanguage } from './LanguageContext'; 
import messagesEn from '../assets/locales/en/translation.json';
import messagesEs from '../assets/locales/es/translation.json';

const messages = {
    en: messagesEn,
    es: messagesEs,
};

const IntlProviderWrapper = ({ children }) => {
    const { locale } = useLanguage(); 

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;
