import { AppLanguageCode } from '../store/slices/appSlice'
import { SvgICONSType } from '../../assets/svgs/svgIcons'

export const DEFAULT_APP_LANGUAGE = 'en'

export const AVAILABLE_APP_LANGUAGES = [
  {
    title: 'English',
    iconName: 'English' as SvgICONSType,
    code: 'en' as AppLanguageCode,
  },
  {
    title: 'हिन्दी',
    iconName: 'Hindi' as SvgICONSType,
    code: 'hi' as AppLanguageCode,
  },
]
