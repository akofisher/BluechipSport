import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../services'
import { prepareCategories } from '../transformantors'
import { CategoriesResponse, Category } from '../types'

export const fetchCategories = createAsyncThunk<{
  sideBar: Category[]
  newsHeader: Category[]
}>('categories/fetchCategories', async () => {
  try {
    // @ts-ignore
    const { data }: { data: CategoriesResponse[] } = await API.getCategories()
    return prepareCategories(data)
  } catch (e) {
    console.log('fetchCategories error', e)
    return {
      sideBar: [],
      newsHeader: [],
    }
  }
})
