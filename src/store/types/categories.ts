export type NewsCategoryResponse = {
  id: number
  titleEn: string
  titleHi: string
  mainNewsCategoryIdEn?: number // used for top news slider
  mainNewsCategoryIdHi?: number
  latestNewsCategoryIdEn: number // used for vertical news list
  latestNewsCategoryIdHi: number
  subcategories: {
    id: number
    titleEn: string
    titleHi: string
    latestNewsCategoryIdEn: number // used for vertical list, NOT top slider
    latestNewsCategoryIdHi: number // used for vertical list, NOT top slider
  }[]
}[]

export interface NewsSubcategory {
  id: number
  title: string
  latestNewsCategoryId: number // used for vertical list, NOT top slider
}

export interface NewsCategory {
  id: number
  title: string
  latestNewsCategoryId: number // used for vertical news list
  mainNewsCategoryId?: number // used for top news slider
  subcategories: NewsSubcategory[]
}

export interface CategoriesResponse {
  blank: number
  created_at: string
  icon: null | string
  id: number
  location: string
  name: string
  new: number
  parent: number
  updated_at: string
  url: string
}

export interface Category {
  id: number
  title: string
  icon: null | string
  url: null | string
  menuOptions: {
    id: number
    title: string
    icon: null | string
    url: null | string
    location: string
  }[]
}
