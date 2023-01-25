import { configureStore } from '@reduxjs/toolkit'
import { app } from './slices'
import { categories } from './slices'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    app,
    categories,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
