import { createSlice } from '@reduxjs/toolkit'
import {
  fetchCategoryNews,
  fetchLatestNews,
  fetchMainNews,
  fetchMoreLatestNews,
  fetchNewsCategories,
  refreshPage,
  resetMainNews,
  resetSubcategoriesNews,
  setSelectedNewsCategory,
} from '../thunks'
import { NewsCategory } from '../types'

export type Articles = any[]

export type CategoryNews = {
  data: Articles
  title: string
  categoryId: number
}[]

export interface NewsState {
  newsCategories: NewsCategory[]
  selectedNewsCategory: NewsCategory | null

  latestNews: any[]
  mainNews: any[]
  categoryNews: CategoryNews

  isRefreshing: boolean
  isLoading: boolean
  isLoadingMoreLatestNews: boolean
  latestNewsPage: number
  latestNewsPagesTotal: number
}

const initialState: NewsState = {
  newsCategories: [],
  selectedNewsCategory: null,

  latestNews: [],
  mainNews: [],
  categoryNews: [],

  isRefreshing: false,
  isLoading: false,
  isLoadingMoreLatestNews: false,
  latestNewsPage: 1,
  latestNewsPagesTotal: 1,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewsCategories.fulfilled, (state, action) => {
      state.newsCategories = action.payload
    })
    builder.addCase(setSelectedNewsCategory, (state, action) => {
      state.selectedNewsCategory = action.payload
    })

    builder.addCase(resetMainNews, (state, action) => {
      state.mainNews = []
    })

    builder.addCase(resetSubcategoriesNews, (state, action) => {
      state.categoryNews = []
    })

    builder.addCase(fetchLatestNews.fulfilled, (state, action) => {
      state.latestNews = action.payload.articles
      state.latestNewsPage = action.payload.latestNewsPage
      state.latestNewsPagesTotal = action.payload.latestNewsPagesTotal
    })
    builder.addCase(fetchMoreLatestNews.pending, (state) => {
      state.isLoadingMoreLatestNews = true
    })
    builder.addCase(fetchMoreLatestNews.fulfilled, (state, action) => {
      state.latestNews = [...state.latestNews, ...action.payload.articles]
      state.latestNewsPage = action.payload.latestNewsPage
      state.latestNewsPagesTotal = action.payload.latestNewsPagesTotal
      state.isLoadingMoreLatestNews = false
    })
    builder.addCase(fetchMoreLatestNews.rejected, (state) => {
      state.isLoadingMoreLatestNews = false
    })
    builder.addCase(fetchMainNews.fulfilled, (state, action) => {
      state.mainNews = action.payload
    })

    builder.addCase(fetchCategoryNews.fulfilled, (state, action) => {
      state.categoryNews = action.payload
    })

    builder.addCase(refreshPage.pending, (state) => {
      state.isRefreshing = true
    })
    builder.addCase(refreshPage.fulfilled, (state) => {
      state.isRefreshing = false
    })
    builder.addCase(refreshPage.rejected, (state) => {
      state.isRefreshing = false
    })
  },
})

export const {} = newsSlice.actions

export const news = newsSlice.reducer
