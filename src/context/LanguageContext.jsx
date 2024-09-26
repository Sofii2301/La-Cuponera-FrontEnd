import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('es'); 

    const switchLanguage = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
