import { Separator, Text } from "components/common";
import moment from "moment";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { storageURL } from "services/endpoints";

const NewsItems = ({ item, navigation, bus, index, screenName }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewsDetails", {
            title: item.title,
            articleId: item.id,
            mainVideoUrl: item?.mainVideoUrl,
          });
        }}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <FastImage
            style={{ width: 80, height: 80 }}
            source={{
              uri: `${storageURL}/size/timthumb.php?src=/uploads/posts/${item.main_gallery_item?.filename}&w=450`,
            }}
          />
          <View style={styles.textContainer}>
            <Text ellipsizeMode="tail" numberOfLines={3} style={styles.newsTitle}>
              {item?.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.category}>{item?.categories[0]?.title}</Text>
              <Text style={styles.date}>
                {moment(item?.categories[0]?.created_at).format("hh:mm a")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {bus.length - 1 !== index && <Separator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  newsTitle: {
    fontSize: 13,
    color: "#3E3E3E",
  },
  category: {
    color: "#47B652",
    marginRight: 15,
    fontSize: 11,
  },
  date: {
    color: "#888888",
    fontSize: 11,
  },
});

export default NewsItems;
