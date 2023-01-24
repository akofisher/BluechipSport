import { RootState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

export const selectAppLanguage = (state: RootState) => state.app.language

export const selectAppAvailableLanguages = (state: RootState) =>
  state.app.availableLanguages

export const selectAppLanguageCodeAndIcon = createSelector(
  selectAppLanguage,
  selectAppAvailableLanguages,
  (appLanguage, availableLanguages) => {
    return availableLanguages.find((language) => language.code === appLanguage)
  },
)
