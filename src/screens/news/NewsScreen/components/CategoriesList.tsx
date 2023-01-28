import React, { useCallback } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../../../../components/common'
import { NewsCategory } from '../../../../store/types'

interface CategoriesListProps {
  categories: NewsCategory[]
  activeCategoryId: number
  onSelectCategory: (item: NewsCategory) => void
}

export const CategoriesList = React.memo<CategoriesListProps>((props) => {
  const { categories, activeCategoryId, onSelectCategory } = props
  const renderItem = useCallback(
    ({ item }: { item: NewsCategory }) => {
      const isActiveCategory = item.id === activeCategoryId
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectCategory(item)}
          style={[
            styles.category,
            isActiveCategory ? styles.activeCategory : null,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              isActiveCategory ? styles.categoryActiveText : null,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )
    },
    [activeCategoryId, onSelectCategory],
  )

  return (
    <FlatList
      horizontal
      keyExtractor={(item) => item.id?.toString()}
      data={categories}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
})

const styles = StyleSheet.create({
  category: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  activeCategory: {
    borderBottomColor: '#FF0960',
    borderBottomWidth: 2,
  },
  categoryText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  categoryActiveText: {
    color: '#FF0960',
  },
})
