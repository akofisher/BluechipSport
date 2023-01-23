import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

import en from "./en";
import hi from "./hi";

const GetLocale = (localestring) => {
  return localestring.split("_")[0];
};

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: (callback) => {
    let locale = "en";

    AsyncStorage.getItem("lng", (err, lng) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !lng) {
        if (err && __DEV__) {
          console.log("Error fetching Languages from asyncstorage ", err);
        } else if (__DEV__) {
          console.log("No language is set, choosing fallback");
        }
        if (Platform.OS === "ios") {
          locale = GetLocale(NativeModules.SettingsManager.settings.AppleLanguages[0]);
        } else if (Platform.OS === "android") {
          locale = GetLocale(NativeModules.I18nManager.localeIdentifier);
        }

        callback(locale.replace("_", "-"));
        return;
      }
      callback(lng);
    });
  },
  init: () => {},
  cacheUserLanguage: (lng) => {
    const lang = lng.split("-")[0];
    AsyncStorage.setItem("lng", lang);
  },
};

const initTranslate = () => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      resources: {
        en: {
          translation: en,
        },
        hi: {
          translation: hi,
        },
      },
      debug: true,
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initTranslate;
