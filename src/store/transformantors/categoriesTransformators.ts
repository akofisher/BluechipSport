export interface CategoriesResponse {
  blank: number
  created_at: string
  icon: null | string
  id: number
  location: number
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
  }[]
}

export const prepareCategories = (
  categories: CategoriesResponse[],
): Category[] => {
  const parentCategories = categories.filter(
    (category) => category.parent === 0,
  )
  return parentCategories.map((category) => {
    return {
      id: category.id,
      title: category.name,
      icon: category.icon,
      url: category.url,
      menuOptions: categories
        .filter((childCategory) => childCategory.parent === category.id)
        .map((childCategory) => ({
          id: childCategory.id,
          title: childCategory.name,
          icon: childCategory.icon,
          url: childCategory.url,
        })),
    }
  })
}
