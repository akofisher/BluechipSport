import { createAsyncThunk } from '@reduxjs/toolkit'

export const categoriesData = [
  {
    title: 'Cricket',
    icon: 'Cricket',
    menuOptions: [{ title: 'IPL' }, { title: 'SA20' }],
  },
  {
    title: 'Football',
    icon: 'Football',
    menuOptions: [{ title: 'IPL' }, { title: 'SA20' }, { title: 'BBL' }],
  },
  {
    title: 'Kabaddi',
    icon: 'Kabaddi',
    menuOptions: [{ title: 'IPL' }, { title: 'SA20' }, { title: 'BBL' }],
  },
  {
    title: 'Tennis',
    icon: 'Tennis',
    menuOptions: [{ title: 'IPL' }],
  },
]

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return categoriesData
  },
)
