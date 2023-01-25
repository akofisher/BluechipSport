import { createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from '../thunks'
import { Category } from '../transformantors'

export interface CategoriesState {
  categories: Category[]
}

const initialState: CategoriesState = {
  categories: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
})

export const {} = categoriesSlice.actions

export const categories = categoriesSlice.reducer
