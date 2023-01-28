import {
  CategoriesResponse,
  Category,
  NewsCategory,
  NewsCategoryResponse,
} from '../types'
import i18next from 'i18next'
import { DEFAULT_APP_LANGUAGE } from '../../constants'

const prepareCategoriesByLocation = (
  categories: CategoriesResponse[],
  location: string,
) => {
  const parentCategories = categories.filter(
    (category) => category.parent === 0,
  )

  const mappedCategories = parentCategories.map((category) => {
    return {
      id: category.id,
      title: category.name,
      icon: category.icon,
      location: category.location,
      url: category.url,
      menuOptions: categories
        .filter((childCategory) => childCategory.parent === category.id)
        .map((childCategory) => ({
          id: childCategory.id,
          title: childCategory.name,
          icon: childCategory.icon,
          location: childCategory.location,
          url: childCategory.url,
        })),
    }
  })
  return mappedCategories.filter((category) => category.location === location)
}

// location: "1" - for Desktop
// location: "2" - For News header
// location: "3: - For Side bar
export const prepareCategories = (
  categories: CategoriesResponse[],
): {
  sideBar: Category[]
  newsHeader: Category[]
} => {
  return {
    sideBar: prepareCategoriesByLocation(categories, '3'),
    newsHeader: prepareCategoriesByLocation(categories, '2'),
  }
}

export const parseNewsCategories = (
  categories: NewsCategoryResponse,
): NewsCategory[] => {
  const isEnLanguageSelected = i18next.language === DEFAULT_APP_LANGUAGE

  return categories.map((category) => {
    return {
      id: category.id,
      title: isEnLanguageSelected ? category.titleEn : category.titleHi,
      mainNewsCategoryId: isEnLanguageSelected
        ? category.mainNewsCategoryIdEn
        : category.mainNewsCategoryIdHi,
      latestNewsCategoryId: isEnLanguageSelected
        ? category.latestNewsCategoryIdEn
        : category.latestNewsCategoryIdHi,
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        title: isEnLanguageSelected ? subcategory.titleEn : subcategory.titleHi,
        latestNewsCategoryId: isEnLanguageSelected
          ? subcategory.latestNewsCategoryIdEn
          : subcategory.latestNewsCategoryIdHi,
      })),
    }
  })
}
