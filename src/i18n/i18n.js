import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import hi from './hi'
import { DEFAULT_APP_LANGUAGE } from '../constants'

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const language = await AsyncStorage.getItem('lng')
      return language ? callback(language) : callback(DEFAULT_APP_LANGUAGE)
    } catch (e) {
      return callback(DEFAULT_APP_LANGUAGE)
    }
  },
  init: () => {},
  cacheUserLanguage: (lng) => {
    const lang = lng.split('-')[0]
    AsyncStorage.setItem('lng', lang)
  },
}

const initTranslate = () => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
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
    })
}

export default initTranslate
