import { RootState } from '../index'

export const selectSidebarCategories = (state: RootState) =>
  state.categories.sideBarCategories

export const selectNewsHeaderCategories = (state: RootState) =>
  state.categories.newsHeaderCategories
