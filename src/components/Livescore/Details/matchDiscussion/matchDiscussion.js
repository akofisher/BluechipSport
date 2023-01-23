import Comments from "components/comments/discussion/comments";
import Avatar from "components/common/Avatar";
import i18next from "i18next";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { IsCancel, CancelSource, API } from "services";
import { useGlobalState, matchCommentsId } from "stores";
import { RuntimeConsts } from "utils";

Icon.loadFont();

const MatchDiscussion = ({ matchId }) => {
  const source = CancelSource();
  const [userInfo, setUserInfo] = useState();
  const [userId, setUserId] = useState();
  const [discussion, setDiscussion] = useState("");
  const [content, setContent] = useState();
  const [replyContent, setReplyContent] = useState();
  const [Index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [bottomInput, setBottomInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { Refresh, myRefresh } = useGlobalState();
  const { MatchID, matchCommentID } = matchCommentsId();

  const inputRef = useRef(null);
  const flatlistRef = useRef();

  const onButtonClick = (index) => {
    if (userInfo) {
      setBottomInput(true);
      inputRef.current?.focus();
      setIndex(index);
    } else {
      alert(i18next.t("CommentsAlertText"));
    }
  };
  const getUser = () => {
    API.checkToken({ cancelToken: source.token, params })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => alert(error));
  };

  const params = content ? { content } : replyContent ? { content: replyContent } : {};

  const addMatchComments = () => {
    discussion != "" && flatlistRef.current.scrollToIndex({ index: 0 });

    RuntimeConsts.token != null
      ? API.addMatchComments({
          cancelToken: source.token,
          kwds: { matchID: matchId },
          params,
        })
          .then((response) => {
            setUserId(response.data.author);
            setContent("");
          })
          .catch((error) => {
            alert(error.response?.data?.content);
          })
      : alert(i18next.t("CommentsAlertText"));
  };

  // const replyParams = reply ? { content } : {};

  const addMatchReply = () => {
    // setBottomInput(false);
    API.addMatchReply({
      cancelToken: source.token,
      kwds: { articleId: 11740158, commentID: matchCommentID },
      params,
    })
      .then((response) => {
        setUserId(response.data.author);
        setReplyContent("");
      })
      .catch((error) => console.warn(error));
    setBottomInput(false);
  };
  const deleteMatchComment = (item) => {
    API.deleteMatchComment({
      kwds: { matchID: item.match_id, commentID: item.id },
    })
      .then((response) => {
        // setUserId(response.data.author);
        // setDiscussion([...discussion, response.data]);
        setRefresh(!refresh);
      })
      .catch((error) => console.warn(error));
  };
  const onDisLike = (item) => {
    if (userInfo) {
      API.addMatchCommentDisLike({ kwds: { commentID: item.id } })
        .then((response) => {
          setRefresh(!refresh);
        })
        .catch((error) => console.warn(error));
    } else {
      alert(i18next.t("CommentsAlertText"));
    }
  };
  const onLike = (item) => {
    if (userInfo) {
      API.addMatchCommentLike({ kwds: { commentID: item.id } }).then((response) => {
        setRefresh(!refresh);
      });
    } else {
      alert(i18next.t("CommentsAlertText"));
    }
  };

  useEffect(() => {
    RuntimeConsts.token != null && getUser();

    const req = API.all([API.getMatchDiscussion({ kwds: { matchID: matchId } })])
      .then((responses) => {
        const [discussionsResponse] = responses;
        setDiscussion(discussionsResponse.data);
      })
      .catch((error) => {
        IsCancel(error);
      });
    return req.cancelRequest;
  }, [matchId, userId, refresh, myRefresh]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[Styles.container, { paddingBottom: bottomInput ? 70 : 0 }]}
    >
      <View style={[Styles.container, { paddingBottom: bottomInput ? 70 : 0 }]}>
        <View style={Styles.CommInputContainer}>
          <View style={Styles.userPic}>
            <Avatar size={41} uri={userInfo?.avatar} />
          </View>

          <TextInput
            style={Styles.commentInput}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholder={i18next.t("WriteComment")}
            returnKeyType="done"
            onSubmitEditing={addMatchComments}
          />
          <TouchableOpacity onPress={addMatchComments} style={{ padding: 5, marginRight: 10 }}>
            <Icon name="send-o" size={30} color="#A9A9A9" />
          </TouchableOpacity>
        </View>
        {bottomInput && (
          <View style={[Styles.CommInputContainer, { position: "absolute", bottom: 0 }]}>
            <View style={Styles.userPic}>
              <Avatar size={41} uri={userInfo?.avatar} />
            </View>

            <TextInput
              style={Styles.commentInput}
              ref={inputRef}
              value={replyContent}
              onChangeText={(text) => {
                setReplyContent(text);
              }}
              placeholder={i18next.t("WriteComment")}
              returnKeyType="done"
              onSubmitEditing={addMatchReply}
              onFocus={() => {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: Index,
                });
              }}
            />
            <TouchableOpacity onPress={addMatchReply} style={{ padding: 5, marginRight: 10 }}>
              <Icon name="send-o" size={30} color="#A9A9A9" />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          style={Styles.boxContainer}
          extraData={discussion}
          data={discussion}
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
                onDisLike(item);
              }}
              onLike={() => {
                onLike(item);
              }}
              deleteComment={() => {
                deleteMatchComment(item);
              }}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MatchDiscussion;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    flex: 1,
  },
  boxContainer: {},

  CommInputContainer: {
    zIndex: 100,
    width: "100%",
    backgroundColor: "#ffffff",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#E5E5E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 3,
  },
  commentInput: {
    flex: 1,
    height: 40,
    paddingLeft: 13,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#ECECEC",
    borderColor: "#DDDDDD",
    marginHorizontal: 15,
  },
  userPic: {
    width: 41,
    height: 41,
    borderRadius: 20,
    marginLeft: 20,
    overflow: "hidden",
  },
});
