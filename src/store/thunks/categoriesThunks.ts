import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../services'
import {
  CategoriesResponse,
  Category,
  prepareCategories,
} from '../transformantors'

export const fetchCategories = createAsyncThunk<{
  sideBar: Category[]
  newsHeader: Category[]
}>('categories/fetchCategories', async () => {
  try {
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
