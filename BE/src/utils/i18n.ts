import i18next from "i18next";

const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next.init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: require("../translation/en.json"),
    },
    ar: {
      translation: require("../translation/ar.json"),
    },
  },
});

export default (lng: string) => i18next.getFixedT(lng || systemLocale);
