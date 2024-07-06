import i18next, { Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";
import { initReactI18next } from "react-i18next";

export function initI18next(resource: Resource) {
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

      resources: resource,

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
      react: {
        useSuspense: false,
      },

      nsSeparator: "#",
      pluralSeparator: "%",
    });
}
