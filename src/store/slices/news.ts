import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchCategoryNews,
  fetchLatestNews,
  fetchMainNews,
  fetchMoreLatestNews,
  refreshPage,
  setSelectedNewsCategory,
} from '../thunks'
import { Category } from '../transformantors'
import i18next from 'i18next'

export const latestNewsCategory: Category = {
  id: -1,
  title: i18next.t('LAST NEWS'),
  url: '',
  icon: null,
  menuOptions: [],
}

export type Articles = any[]

export type CategoryNews = { data: Articles; title: string; url: string }[]

export interface NewsState {
  latestNews: any[]
  mainNews: any[]
  isRefreshing: boolean
  isLoading: boolean
  isLoadingMoreLatestNews: boolean
  latestNewsPage: number
  latestNewsPagesTotal: number
  selectedNewsCategory: Category
  categoryNews: CategoryNews
}

const initialState: NewsState = {
  latestNews: [],
  mainNews: [],
  isRefreshing: false,
  isLoading: false,
  isLoadingMoreLatestNews: false,
  latestNewsPage: 1,
  latestNewsPagesTotal: 1,
  selectedNewsCategory: latestNewsCategory,
  categoryNews: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    builder.addCase(setSelectedNewsCategory, (state, action) => {
      state.selectedNewsCategory = action.payload
    })
  },
})

export const {} = newsSlice.actions

export const news = newsSlice.reducer
