import i18next from 'i18next'
import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { CancelSource, API } from 'services'
import { useGlobalState, newsCommentId } from 'stores'
import { RuntimeConsts } from 'utils'
import { Avatar } from '../../components/common'
import Comments from '../../components/comments/discussion/comments'
import { BackButton, Header, Title } from '../../components/header'

Icon.loadFont()

const NewsCommentsScreen = ({ route }) => {
  const [comments, setComments] = useState('')
  const [content, setContent] = useState()
  const [replyContent, setReplyContent] = useState()
  const [userInfo, setUserInfo] = useState()
  const [userId, setUserId] = useState()
  const [Index, setIndex] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [bottomInput, setBottomInput] = useState(false)
  const source = CancelSource()
  const { Refresh, myRefresh } = useGlobalState()
  const { CommentID, newsCommentID } = newsCommentId()

  const { articleId } = route.params

  const inputRef = useRef(null)
  const flatlistRef = useRef()

  const onButtonClick = (index) => {
    if (userInfo) {
      setBottomInput(true)
      inputRef.current?.focus()
      setIndex(index)
    } else {
      alert(i18next.t('CommentsAlertText'))
    }
  }

  const getUser = () => {
    API.checkToken({ cancelToken: source.token, params })
      .then((response) => {
        setUserInfo(response.data)
      })
      .catch((error) => alert(error))
  }

  const params = content
    ? { content }
    : replyContent
    ? { content: replyContent }
    : {}

  const addNewComment = () => {
    comments != '' && flatlistRef.current.scrollToIndex({ index: 0 })

    RuntimeConsts.token != null
      ? API.addNewsComment({
          cancelToken: source.token,
          kwds: { articleId },
          params,
        })
          .then((response) => {
            setUserId(response.data.author)
            setContent('')
          })
          .catch((error) => console.warn(error))
      : alert(i18next.t('CommentsAlertText'))
  }

  const addNewsReply = () => {
    API.addNewsReply({
      cancelToken: source.token,
      kwds: { articleId, commentID: newsCommentID },
      params,
    })
      .then((response) => {
        setUserId(response.data.author)
        setReplyContent('')
      })
      .catch((error) => console.warn(error))
    setBottomInput(false)
  }

  const deleteNewsComment = (item) => {
    API.deleteNewsComment({
      kwds: { articleId: item.article_id, commentID: item.id },
    })
      .then((response) => {
        setRefresh(!refresh)
      })
      .catch((error) => console.warn(error))
  }

  const onDisLike = (item) => {
    if (userInfo) {
      API.addNewsCommentDisLike({ kwds: { commentID: item.id } })
        .then((response) => {
          setRefresh(!refresh)
        })
        .catch((error) => console.warn(error))
    } else {
      alert(i18next.t('CommentsAlertText'))
    }
  }
  const onLike = (item) => {
    if (userInfo) {
      API.addNewsCommentLike({ kwds: { commentID: item.id } }).then(
        (response) => {
          setRefresh(!refresh)
        },
      )
    } else {
      alert(i18next.t('CommentsAlertText'))
    }
  }

  useEffect(() => {
    RuntimeConsts.token != null && getUser()

    API.getNewsComments({ kwds: { articleId } })
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => console.warn(error))
  }, [articleId, userId, refresh, myRefresh])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={[Styles.container, { paddingBottom: bottomInput ? 70 : 0 }]}
    >
      <View style={[Styles.container, { paddingBottom: bottomInput ? 70 : 0 }]}>
        <Header>
          <BackButton />
          <Title title={i18next.t('Comments')} />
        </Header>

        <View style={Styles.CommInputContainer}>
          <View style={Styles.userPic}>
            <Avatar size={40} uri={userInfo?.avatar} />
          </View>
          <TextInput
            style={Styles.commentInput}
            value={content}
            onChangeText={(text) => {
              setContent(text)
            }}
            placeholder={i18next.t('WriteComment')}
            returnKeyType="done"
            onSubmitEditing={addNewComment}
          />

          <TouchableOpacity
            onPress={addNewComment}
            style={{ padding: 5, marginRight: 10 }}
          >
            <Icon name="send-o" size={30} color="#A9A9A9" />
          </TouchableOpacity>
        </View>
        {bottomInput && (
          <View
            style={[
              Styles.CommInputContainer,
              { position: 'absolute', bottom: 0 },
            ]}
          >
            <View style={Styles.userPic}>
              <Avatar size={40} uri={userInfo?.avatar} />
            </View>

            <TextInput
              style={Styles.commentInput}
              ref={inputRef}
              value={replyContent}
              onChangeText={(text) => {
                setReplyContent(text)
              }}
              placeholder={i18next.t('WriteComment')}
              returnKeyType="done"
              onSubmitEditing={addNewsReply}
              onFocus={() => {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: Index,
                })
              }}
            />
            <TouchableOpacity
              onPress={addNewsReply}
              style={{ padding: 5, marginRight: 10 }}
            >
              <Icon name="send-o" size={30} color="#A9A9A9" />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          style={Styles.boxContainer}
          extraData={comments}
          data={comments}
          ref={flatlistRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Comments
              item={item}
              itemId={item.id}
              onPress={() => onButtonClick(index)}
              userInfo={userInfo}
              userId={userId}
              onDisLike={() => {
                onDisLike(item)
              }}
              onLike={() => {
                onLike(item)
              }}
              deleteComment={() => {
                deleteNewsComment(item)
              }}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default NewsCommentsScreen

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },

  CommInputContainer: {
    zIndex: 100,
    width: '100%',
    backgroundColor: '#ffffff',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 40,
    paddingLeft: 13,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#ECECEC',
    borderColor: '#DDDDDD',
    marginHorizontal: 15,
  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    overflow: 'hidden',
  },
})
