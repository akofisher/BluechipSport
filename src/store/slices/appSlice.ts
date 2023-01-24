import { createSlice } from '@reduxjs/toolkit'
import { AVAILABLE_APP_LANGUAGES, DEFAULT_APP_LANGUAGE } from '../../constants'
import { initAppLanguage, setAppLanguage } from '../thunks/appThunks'
import { SvgICONSType } from '../../../assets/svgs/svgIcons'

export type AppLanguageCode = 'en' | 'hi'

export interface AppState {
  language: AppLanguageCode
  availableLanguages: {
    title: string
    iconName: SvgICONSType
    code: AppLanguageCode
  }[]
}

const initialState: AppState = {
  availableLanguages: AVAILABLE_APP_LANGUAGES,
  language: DEFAULT_APP_LANGUAGE,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAppLanguage.fulfilled, (state, action) => {
      state.language = action.payload
    })
    builder.addCase(setAppLanguage.fulfilled, (state, action) => {
      state.language = action.payload
    })
  },
})

export const { setLanguage } = appSlice.actions

export default appSlice.reducer
