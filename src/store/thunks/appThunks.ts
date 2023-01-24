import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'
import { DEFAULT_APP_LANGUAGE } from '../../constants'
import { AppLanguageCode } from '../slices/appSlice'

export const initAppLanguage = createAsyncThunk(
  'app/initAppLanguage',
  async () => {
    const languageCode = (await AsyncStorage.getItem('lng')) as
      | 'en'
      | 'hi'
      | null
    return languageCode || DEFAULT_APP_LANGUAGE
  },
)

export const setAppLanguage = createAsyncThunk(
  'app/setLanguage',
  async (languageCode: AppLanguageCode) => {
    await AsyncStorage.setItem('lng', languageCode)
    await i18next.changeLanguage(languageCode)

    return languageCode
  },
)
