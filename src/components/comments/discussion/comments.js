import like from "assets/icons/likeGreen.png";
import disLike from "assets/icons/likeRed.png";
import replay from "assets/icons/replay.png";
import Avatar from "components/common/Avatar";
import i18next from "i18next";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/dist/AntDesign";
import { CancelSource, API } from "services";
import { useGlobalState, matchCommentsId } from "stores";

import CommentsReply from "./commentsReply";

Icon.loadFont();

const Comments = ({
  item,
  itemId,
  onPress,
  userInfo,
  userId,
  onDisLike,
  onLike,
  deleteComment,
}) => {
  const [replyInput, setReplyInput] = useState();
  const [reply, setReply] = useState();
  const [editInputValue, setEditInputValue] = useState(item.content);
  const [editVisible, setEditVisible] = useState(false);

  const source = CancelSource();

  const { Refresh, myRefresh } = useGlobalState();
  const { MatchID, matchCommentID } = matchCommentsId();

  const params = editInputValue ? { content: editInputValue } : {};

  const editComment = () => {
    API.editMatchComment({
      cancelToken: source.token,
      kwds: { matchID: item.match_id, commentID: item.id },
      params,
    })
      .then((response) => {
        Refresh(!myRefresh);
      })
      .catch((error) => console.warn(error));
    setEditVisible(false);
  };

  const onReplyDisLike = (i) => {
    if (userInfo) {
      API.addMatchReplyDisike({ kwds: { commentID: i.id } })
        .then((response) => {
          Refresh(!myRefresh);
        })
        .catch((error) => console.warn(error));
    } else {
      alert(i18next.t("CommentsAlertText"));
    }
  };
  const onReplyLike = (i) => {
    if (userInfo) {
      API.addMatchReplyLike({ kwds: { commentID: i.id } }).then((response) => {
        Refresh(!myRefresh);
      });
    } else {
      alert(i18next.t("CommentsAlertText"));
    }
  };
  const deleteReplyComment = (i) => {
    API.deleteMatchReplyComment({
      kwds: {
        matchID: item.article_id,
        commentID: item.id,
        replCommentID: i.id,
      },
    })
      .then((response) => {
        Refresh(!myRefresh);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <View style={Styles.commentsContainer}>
      <View style={Styles.userInfo}>
        <View style={Styles.userImg}>
          <Avatar uri={item.author.avatar} size={41} />
        </View>
        <View style={Styles.userNameCont}>
          <Text style={Styles.name}>
            {item?.author.first_name
              ? `${item.author?.first_name} ${item.author?.last_name}`
              : item.author?.username}
          </Text>
          <Text style={Styles.date}>{moment(item.created_at).format("MM/DD/YYYY, hh:mm")}</Text>
        </View>
        <View style={Styles.reaction}>
          <TouchableOpacity style={Styles.like} onPress={onDisLike}>
            <Image style={{ width: 15, height: 15 }} source={disLike} />
            <Text style={Styles.likeDisNum}>{item.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.like} onPress={onLike}>
            <Image style={{ width: 15, height: 15 }} source={like} />
            <Text style={Styles.likeDisNum}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {editVisible ? (
        <>
          <TextInput
            style={Styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline
            value={editInputValue}
            onChangeText={(text) => {
              setEditInputValue(text);
            }}
          />
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setEditVisible(false);
                setEditInputValue(item.content);
              }}
            >
              <Text style={[Styles.subscText, { padding: 5, fontSize: 14, fontWeight: "bold" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editComment}>
              <Text style={[Styles.subscText, { padding: 5, fontSize: 14, fontWeight: "bold" }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={Styles.comment}>{item.content}</Text>
      )}
      {replyInput === itemId && (
        <View>
          {item?.replies.map((i, index) => {
            return (
              <>
                <CommentsReply
                  item={i}
                  key={index}
                  userId={userId}
                  userInfo={userInfo}
                  onReplyLike={() => onReplyLike(i)}
                  onReplyDisLike={() => onReplyDisLike(i)}
                  deleteReplyComment={() => deleteReplyComment(i)}
                  matchID={i.match_id}
                />
              </>
            );
          })}
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          marginHorizontal: 16,
        }}
      >
        <TouchableOpacity
          style={Styles.subscContainer}
          onPress={() => {
            onPress();
            setReplyInput(item.id);
            MatchID(item.id);
          }}
        >
          <View style={{ padding: 5 }}>
            <Image style={{ width: 24, height: 15 }} source={replay} />
          </View>

          <Text style={Styles.subscText}>{i18next.t("Reply")}</Text>
        </TouchableOpacity>
        <View style={Styles.icons}>
          <TouchableOpacity
            style={Styles.subscContainer}
            onPress={() => {
              setReplyInput(item.id);
              setReply("");
              MatchID(item.id);
            }}
          >
            <Text style={Styles.subscText}>{i18next.t("Comments")}</Text>
          </TouchableOpacity>
          {item?.author.id === (userInfo?.id || userId) && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setEditVisible(true);
                }}
              >
                <Icon name="edit" size={20} color="#A9A9A9" style={Styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteComment}>
                <Icon name="delete" size={20} color="#A9A9A9" style={Styles.icon} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  commentsContainer: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    //   backgroundColor: 'pink',
    paddingVertical: 22,
    // paddingHorizontal: 18,
    marginHorizontal: 15,
    marginTop: 26,
  },
  userComments: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 5,
  },
  userInfo: {
    height: 60,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  comment: {
    margin: 15,
    fontSize: 14,
    color: "#000000",
    paddingHorizontal: 11,
  },
  subscContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  subscText: {
    color: "#8E8E8E",
    fontSize: 12,
    marginRight: 20,
  },
  userImg: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    margin: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  userNameCont: {
    flexDirection: "column",
    flex: 1,
  },
  name: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#4B4B4B",
    fontSize: 10,
  },
  reaction: {
    height: "100%",
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
    borderColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    padding: 5,
  },
  likeDisNum: {
    fontSize: 12,
    marginLeft: 6,
  },
  replyContainer: {
    height: 70,
    width: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#EAEAEA",
  },
  replyInput: {
    height: 40,
    marginLeft: 75,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 18,
  },
  CommInputContainer: {
    position: "absolute",
    bottom: 0,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "pink",
    marginLeft: 20,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
    padding: 5,
  },
  textArea: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
    padding: 11,
    borderRadius: 15,
    justifyContent: "flex-start",
    margin: 15,
    color: "#4B4B4B",
  },
});

export default Comments;
