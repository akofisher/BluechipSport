import i18next from "i18next";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

import AccuracyOfShots from "./AccuracyOfShots";
import HomeStatistics from "./HomeStatistics";

export default function PlayerStatisticCard({ playerStats }) {
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 28 }}>
        <View style={Styles.playersCont}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FastImage
              style={Styles.playerImage}
              source={{ uri: playerStats.image_path }}
              resizeMode="contain"
            />
            <View style={Styles.playerNameTeamNameCont}>
              <Text style={Styles.playerName}>{playerStats.player_name}</Text>
              {playerStats.position === "M" && (
                <Text style={Styles.teamName}>{i18next.t("Midfielder")}</Text>
              )}
              {playerStats.position === "A" && (
                <Text style={Styles.teamName}>{i18next.t("Attacker")}</Text>
              )}
              {playerStats.position === "D" && (
                <Text style={Styles.teamName}>{i18next.t("Guard")}</Text>
              )}
            </View>
          </View>
          <FastImage
            style={Styles.teamImage}
            source={{
              uri: playerStats.team_logo_path,
            }}
            resizeMode="contain"
          />
        </View>
        <HomeStatistics playerStats={playerStats} />
      </View>
      <AccuracyOfShots playerStats={playerStats} />
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  contChild: {
    paddingHorizontal: 27,
  },
  playersRating: {
    fontSize: 13,
    fontWeight: "bold",
    paddingVertical: 20,
    paddingHorizontal: 27,
    textTransform: "uppercase",
  },
  playersCont: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderRadius: 10,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 5,
    marginVertical: 3,
  },
  playerImage: {
    height: 55,
    width: 54,
    borderRadius: 5,
  },
  playerName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  playerNameTeamNameCont: {
    marginLeft: 10,
  },

  teamName: {
    fontSize: 11,
    color: "#7B7B7B",
    marginTop: 4,
  },
  teamImage: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  button: {
    backgroundColor: "#F4F4F4",
    marginTop: 17,
    marginHorizontal: 27,
    marginBottom: 20,
  },
});
