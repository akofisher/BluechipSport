import React, { useCallback, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Spinner, Text } from '../common'
import { VerticalListItem } from '../news'
import { VerticalListModeSwitcher } from './components/VerticalListModeSwitcher'
import i18next from 'i18next'
import { Colors } from '../../styles'
import { Article } from '../../store/slices'

const keyExtractor = (item: { id: string }) => item.id

interface NewsVerticalListProps {
  data: any[]
  openDetails: (id: number, title: string, videoUrl: string) => void
  isFullSizeItem: boolean
  isLoadingMore?: boolean
  fetchMore?: () => void
  withSwitcher?: boolean
  withShowMore?: boolean
  title: string
  categoryId?: number
  onShowMore?: (categoryId: number, title: string) => void
}

export const NewsVerticalList = React.memo<NewsVerticalListProps>((props) => {
  const {
    data = [],
    openDetails,
    isFullSizeItem,
    isLoadingMore,
    fetchMore,
    title,
    withSwitcher,
    onShowMore,
    categoryId,
  } = props
  const [isTillMoveActive, setIsTillMoveActive] = useState(isFullSizeItem)

  const renderListFooterComponent = useCallback(
    () => (isLoadingMore ? <Spinner style={styles.spinner} /> : null),
    [isLoadingMore],
  )

  const onShowMorePress = useCallback(
    () => onShowMore && onShowMore(categoryId || 0, title),
    [onShowMore, categoryId, title],
  )

  const renderItem = useCallback(
    ({ item, index }: ListRenderItem<Article>) => {
      return (
        <VerticalListItem
          {...item}
          index={index}
          isFullSize={isTillMoveActive}
          onPress={openDetails}
        />
      )
    },
    [isTillMoveActive, openDetails],
  )

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {withSwitcher ? (
          <VerticalListModeSwitcher
            isTileMode={true}
            onChange={setIsTillMoveActive}
          />
        ) : null}
        {onShowMore ? (
          <TouchableOpacity onPress={onShowMorePress}>
            <Text style={styles.moreNewsText}>{i18next.t('MORE NEWS')}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        style={styles.list}
        onEndReached={fetchMore}
        onEndReachedThreshold={Platform.select({
          ios: 0,
          android: 1,
        })}
        maxToRenderPerBatch={isFullSizeItem ? 5 : 10}
        initialNumToRender={isFullSizeItem ? 5 : 10}
        windowSize={isFullSizeItem ? 6 : 10}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderListFooterComponent}
        removeClippedSubviews
      />
    </>
  )
})

const styles = StyleSheet.create({
  list: { backgroundColor: '#F2F2F2', flex: 1 },
  spinner: { paddingVertical: 20 },
  title: {
    color: Colors.textBlack,
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#F2F2F2',
    paddingTop: 15,
    paddingBottom: 11,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreNewsText: {
    color: '#111315',
    fontWeight: '500',
    fontSize: 12,
  },
})
