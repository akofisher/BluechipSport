import userLike from "assets/icons/userLike.png";
import userdisLike from "assets/icons/userdisLike.png";
import { Spinner, Text } from "components/common";
import Avatar from "components/common/Avatar";
import i18next from "i18next";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome";
import { CancelSource, API } from "services";
import { useGlobalState } from "stores";

const UserProfileScreen = () => {
  const { Refresh, myRefresh } = useGlobalState();

  const [comentsData, setCommentsData] = useState();
  const [loading, setLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);

  const source = CancelSource();

  useEffect(() => {
    API.getUserComments({
      cancelToken: source.token,
    })
      .then((response) => {
        setCommentsData(response.data.data);
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  }, [myRefresh]);

  const CommentsReply = ({ item, index }) => {
    return (
      <View style={Styles.userComments} key={index}>
        <View style={Styles.userInfo}>
          <View style={Styles.userImg}>
            <Avatar size={36} />
          </View>
          <View style={Styles.userNameCont}>
            <Text style={Styles.date}>{moment(item.created_at).format("MM/DD/YYYY, hh:mm")}</Text>
          </View>

          <View style={Styles.reaction}>
            <View style={[Styles.like, { borderBottomWidth: 1 }]}>
              <Image style={{ width: 15, height: 15 }} source={userLike} />
              <Text style={Styles.likeDisNum}>{item.likes}</Text>
            </View>
            <View style={Styles.like}>
              <Image style={{ width: 15, height: 15 }} source={userdisLike} />
              <Text style={Styles.likeDisNum}>{item.dislikes}</Text>
            </View>
          </View>
        </View>
        <Text style={Styles.comment}>{item.content}</Text>
      </View>
    );
  };

  const Comments = ({ item }) => {
    return (
      <View>
        <View style={Styles.textContainer}>
          <Text style={Styles.text} numberOfLines={1}>
            {i18next.t("Article")}
            <Text style={[Styles.text, { color: "#000000" }]}>{item.title}</Text>
          </Text>
        </View>
        <View style={Styles.commentsContainer}>
          {item?.comments.map((commentItem, index) => {
            return (
              <View style={Styles.userComments} key={index}>
                <View style={Styles.userInfo}>
                  <View style={Styles.userImg}>
                    <Avatar uri={commentItem?.author?.avatar} size={41} />
                  </View>
                  <View style={Styles.userNameCont}>
                    <Text style={Styles.name}>
                      {commentItem?.author.first_name
                        ? `${commentItem.author?.first_name} ${commentItem.author?.last_name}`
                        : commentItem.author?.username}
                    </Text>
                    <Text style={Styles.date}>
                      {moment(commentItem.created_at).format("MM/DD/YYYY, hh:mm")}
                    </Text>
                  </View>

                  <View style={Styles.reaction}>
                    <View style={[Styles.like]}>
                      <Image style={{ width: 15, height: 15 }} source={userLike} />
                      <Text style={Styles.likeDisNum}>{commentItem.likes}</Text>
                    </View>
                    <View style={Styles.like}>
                      <Image style={{ width: 15, height: 15 }} source={userdisLike} />
                      <Text style={Styles.likeDisNum}>{commentItem.dislikes}</Text>
                    </View>
                  </View>
                </View>
                <Text style={Styles.comment}>{commentItem.content}</Text>
                <View style={Styles.subscContainer}>
                  <Text style={Styles.subscText}>
                    {commentItem?.replies?.length} {i18next.t("Reply")}
                  </Text>
                  {commentItem?.replies?.length !== 0 && (
                    <TouchableOpacity
                      style={{ padding: 5 }}
                      onPress={() => setShowReply(!showReply)}
                    >
                      <FontAwesome5 name="angle-down" size={20} color="#858585" />
                    </TouchableOpacity>
                  )}
                </View>
                {showReply &&
                  commentItem?.replies.map((i, index) => {
                    return <CommentsReply item={i} key={index} />;
                  })}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={comentsData}
          keyExtractor={(item, index) => {
            item.id.toString();
          }}
          renderItem={(item) => <Comments item={item.item} />}
        />
      )}
    </View>
  );
};

export default UserProfileScreen;

const Styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 24,
    marginHorizontal: 24,
  },
  text: {
    color: "#949494",
    fontSize: 12,
  },
  commentsContainer: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  userComments: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
  },
  userInfo: {
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  comment: {
    margin: 15,
    fontSize: 12,
    color: "#656565",
  },
  subscContainer: {
    height: 45,
    borderTopWidth: 1,
    borderColor: "#E4E4E4",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subscText: {
    color: "#808080",
    fontSize: 12,
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
    marginBottom: 4,
  },
  date: {
    color: "#4B4B4B",
    fontSize: 10,
  },
  iconContainer: {
    width: 45,
    height: "100%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "gray",
    overflow: "hidden",
  },
  reaction: {
    width: 62,
    height: "100%",
    flex: 1 / 3,
  },
  like: {
    flexDirection: "row",
    flex: 1 / 2,
    borderColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  likeDisNum: {
    fontSize: 12,
    marginLeft: 6,
  },
});
