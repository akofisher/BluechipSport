import { RootState } from '../index'
import { createSelector } from '@reduxjs/toolkit'
import { selectCategories } from './categoriesSelectors'
import { latestNewsCategory } from '../slices'

export const selectLatestNews = (state: RootState) => state.news.latestNews
export const selectMainNews = (state: RootState) => state.news.mainNews
export const selectNewsRefreshing = (state: RootState) =>
  state.news.isRefreshing
export const selectNewsLoading = (state: RootState) => state.news.isLoading
export const selectIsLoadingMoreLatestNews = (state: RootState) =>
  state.news.isLoadingMoreLatestNews

export const selectLatestNewsCurrentPage = (state: RootState) =>
  state.news.latestNewsPage

export const selectIsLoadMoreLatestNewsAvailable = (state: RootState) =>
  state.news.latestNewsPage < state.news.latestNewsPagesTotal

export const selectNewsCategory = (state: RootState) =>
  state.news.selectedNewsCategory

export const selectNewsCategories = createSelector(
  selectCategories,
  (categories) => {
    return [latestNewsCategory, ...categories]
  },
)

export const selectCategoryNews = (state: RootState) => state.news.categoryNews
export const selectIsNotLatestNewsCategorySelected = createSelector(
  selectNewsCategory,
  (selectedNewsCategory) => selectedNewsCategory.id !== latestNewsCategory.id,
)
