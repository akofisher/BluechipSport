import { useNavigation } from '@react-navigation/native'
import i18next from 'i18next'
import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { processGetArticlesResponse } from 'screens/news/utils'
import { API, CancelSource, IsCancel } from 'services'
import { NewsVerticalList } from '../../../../components/NewsVerticalList/NewsVerticalList'
import { Colors } from '../../../../styles'

const NewsDetailsFooter = React.memo(() => {
  const [state, setState] = useState({
    isLoading: true,
    articles: [],
    currentPage: 1,
  })
  const navigation = useNavigation()

  const source = CancelSource()

  const fetchOnScroll = useCallback(() => {
    if (state.currentPage < 4) {
      setState((prev) => ({ ...prev, isLoading: true }))
      API.getMainArticles({
        cancelToken: source.token,
        params: { page: state.currentPage + 1 },
      })
        .then((response) => {
          setState((prev) => ({
            ...prev,
            currentPage: +response.data.current_page,
            articles: [
              ...prev.articles,
              ...processGetArticlesResponse(response.data.data),
            ],
          }))
        })
        .catch((error) => {
          IsCancel(error)
        })
        .finally(() => {
          setState((prev) => ({ ...prev, isLoading: false }))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.currentPage])

  useEffect(() => {
    fetchOnScroll()

    return () => {
      source && source.cancel()
    }
  }, [])

  const openNewsDetails = useCallback(
    (item) => {
      navigation.push('NewsDetails', {
        title: item.title,
        articleId: item.id,
        mainVIdeoUrl: item?.mainVideoUrl,
      })
    },
    [navigation],
  )

  return (
    <>
      <View style={styles.divider} />
      <NewsVerticalList
        isFullSizeItem={false}
        data={state.articles}
        openDetails={openNewsDetails}
        title={i18next.t('SimilarNews')}
        fetchMore={fetchOnScroll}
        isLoadingMore={state.isLoading}
      />
    </>
  )
})

export default NewsDetailsFooter

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: Colors.textGray,
  },
})
