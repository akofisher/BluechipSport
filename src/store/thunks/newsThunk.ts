import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../services'
import { processGetArticlesResponse } from '../../screens/news/utils'
import { Category } from '../transformantors'
import { CategoryNews } from '../slices'

export const fetchCategoryNews = createAsyncThunk<CategoryNews>(
  'news/fetchCategoryNews',
  async () => {
    try {
      const { data }: { data: any } = await API.getSlideArticles()
      return [
        {
          data: processGetArticlesResponse(data.data).slice(0, 3),
          title: 'IPL2',
          url: '',
        },
        {
          data: processGetArticlesResponse(data.data).splice(0, 3),
          title: 'SA 20',
          url: '',
        },
      ]
    } catch (e) {
      console.log('fetchMainNews error', e)
      return []
    }
  },
)

export const fetchMainNews = createAsyncThunk(
  'news/fetchMainNews',
  async (_) => {
    try {
      const { data }: { data: any } = await API.getSlideArticles()
      return processGetArticlesResponse(data.data)
    } catch (e) {
      console.log('fetchMainNews error', e)
      return []
    }
  },
)

export const fetchLatestNews = createAsyncThunk<{
  articles: any[]
  latestNewsPage: number
  latestNewsPagesTotal: number
}>('news/fetchLatestNews', async (_) => {
  try {
    const { data }: { data: any } = await API.getSlideArticles()

    return {
      articles: processGetArticlesResponse(data.data),
      latestNewsPage: data.current_page,
      latestNewsPagesTotal: data.last_page,
    }
  } catch (e) {
    console.log('fetchLatestNews error', e)
    return []
  }
})

export const fetchMoreLatestNews = createAsyncThunk<
  {
    articles: any[]
    latestNewsPage: number
    latestNewsPagesTotal: number
  },
  number
>('news/fetchMoreLatestNews', async (page: number) => {
  try {
    const { data }: { data: any } = await API.getSlideArticles({
      kwds: { page: page },
    })
    return {
      articles: processGetArticlesResponse(data.data),
      latestNewsPage: data.current_page,
      latestNewsPagesTotal: data.last_page,
    }
  } catch (e) {
    console.log('fetchMoreLatestNews error', e)
    return []
  }
})

export const refreshPage = createAsyncThunk(
  'news/refreshPage',
  async (_, { dispatch }) => {
    await Promise.all([dispatch(fetchMainNews()), dispatch(fetchLatestNews())])
  },
)

export const setSelectedNewsCategory = createAction<Category>(
  'setSelectedNewsCategory',
)
