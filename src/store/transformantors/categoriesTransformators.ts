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
