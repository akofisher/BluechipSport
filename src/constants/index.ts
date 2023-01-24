import { AppLanguageCode } from '../store/slices/appSlice'

export const DEFAULT_APP_LANGUAGE = 'en'

export const AVAILABLE_APP_LANGUAGES = [
  { title: 'English', iconName: 'English', code: 'en' as AppLanguageCode },
  { title: 'हिन्दी', iconName: 'Hindi', code: 'hi' as AppLanguageCode },
]
