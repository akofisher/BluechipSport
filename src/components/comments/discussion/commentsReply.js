import like from "assets/icons/likeGreen.png";
import disLike from "assets/icons/likeRed.png";
import Avatar from "components/common/Avatar";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/dist/AntDesign";
import { IsCancel, CancelSource, API } from "services";
import { useGlobalState } from "stores";

Icon.loadFont();

const CommentsReply = ({
  key,
  item,
  userInfo,
  userId,
  onReplyLike,
  onReplyDisLike,
  deleteReplyComment,
  matchID,
}) => {
  const [editInputValue, setEditInputValue] = useState(item.content);
  const [editVisible, setEditVisible] = useState(false);
  const source = CancelSource();

  const { Refresh, myRefresh } = useGlobalState();

  const params = editInputValue ? { content: editInputValue } : {};

  const editComment = () => {
    API.editMatchReplyComment({
      cancelToken: source.token,
      kwds: { matchID, commentID: item.comment_id, replCommentID: item.id },
      params,
    })
      .then((response) => {
        Refresh(!myRefresh);
      })
      .catch((error) => console.warn(error));
    setEditVisible(false);
  };

  return (
    <View style={{ backgroundColor: "white", marginVertical: 20 }} key={key}>
      <View style={Styles.userInfo}>
        <View style={Styles.userImg}>
          <Avatar uri={item.author.avatar} size={35} />
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
          <TouchableOpacity style={Styles.like} disabled={!userInfo} onPress={onReplyDisLike}>
            <Image style={{ width: 15, height: 15 }} source={disLike} />
            <Text style={Styles.likeDisNum}>{item.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.like} disabled={!userInfo} onPress={onReplyLike}>
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
      {item?.author.id === (userInfo?.id || userId) && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setEditVisible(true);
            }}
          >
            <Icon name="edit" size={20} color="#A9A9A9" style={Styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteReplyComment}>
            <Icon name="delete" size={20} color="#A9A9A9" style={Styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  commentsContainer: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    paddingVertical: 22,
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
    width: 180,
    paddingHorizontal: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  subscText: {
    color: "#8E8E8E",
    fontSize: 12,
  },
  userImg: {
    width: 35,
    height: 35,
    borderRadius: 20.5,
    margin: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  userNameCont: {
    flexDirection: "column",
    flex: 1,
  },
  name: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
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
    marginLeft: 20,
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

export default CommentsReply;
