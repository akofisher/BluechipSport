import i18next from 'i18next'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { processGetArticlesResponse } from '../utils'
import { API } from '../../../services'
import { NewsVerticalList } from '../../../components/NewsVerticalList/NewsVerticalList'
import { Header } from '../../../components/header'
import { Article, Articles } from '../../../store/slices'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SvgICONSType } from '../../../../assets/svgs/svgIcons'

export const NewsCategoryScreen = React.memo(() => {
  const navigation = useNavigation()
  const route = useRoute()

  const { categoryId, title } = route.params as {
    categoryId: number
    title: string
  }

  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState<Articles>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pagesQuantity, setPagesQuantity] = useState(1)

  const fetchOnScroll = useCallback(async () => {
    if (currentPage < pagesQuantity) {
      setIsLoading(true)

      try {
        // @ts-ignore
        const response = await API.getCategoryArticles({
          kwds: { categoryId: categoryId, page: currentPage + 1 },
        })
        const { data, last_page } = response.data
        setArticles([...articles, ...processGetArticlesResponse(data)])
        setCurrentPage(currentPage + 1)
        setPagesQuantity(last_page)
      } catch (e) {
        console.log('fetch error')
      } finally {
        setIsLoading(false)
      }
    }
  }, [articles, categoryId, currentPage, pagesQuantity])

  useEffect(() => {
    fetchOnScroll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openNewsDetails = useCallback(
    (item: Article) => {
      navigation.navigate('NewsDetails', {
        title: item.title,
        articleId: item.id,
        mainVIdeoUrl: item?.mainVideoUrl,
      })
    },
    [navigation],
  )

  const headerLeftAction: { onPress: () => void; iconName: SvgICONSType } =
    useMemo(
      () => ({
        onPress: navigation.goBack,
        iconName: 'ArrowRight',
      }),
      [navigation.goBack],
    )

  return (
    <>
      <Header leftAction={headerLeftAction} title={title} />
      <NewsVerticalList
        isFullSizeItem={true}
        data={articles}
        openDetails={openNewsDetails}
        title={i18next.t('LAST NEWS')}
        withSwitcher={true}
        fetchMore={fetchOnScroll}
        isLoadingMore={isLoading}
      />
    </>
  )
})
