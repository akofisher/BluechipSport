import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "aniuta";
import i18next from "i18next";
import { useCallback, useMemo, useState } from "react";

const languages = [
  { title: "English", iconName: "English", code: "en" },
  { title: "हिन्दी", iconName: "Hindi", code: "hi" },
];

const useLanguage = createStore({
  name: "LanguageService",
  Store: () => {
    const [language, setLanguage] = useState(i18next.language || languages[0].code);
    const changeLanguage = useCallback(
      async (languageCode) => {
        await AsyncStorage.setItem("lng", languageCode);
        await i18next.changeLanguage(languageCode);
        setLanguage(languageCode);
      },
      [setLanguage],
    );

    const selectedLanguage = useMemo(
      () => languages.find((item) => item.code === language),
      [language],
    );

    return {
      language,
      changeLanguage,
      languages,
      selectedLanguage,
    };
  },
});

export default useLanguage;
