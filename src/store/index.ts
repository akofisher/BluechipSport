import { configureStore } from '@reduxjs/toolkit'
import { app, categories, news } from './slices'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    app,
    categories,
    news,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
