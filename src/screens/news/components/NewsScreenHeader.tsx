import React, { useCallback } from 'react'
import { Header } from '../../../components/header'
import { CategoriesList } from './CategoriesList'
import { Category } from '../../../store/transformantors'

interface NewsScreenHeaderProps {
  navigation: any
  categories: Category[]
  activeCategoryId: number
  onSelectCategory: (item: Category) => void
}

export const NewsScreenHeader = React.memo<NewsScreenHeaderProps>(
  ({ navigation, categories, activeCategoryId, onSelectCategory }) => {
    const onSearchPress = React.useCallback(
      () => navigation.navigate('searchScreen'),
      [navigation],
    )

    const renderListHeader = useCallback(() => {
      const rightAction = [
        {
          onPress: onSearchPress,
          iconName: 'Search',
        },
        {
          onPress: navigation.openDrawer,
          iconName: 'Menu',
        },
      ]
      return (
        <Header
          rightAction={rightAction}
          content={
            <CategoriesList
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={onSelectCategory}
            />
          }
        />
      )
    }, [
      onSearchPress,
      navigation.openDrawer,
      categories,
      activeCategoryId,
      onSelectCategory,
    ])

    return renderListHeader()
  },
)
