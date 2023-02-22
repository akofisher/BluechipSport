import { useNavigation } from '@react-navigation/native'
import { Text } from 'components/common'
import moment from 'moment'
import React, { useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Share,
  Dimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { storageURL } from 'services/endpoints'
import { Colors, cxs } from 'styles'

import VerticalListItemHeader from './VerticalListItemHeader'
import VerticalListItemFooter from './VerticalListItemFooter'

const { width: deviceWidth } = Dimensions.get('window')

const VerticalListItem = React.memo((props) => {
  const {
    id,
    title,
    image,
    isSquareImage,
    commentsCount,
    teamImg,
    publishDate,
    isPopularLeague,
    isTeamNews,
    isFullSize,
    // onPress: onPressProp,
    mainVideoUrl,
    index,
    listKey = '',
    shareLink = '',
  } = props
  const navigation = useNavigation()

  const formattedDate = moment(publishDate).format('DD MMMM YYYY, HH:mm')
  const imageURI = `${storageURL}/size/timthumb.php?src=/uploads/posts/${image}&w=450`

  // const onPress = useCallback(() => {
  //   onPressProp(id, title, mainVideoUrl)
  // }, [onPressProp, id, title, mainVideoUrl])

  const onPress = useCallback(() => {
    navigation.navigate('NewsDetails', {
      articleId: id,
      title,
      mainVideoUrl,
    })
  }, [id, title, mainVideoUrl])

  const onSharePress = useCallback(() => {
    Share.share({
      url: shareLink,
    })
  }, [shareLink])

  const onCommentPress = useCallback(() => {
    navigation.navigate('NewsComments', {
      articleId: id,
    })
  }, [id, navigation])

  if (isFullSize) {
    return (
      <>
        <TouchableOpacity
          style={st.fullSizeItem}
          onPress={() => onPress()}
          key={id + 'full' + listKey + index}
          activeOpacity={0.7}
        >
          <VerticalListItemHeader
            isSquareImage={isSquareImage}
            mainVideoUrl={mainVideoUrl}
            imageURI={imageURI}
            onSharePress={onSharePress}
          />
          <VerticalListItemFooter
            onCommentPress={onCommentPress}
            commentsCount={commentsCount}
            title={title}
            formattedDate={formattedDate}
          />
        </TouchableOpacity>
      </>
    )
  }

  return (
    <TouchableOpacity
      style={st.item}
      onPress={() => onPress()}
      key={id + listKey + index}
    >
      <FastImage style={st.itemImage} source={{ uri: imageURI }} />
      <View style={st.itemTextContent}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={st.itemTitle}>
          {title}
        </Text>
        {isTeamNews || isPopularLeague ? (
          <Text style={st.itemDate}>{formattedDate}</Text>
        ) : (
          <View style={[cxs.row, cxs.alignCenter]}>
            {teamImg ? (
              <FastImage
                style={[cxs.w17, cxs.h17]}
                source={{ uri: teamImg || null }}
              />
            ) : null}
            <Text style={[teamImg ? cxs.ml10 : '', st.itemDate]}>
              {formattedDate}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
})

const st = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'black',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  scoreTeamContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainImageStyle: { width: deviceWidth, height: (deviceWidth * 9) / 16 },
  squareImageStyle: { width: deviceWidth, height: deviceWidth },
  score: { fontSize: 18, fontWeight: '600' },
  teamLogoContainer: { flexDirection: 'row', alignItems: 'center' },
  fullSizeItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 15,
    marginVertical: 7,
  },
  itemImage: {
    width: 151,
    height: 84,
  },
  itemTextContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 11,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    color: Colors.textBlack,
  },
  itemDate: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.textGray,
  },
})

export default VerticalListItem
