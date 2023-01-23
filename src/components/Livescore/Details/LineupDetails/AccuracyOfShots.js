import i18next from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

import PlayerListStats from "./PlayerListStats";

export default function AccuracyOfShots({ playerStats }) {
  return (
    <View>
      <Text style={Styles.shots}>{i18next.t("AccuracyOfShots")}</Text>
      <View style={Styles.stadium}>
        <Text style={[Styles.text, { position: "absolute", top: 35 }]}>
          {i18next.t("BehindTheDoor")}
        </Text>
        <View style={Styles.door}>
          <Text style={Styles.text}>{i18next.t("directionDoor")}</Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: -4,
              marginLeft: 2,
            }}
          >
            {playerStats.stats.shots.shots_on_goal}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 28 }}>
        <PlayerListStats
          tittle={i18next.t("TotalDarts")}
          stats={playerStats.stats.shots.shots_total}
        />
        <PlayerListStats
          tittle={i18next.t("BeatsOnThePole")}
          stats={playerStats.stats.shots.shots_on_goal}
        />
      </View>

      <View style={Styles.passCont}>
        <Text style={Styles.passStats}>{i18next.t("PassStatistics")}</Text>
        <PlayerListStats tittle={i18next.t("Pass")} stats={playerStats.stats.passing.passes} />
        {playerStats !== null && (
          <PlayerListStats
            percent
            tittle={i18next.t("AccuracyOfPasses")}
            stats={playerStats.stats.passing.passes_accuracy}
          />
        )}

        <PlayerListStats
          tittle={i18next.t("Shot")}
          stats={playerStats.stats.passing.total_crosses}
        />
        <PlayerListStats
          tittle={i18next.t("AccurateShooting")}
          stats={playerStats.stats.passing.crosses_accuracy}
        />
        <PlayerListStats
          tittle={i18next.t("KeyPass")}
          stats={playerStats.stats.passing.key_passes}
        />
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  shots: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  stadium: {
    height: 160,
    backgroundColor: "#47B652",
    alignItems: "center",
    marginVertical: 25,
  },
  door: {
    flexDirection: "row",
    borderWidth: 5,
    borderColor: "white",
    width: 250,
    height: 80,
    marginTop: 85,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  passStats: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  passCont: {
    paddingHorizontal: 28,
    paddingTop: 45,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
});
