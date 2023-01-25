import { RootState } from '../index'

export const selectCategories = (state: RootState) =>
  state.categories.categories
