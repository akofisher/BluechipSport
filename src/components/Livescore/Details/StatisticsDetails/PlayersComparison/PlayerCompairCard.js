import React from "react";
import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export default function PlayerCompairCard({ player }) {
  if (player) {
    return (
      <View style={Styles.contChild}>
        <View style={Styles.imageRatingCont}>
          <FastImage
            style={Styles.playerImage}
            source={{
              uri: player.image_path,
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{player.stats.rating}</Text>
        </View>
        <Text style={Styles.text}>{player.player_name} </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FastImage
            style={Styles.teamImage}
            source={{
              uri: player.team_logo_path,
            }}
          />
          <Text style={Styles.teamName}>{player.team_name}</Text>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
}

const Styles = StyleSheet.create({
  contChild: {
    backgroundColor: "#F4F4F4",
    width: "47%",
    height: 120,
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 12,
  },
  choosePlayers: {
    borderRadius: 30,
    marginHorizontal: 27,
    backgroundColor: "#E53C48",
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 30,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  playerImage: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },

  imageRatingCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamImage: {
    width: 20,
    height: 20,
  },
  teamName: {
    fontSize: 10,
    color: "#7C7C7C",
    marginLeft: 5,
  },
});
