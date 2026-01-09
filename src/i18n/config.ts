import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./locales";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: typeof window !== 'undefined' ? undefined : 'en', // Force English on server
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: typeof window !== 'undefined' ? ["localStorage", "navigator", "htmlTag"] : [],
      caches: typeof window !== 'undefined' ? ["localStorage"] : [],
      convertDetectedLanguage: (lng: string) => {
        // Normalize language codes to base language (e.g., "en-US" -> "en")
        return lng.split('-')[0];
      },
    },
  });

export default i18n;