import { createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from '../thunks'
import { Category } from '../types'

export interface CategoriesState {
  sideBarCategories: Category[]
  newsHeaderCategories: Category[]
}

const initialState: CategoriesState = {
  newsHeaderCategories: [],
  sideBarCategories: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.sideBarCategories = action.payload.sideBar
      state.newsHeaderCategories = action.payload.newsHeader
    })
  },
})

export const {} = categoriesSlice.actions

export const categories = categoriesSlice.reducer
