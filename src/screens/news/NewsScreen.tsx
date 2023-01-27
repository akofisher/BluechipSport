import { Spinner } from 'components/common'
import React, { useEffect, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { cxs } from 'styles'
import { HorizontalSlides } from './components/HorizontalSlides'
import { NewsScreenHeader } from './components/NewsScreenHeader'
import { useAppDispatch } from '../../store'
import {
  fetchCategoryNews,
  fetchLatestNews,
  fetchMainNews,
  fetchMoreLatestNews,
  refreshPage,
  setSelectedNewsCategory,
} from '../../store/thunks'
import { useSelector } from 'react-redux'
import {
  selectCategoryNews,
  selectIsLoadingMoreLatestNews,
  selectIsLoadMoreLatestNewsAvailable,
  selectIsNotLatestNewsCategorySelected,
  selectLatestNews,
  selectLatestNewsCurrentPage,
  selectMainNews,
  selectNewsCategories,
  selectNewsCategory,
  selectNewsLoading,
  selectNewsRefreshing,
} from '../../store/selectors'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import i18next from 'i18next'
import { Category } from '../../store/transformantors'

const FLAT_LIST_ITEMS = {
  HORIZONTAL_SLIDES: 'HORIZONTAL_SLIDES',
  LAST_NEWS: 'LAST_NEWS',
}

const FLAT_LIST_DATA = [
  { key: FLAT_LIST_ITEMS.HORIZONTAL_SLIDES },
  { key: FLAT_LIST_ITEMS.LAST_NEWS },
]

const NewsScreen = ({ navigation }) => {
  const mainRef = React.useRef(null)
  const dispatch = useAppDispatch()

  const latestNews = useSelector(selectLatestNews)
  const mainNews = useSelector(selectMainNews)
  const isLoading = useSelector(selectNewsLoading)
  const isLoadingMoreLatestNews = useSelector(selectIsLoadingMoreLatestNews)
  const isRefreshing = useSelector(selectNewsRefreshing)
  const latestNewsCurrentPage = useSelector(selectLatestNewsCurrentPage)
  const newsCategories = useSelector(selectNewsCategories)
  const selectedActiveNewsCategory = useSelector(selectNewsCategory)
  const selectedCategoryNews = useSelector(selectCategoryNews)
  const isNotLatestNewsCategorySelected = useSelector(
    selectIsNotLatestNewsCategorySelected,
  )
  const isLoadMoreLatestNewsAvailable = useSelector(
    selectIsLoadMoreLatestNewsAvailable,
  )

  useEffect(() => {
    dispatch(fetchLatestNews())
    dispatch(fetchMainNews())
  }, [dispatch])

  useEffect(() => {
    if (isNotLatestNewsCategorySelected) {
      dispatch(fetchCategoryNews())
    }
  }, [dispatch, isNotLatestNewsCategorySelected])

  const onRefresh = useCallback(() => {
    dispatch(refreshPage())
  }, [dispatch])

  const onSelectCategory = useCallback(
    (category: Category) => {
      dispatch(setSelectedNewsCategory(category))
    },
    [dispatch],
  )

  const loadMoreLatestNews = useCallback(() => {
    if (isLoadMoreLatestNewsAvailable && !isLoadingMoreLatestNews) {
      dispatch(fetchMoreLatestNews(latestNewsCurrentPage + 1))
    }
  }, [
    dispatch,
    isLoadMoreLatestNewsAvailable,
    isLoadingMoreLatestNews,
    latestNewsCurrentPage,
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

  const openCategoryNewsScreen = React.useCallback((link: string) => {}, [])

  const renderItem = useCallback(
    ({ item }) => {
      if (
        item.key === FLAT_LIST_ITEMS.HORIZONTAL_SLIDES &&
        !isNotLatestNewsCategorySelected
      ) {
        return (
          <HorizontalSlides data={mainNews} openNewsDetails={openNewsDetails} />
        )
      }

      if (item.key === FLAT_LIST_ITEMS.LAST_NEWS) {
        if (isNotLatestNewsCategorySelected) {
          return (
            <>
              {selectedCategoryNews.map((section) => (
                <NewsVerticalList
                  isFullSizeItem={false}
                  data={section.data}
                  isLoadingMore={false}
                  openDetails={openNewsDetails}
                  title={section.title}
                  link={section.url}
                  onShowMore={openCategoryNewsScreen}
                />
              ))}
            </>
          )
        }

        return (
          <NewsVerticalList
            isFullSizeItem={true}
            data={latestNews}
            isLoadingMore={isLoadingMoreLatestNews}
            fetchMore={loadMoreLatestNews}
            openDetails={openNewsDetails}
            title={i18next.t('LAST NEWS')}
            withSwitcher={true}
          />
        )
      }
    },
    [
      isNotLatestNewsCategorySelected,
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
        activeCategoryId={selectedActiveNewsCategory.id}
        onSelectCategory={onSelectCategory}
      />
      {isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <FlatList
          ref={mainRef}
          keyExtractor={(item) => item.key}
          data={FLAT_LIST_DATA}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  )
}

export default NewsScreen
