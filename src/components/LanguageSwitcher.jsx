import React, { useState } from 'react';
//import { useTranslation } from 'react-i18next';
import es from '../assets/flags/es.jpg';
import en from '../assets/flags/en.jpg';

const LanguageSwitcher = () => {
    //const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: en },
        { code: 'es', name: 'Español', flag: es },
    ];

    // Obtener el idioma actual para mostrar la bandera correspondiente
    //const currentLanguage = languages.find(lang => lang.code === i18n.language);

    const changeLanguage = (code) => {
        //i18n.changeLanguage(code);
        setIsOpen(false); 
    };

    return (
        <div className="language-switcher">
            <button 
                className="current-language" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {/*<img src={currentLanguage.flag} alt={currentLanguage.name} className="flag-icon" />*/}
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
