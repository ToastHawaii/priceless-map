import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";
import { initReactI18next } from "react-i18next";
import * as en from "./locales/en.json";
import * as oacEn from "../osm-app-component/locales/en.json";

import * as de from "./locales/de.json";
import * as oacDe from "../osm-app-component/locales/de.json";
import * as es from "./locales/es.json";
import * as oacEs from "../osm-app-component/locales/es.json";
import * as fr from "./locales/fr.json";
import * as oacFr from "../osm-app-component/locales/fr.json";
import * as pl from "./locales/pl.json";
import * as oacPl from "../osm-app-component/locales/pl.json";

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
      en: { translation: { ...en, ...oacEn } },
      de: { translation: { ...de, ...oacDe } },
      es: { translation: { ...es, ...oacEs } },
      fr: { translation: { ...fr, ...oacFr } },
      pl: { translation: { ...pl, ...oacPl } },
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
