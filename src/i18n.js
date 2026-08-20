import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import paTranslations from './locales/pa.json';
import mrTranslations from './locales/mr.json';
import bnTranslations from './locales/bn.json';
import taTranslations from './locales/ta.json';

const savedLanguage = localStorage.getItem('workconnectLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      pa: { translation: paTranslations },
      mr: { translation: mrTranslations },
      bn: { translation: bnTranslations },
      ta: { translation: taTranslations }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('workconnectLanguage', lng);
});

export default i18n;
