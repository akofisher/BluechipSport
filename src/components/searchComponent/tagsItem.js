import { Separator, Text } from "components/common";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const TagsItems = ({ item, index, bus, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("teamScore", {
          TeamId: item.team_id,
          TeamName: item.name,
        })
      }
    >
      <View style={styles.subContainer}>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: item.logo_path,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.newsTitle}>{item?.name}</Text>
        </View>
      </View>
      {bus.length - 1 !== index && <Separator />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#F2F2F2",
  },
  subContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
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

export default TagsItems;
