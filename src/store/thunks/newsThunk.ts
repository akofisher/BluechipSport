import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../services'
import { processGetArticlesResponse } from '../../screens/news/utils'
import { Articles, CategoryNews } from '../slices'
import { NewsCategory, NewsSubcategory } from '../types'
import { NEWS_CATEGORIES } from '../transformantors/mocks/newsCategories'
import { parseNewsCategories } from '../transformantors'

export const fetchNewsCategories = createAsyncThunk<NewsCategory[]>(
  'news/fetchNewsCategories',
  async (_, config) => {
    try {
      const response = parseNewsCategories(NEWS_CATEGORIES)
      config.dispatch(setSelectedNewsCategory(response[0]))
      return response
    } catch (e) {
      return []
    }
  },
)

export const fetchMainNews = createAsyncThunk<Articles, number>(
  'news/fetchMainNews',
  async (categoryId) => {
    try {
      // @ts-ignore
      const { data }: { data: any } = await API.getCategoryArticles({
        kwds: { categoryId, page: 1 },
      })
      return processGetArticlesResponse(data.data)
    } catch (e) {
      console.log('fetchMainNews error', e)
      return []
    }
  },
)

export const fetchLatestNews = createAsyncThunk<
  {
    articles: any[]
    latestNewsPage: number
    latestNewsPagesTotal: number
  },
  number
>('news/fetchLatestNews', async (categoryId) => {
  try {
    // @ts-ignore
    const { data }: { data: any } = await API.getCategoryArticles({
      kwds: { categoryId, page: 1 },
    })

    return {
      articles: processGetArticlesResponse(data.data),
      latestNewsPage: data.current_page,
      latestNewsPagesTotal: data.last_page,
    }
  } catch (e) {
    console.log('fetchLatestNews error', e)
    return {
      articles: [],
      latestNewsPage: 0,
      latestNewsPagesTotal: 0,
    }
  }
})

export const fetchMoreLatestNews = createAsyncThunk<
  {
    articles: any[]
    latestNewsPage: number
    latestNewsPagesTotal: number
  },
  { categoryId: number; page: number }
>('news/fetchMoreLatestNews', async ({ categoryId, page }) => {
  try {
    // @ts-ignore
    const { data }: { data: any } = await API.getCategoryArticles({
      kwds: { categoryId, page },
    })

    return {
      articles: processGetArticlesResponse(data.data),
      latestNewsPage: data.current_page,
      latestNewsPagesTotal: data.last_page,
    }
  } catch (e) {
    console.log('fetchMoreLatestNews error', e)
    return {
      articles: [],
      latestNewsPage: 0,
      latestNewsPagesTotal: 0,
    }
  }
})

export const fetchCategoryNews = createAsyncThunk<
  CategoryNews,
  NewsSubcategory[]
>('news/fetchCategoryNews', async (subcategories) => {
  try {
    const response = await Promise.all(
      subcategories.map((subcategory) =>
        // @ts-ignore
        API.getCategoryArticles({
          kwds: { categoryId: subcategory.latestNewsCategoryId, page: 1 },
        }),
      ),
    )

    return subcategories.map((subcategory, index) => ({
      categoryId: subcategory.latestNewsCategoryId,
      title: subcategory.title,
      data: processGetArticlesResponse(response[index].data.data).slice(0, 3),
    }))
  } catch (e) {
    console.log('fetchCategoryNews error', e)
    return []
  }
})

export const refreshPage = createAsyncThunk<any, NewsCategory>(
  'news/refreshPage',
  async (category, { dispatch }) => {
    await Promise.all([
      category.mainNewsCategoryId &&
        dispatch(fetchMainNews(category.mainNewsCategoryId)),
      dispatch(fetchLatestNews(category.latestNewsCategoryId)),
      dispatch(fetchCategoryNews(category.subcategories)),
    ])
  },
)

export const setSelectedNewsCategory = createAction<NewsCategory>(
  'setSelectedNewsCategory',
)

export const resetMainNews = createAction('resetMainNews')
export const resetSubcategoriesNews = createAction('resetSubcategoriesNews')
