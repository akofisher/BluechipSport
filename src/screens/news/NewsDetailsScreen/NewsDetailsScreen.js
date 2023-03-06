import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { View, StyleSheet, Share, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import { API } from 'services'
import { Colors, cxs } from 'styles'
import { storageURL } from 'services/endpoints'
import { Icon, Text, VideoPlayer } from '../../../components/common'
import { Poll } from '../../../components/news'
import { Header } from '../../../components/header'
import Spinner from '../../../components/common/Spinner'
import Quiz from '../../../components/news/Quiz'
import ArticleContent from '../../../components/news/ArticleContent'
import NewsDetailsFooter from './components/NewsDetailsFooter'
import Button from '../../../components/common/Button'
import i18next from 'i18next'
import { useGlobalState } from '../../../stores'

const LINK_PREFIX = ''

const keyExtractor = (item, index) => {
  return item?.id + index.toString() + Math.random() * 100
}

export const NewsDetailsScreen = ({ route, navigation }) => {
  const { articleId } = route.params
  const [id, setId] = useState()
  const [load, setLoad] = useState(false)
  const { Refresh, myRefresh } = useGlobalState();

  const [state, setState] = useState({
    article: null,
    id: null,
    comentCount: null,
  })
  const imageURI = `${storageURL}/size/timthumb.php?src=/uploads/posts/${state?.article?.img}&w=450`

  const goToLeagueOrTeamScreen = (item, TeamName) => {
    if (item.type === 'league') {
      navigation.navigate('Leaguee', { rame: true, leagueId: item.id })
    } else if (item.type === 'team') {
      navigation.push('teamScore', {
        TeamId: item.id,
        TeamName,
        teamLogo: item.image,
      })
    }
  }

  useEffect(() => {
    setLoad(true)
    const req = API.getArticle({ kwds: { id: articleId } })
      .then(({ data }) => {
        const articles = {
          id: data.id.toString(),
          title: data.title.replace(/<br.*?>/gi, '\n').replace(/\\/g, ''),
          content: data.content
            .replace(/\\/g, '')
            .replace(/\/news\//g, LINK_PREFIX),
          img: data.main_gallery_item.filename_webp,
          categories: data.categories,
          date: data.created_at,
          shareLink: data.share_link,
          tagged: data.tagged,
          video: data.main_video_url,
          hasEmbed: data.has_embed,
          plainContent: data.plain_content,
          poll: data.poll,
          quiz: data.quiz,
        }

        setState({
          article: articles,
          comentCount: data.comments_count,
          linkedNews: data.linked_news,
        })

        setLoad(false)
      })
      .catch((error) => {
        console.warn(error)
      })

    return req.cancelRequest
  }, [id, myRefresh])

  const onShare = async () => {
    try {
      await Share.share({
        // message: 'React Native | A framework for building native apps using React',
        url: state.article.shareLink,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const navigateToComments = useCallback(
    () =>
      navigation.navigate('NewsComments', {
        articleId,
      }),
    [articleId, navigation],
  )

  const headerRightAction = useMemo(
    () => ({
      onPress: onShare,
      iconName: 'Share',
    }),
    [onShare],
  )

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: 'ArrowRight',
    }),
    [navigation.goBack],
  )

  return (
    <View style={cxs.flex}>
      <Header leftAction={headerLeftAction} rightAction={headerRightAction} />
      {!state.article || load == true ? (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      ) : (
        <ScrollView>
          {/* <SectionList
            sections={state.article}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => item?.renderItem(item)}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{ backgroundColor: Colors.background }}
            ListHeaderComponent={() => ( */}

          {!state?.article.quiz &&
            !state?.article.poll &&
            route.params?.mainVideoUrl ? (
            <View style={[styles.image, styles.video]}>
              <VideoPlayer
                uri={route.params.mainVideoUrl}
                style={[styles.image, styles.video]}
                posterUri={imageURI}
              />
            </View>
          ) : !state?.article.quiz && !state?.article.poll ? (
            <FastImage
              source={{
                uri: imageURI,
              }}
              style={styles.image}
            />
          ) : null}
          {state?.article.quiz ? (
            <View
              style={[
                cxs.py10,
                cxs.pb0,
                cxs.mb10,
                { backgroundColor: 'white' },
              ]}
            >
              <View style={[cxs.px20]}>
                <Quiz
                  quiz={state.article.quiz}
                  image={imageURI}
                  shareLink={state?.article.shareLink}
                />
              </View>
            </View>
          ) : state?.article.poll ? (
            <View
              style={[
                cxs.py10,
                cxs.pb0,
                cxs.mb10,
                { backgroundColor: 'white' },
              ]}
            >
              <View style={[cxs.px20]}>
                <Poll poll={state.article.poll} />
              </View>
            </View>
          ) : (
            <ArticleContent
              onShouldStartLoadWithRequest={(event) => {
                const linkedNews = state?.linkedNews

                for (let i = 0; i < linkedNews?.length; i++) {
                  linkedNews[i].link ===
                    event.url.replace(LINK_PREFIX, '/news/') &&
                    navigation.push('NewsDetails', {
                      title: linkedNews[i].text,
                      articleId: linkedNews[i].id,
                    })
                  setId(linkedNews[i].id)
                }
                return event.mainDocumentURL === 'about:blank'
              }}
              title={state?.article.title}
              hasEmbed={state?.article.hasEmbed}
              content={state?.article.content}
              date={state?.article.date}
              plainContent={state?.article.plainContent}
            />
          )}
          <View style={styles.commentsButton}>
            <Button
              onPress={navigateToComments}
              title={i18next.t('Comments')}
              color={'blue'}
              leftContent={<Icon iconName={'CommentWhite'} />}
              rightContent={
                <View style={styles.commentsCount}>
                  <Text style={styles.commentsCountText}>
                    {state.comentCount}
                  </Text>
                </View>
              }
              big={true}
            />
          </View>

          <NewsDetailsFooter />

        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 215,
  },
  video: {
    width: '100%',
  },
  commentsButton: {
    paddingHorizontal: 15,
  },
  commentsCount: {
    backgroundColor: Colors.blurredBlue,
    borderRadius: 5,
    padding: 3,
  },
  commentsCountText: {
    color: Colors.white,
    fontSize: 13,
  },
})