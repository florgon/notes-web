// Importing main i18next libraries for working.
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Will be set when there is some error or something happened.
const fallbackLanguageCode = ['en'];

// List of all languages.
// Languages should be placed in:
// public/assets/locals/en/translations
const availableLanguageCodes = ['en', 'ru'];


i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLanguageCode,
    whitelist: availableLanguageCodes,

    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    detection: {
      checkWhitelist: true,
    },
});

export default i18n;