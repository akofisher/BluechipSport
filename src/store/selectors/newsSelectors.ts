import { RootState } from '../index'

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

export const selectActiveNewsCategory = (state: RootState) =>
  state.news.selectedNewsCategory

export const selectNewsCategories = (state: RootState) =>
  state.news.newsCategories

export const selectCategoryNews = (state: RootState) => state.news.categoryNews
