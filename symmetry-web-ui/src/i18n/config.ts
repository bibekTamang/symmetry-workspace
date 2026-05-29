import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
    },
    fallbackLng: 'en', // Use English if the detected language isn't available
    interpolation: {
      escapeValue: false // React already escapes values by default
    },
    detection: {
      order: ['localStorage', 'navigator'], // Look in localStorage first, then browser settings
      caches: ['localStorage'] // Saving user selection here for future visits
    }
  });

export default i18n;