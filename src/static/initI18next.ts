import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as en from "./locales/en.json";
import * as clientEn from "../client/en/local.json";
import * as clientTypeEn from "../client/en/local.type.json";
import * as oapEn from "../osm-app-component/en/local.json";
import * as de from "./locales/de.json";
import * as clientDe from "../client/de/local.json";
import * as clientTypeDe from "../client/de/local.type.json";
import * as oapDe from "../osm-app-component/de/local.json";
import moment from "moment";

i18next.on("languageChanged", function (lng) {
  document.documentElement.setAttribute("lang", lng);
  moment.locale(lng);
});

i18next
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      lookupQuerystring: "lang",
    },
    fallbackLng: "en",

    resources: {
      en: { translation: { ...en, ...clientEn, ...oapEn, type: clientTypeEn } },
      de: { translation: { ...de, ...clientDe, ...oapDe, type: clientTypeDe } },
    },

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: false,
    },

    nsSeparator: "#",
    pluralSeparator: "%",
  });
