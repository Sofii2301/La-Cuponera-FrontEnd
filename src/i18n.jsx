// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/locales/en/translation.json';
import es from './assets/locales/es/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        es: {
            translation: es,
        },
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // react ya maneja la escapada por defecto
    },
});

export default i18n;
