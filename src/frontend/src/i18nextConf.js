import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLanguageCode = ['en'];
const availableLanguageCodes = ['en', 'ru'];

// public/assets/locals/en/translations
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLanguageCode,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    whitelist: availableLanguageCodes,
    interpolation: {
      escapeValue: false,
    },
});

export default i18n;