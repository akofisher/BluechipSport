import { Separator, Text } from "components/common";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

const LeaguesItem = ({ item, navigation, bus, index, screenName }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => {
          if (screenName === "searchScreen") {
            navigation.navigate("LeagueDrawer", {
              leagueId: item?.league_id,
              seasonID: item?.current_season_id,
            });
          } else {
            navigation.navigate("LeagueNews", {
              leagueId: item?.league_id,
              seasonID: item?.current_season_id,
            });
          }
        }}
      >
        <FastImage
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
          source={{ uri: item?.icon }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.newsTitle}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
      {bus.length - 1 !== index && <Separator />}
    </View>
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

export default LeaguesItem;
