import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetector, languageDetectorOptions } from "./lang-detector"

const resources = {
    en: {
        translation: {
            "Olá mundo": "Hello world"
        }
    },
    pt: {
        translation: {
            "Olá mundo": "Olá mundo"
        }
    },
}

i18n.use(languageDetector)
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        detection: languageDetectorOptions,
        resources,
        // supportedLngs: ["pt", "en"],
        // lng: "pt", // fallback language is portuguese
        fallbackLng: ["pt", "en"],

        interpolation: {
            escapeValue: false, // no need for react. it escapes by default
        },
    });

export default i18n;