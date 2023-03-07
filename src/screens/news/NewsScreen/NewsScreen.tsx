import React, { useEffect, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { HorizontalSlides } from './components/HorizontalSlides'
import { NewsScreenHeader } from './components/NewsScreenHeader'
import { useAppDispatch } from '../../../store'
import {
  fetchCategoryNews,
  fetchLatestNews,
  fetchMainNews,
  fetchMoreLatestNews,
  fetchNewsCategories,
  refreshPage,
  resetMainNews,
  resetSubcategoriesNews,
  setSelectedNewsCategory,
} from '../../../store/thunks'
import { useSelector } from 'react-redux'
import {
  selectCategoryNews,
  selectIsLoadingMoreLatestNews,
  selectIsLoadMoreLatestNewsAvailable,
  selectLatestNews,
  selectLatestNewsCurrentPage,
  selectMainNews,
  selectNewsCategories,
  selectActiveNewsCategory,
  selectNewsLoading,
  selectNewsRefreshing,
} from '../../../store/selectors'
import { NewsVerticalList } from '../../../components/NewsVerticalList/NewsVerticalList'
import i18next from 'i18next'
import { cxs } from '../../../styles'
import { Spinner } from '../../../components/common'
import { NewsCategory, NewsSubcategory } from '../../../store/types'
import { useNavigation } from '@react-navigation/native'
import AdBanner from '../../../components/AdMob/AdBanner'

const FLAT_LIST_ITEMS = {
  HORIZONTAL_SLIDES: 'HORIZONTAL_SLIDES',
  LAST_NEWS: 'LAST_NEWS',
}

const FLAT_LIST_DATA = [
  { key: FLAT_LIST_ITEMS.HORIZONTAL_SLIDES },
  { key: FLAT_LIST_ITEMS.LAST_NEWS },
]

export const NewsScreen = () => {
  const mainRef = React.useRef(null)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const newsCategories = useSelector(selectNewsCategories)
  const latestNews = useSelector(selectLatestNews)
  const mainNews = useSelector(selectMainNews)

  const latestNewsCurrentPage = useSelector(selectLatestNewsCurrentPage)
  const selectedActiveNewsCategory = useSelector(selectActiveNewsCategory)
  const selectedCategoryNews = useSelector(selectCategoryNews)

  const isLoading = useSelector(selectNewsLoading)
  const isLoadingMoreLatestNews = useSelector(selectIsLoadingMoreLatestNews)
  const isRefreshing = useSelector(selectNewsRefreshing)

  const isLoadMoreLatestNewsAvailable = useSelector(
    selectIsLoadMoreLatestNewsAvailable,
  )

  useEffect(() => {
    dispatch(fetchNewsCategories())
  }, [dispatch])

  const handleMainNews = useCallback(
    (categoryId?: number) => {
      if (categoryId) {
        return dispatch(fetchMainNews(categoryId))
      }

      dispatch(resetMainNews())
    },
    [dispatch],
  )

  const handleLatestNews = useCallback(
    (categoryId?: number) => {
      if (categoryId) {
        return dispatch(fetchLatestNews(categoryId))
      }
    },
    [dispatch],
  )

  const handleSubCategoriesNews = useCallback(
    (subCategories: NewsSubcategory[]) => {
      if (subCategories && subCategories.length) {
        return dispatch(fetchCategoryNews(subCategories))
      }

      dispatch(resetSubcategoriesNews())
    },
    [dispatch],
  )

  useEffect(() => {
    if (selectedActiveNewsCategory) {
      const { latestNewsCategoryId, mainNewsCategoryId, subcategories } =
        selectedActiveNewsCategory

      handleMainNews(mainNewsCategoryId)
      handleLatestNews(latestNewsCategoryId)
      handleSubCategoriesNews(subcategories)
    }
  }, [
    handleLatestNews,
    handleMainNews,
    handleSubCategoriesNews,
    selectedActiveNewsCategory,
  ])

  const onRefresh = useCallback(() => {
    if (selectedActiveNewsCategory) {
      dispatch(refreshPage(selectedActiveNewsCategory))
    }
  }, [dispatch, selectedActiveNewsCategory])

  const onSelectCategory = useCallback(
    (category: NewsCategory) => {
      dispatch(setSelectedNewsCategory(category))
    },
    [dispatch],
  )

  const loadMoreLatestNews = useCallback(() => {
    if (isLoadMoreLatestNewsAvailable && !isLoadingMoreLatestNews) {
      dispatch(
        fetchMoreLatestNews({
          page: latestNewsCurrentPage + 1,
          categoryId: selectedActiveNewsCategory?.latestNewsCategoryId || 0,
        }),
      )
    }
  }, [
    dispatch,
    isLoadMoreLatestNewsAvailable,
    isLoadingMoreLatestNews,
    latestNewsCurrentPage,
    selectedActiveNewsCategory?.latestNewsCategoryId,
  ])

  const openNewsDetails = React.useCallback(
    (id: number, title: string, mainVideoUrl: string | undefined) => {
      navigation.navigate('NewsDetails', {
        articleId: id,
        title,
        mainVideoUrl,
      })
    },
    [navigation],
  )

  const openCategoryNewsScreen = React.useCallback(
    (categoryId: number, title: string) => {
      navigation.navigate('NewsCategory', {
        categoryId,
        title,
      })
    },
    [navigation],
  )

  const renderItem = useCallback(
    ({ item }: { item: { key: string } }) => {
      if (item.key === FLAT_LIST_ITEMS.HORIZONTAL_SLIDES) {
        return (
          <HorizontalSlides data={mainNews} openNewsDetails={openNewsDetails} />
        )
      }

      if (item.key === FLAT_LIST_ITEMS.LAST_NEWS) {
        if (selectedCategoryNews.length) {
          return (
            <>
              {selectedCategoryNews.map((category, idx) => (
                <NewsVerticalList
                  key={idx}
                  isFullSizeItem={false}
                  data={category.data}
                  isLoadingMore={false}
                  openDetails={openNewsDetails}
                  title={category.title}
                  categoryId={category.categoryId}
                  onShowMore={openCategoryNewsScreen}
                />
              ))}
            </>
          )
        }

        return (
          <>
            <AdBanner />
            <NewsVerticalList
              isFullSizeItem={true}
              data={latestNews}
              isLoadingMore={isLoadingMoreLatestNews}
              fetchMore={loadMoreLatestNews}
              openDetails={openNewsDetails}
              title={i18next.t('LAST NEWS')}
              withSwitcher={true}
            />
          </>
        )
      }
    },
    [
      mainNews,
      openNewsDetails,
      latestNews,
      isLoadingMoreLatestNews,
      loadMoreLatestNews,
      selectedCategoryNews,
      openCategoryNewsScreen,
    ],
  )

  return (
    <View style={cxs.flex}>
      <NewsScreenHeader
        navigation={navigation}
        categories={newsCategories}
        activeCategoryId={selectedActiveNewsCategory?.id || 0}
        onSelectCategory={onSelectCategory}
      />
      {isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <FlatList
          ref={mainRef}
          extraData={selectedActiveNewsCategory?.id}
          keyExtractor={(item) => item.key}
          data={FLAT_LIST_DATA}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}
