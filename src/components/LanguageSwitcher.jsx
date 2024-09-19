import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext'; 
import es from '../assets/flags/es.jpg';
import en from '../assets/flags/en.jpg';

const LanguageSwitcher = () => {
    const { locale, switchLanguage } = useLanguage(); 
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: en },
        { code: 'es', name: 'Español', flag: es },
    ];

    const currentLanguage = languages.find(lang => lang.code === locale);

    const changeLanguage = (code) => {
        switchLanguage(code); 
        setIsOpen(false); 
    };

    return (
        <div className="language-switcher">
            <button 
                className="current-language" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={currentLanguage.flag} alt={currentLanguage.name} className="flag-icon" />
            </button>
            {isOpen && (
                <div className="dropdown">
                    {languages.map(lang => (
                        <button 
                            key={lang.code} 
                            className="dropdown-item" 
                            onClick={() => changeLanguage(lang.code)}
                        >
                            <img src={lang.flag} alt={lang.name} className="flag-icon" />
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
