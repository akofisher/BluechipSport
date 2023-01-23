import { BallSvg, CardSvg, ArrowRedSvg, ArrowGreenSvg } from "assets/svgs/AllSvgs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LocalTeamStatistic({ localCard, localGoal, localSubstitutions, time }) {
  return (
    <View>
      {localCard.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <CardSvg style={Styles.card} />
                <Text style={Styles.localPlayer}>{item.player_name}</Text>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <CardSvg style={Styles.card} />
                <Text style={Styles.localPlayer}>{item.player_name}</Text>
              </View>
            );
      })}
      {localGoal.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <BallSvg style={Styles.ballIcon} />
                <Text style={Styles.localPlayer}>{item.player_name}</Text>
                <Text style={Styles.localPlayerAsist}>{item.player_assist_name}</Text>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <BallSvg style={Styles.ballIcon} />
                <Text style={Styles.localPlayer}>{item.player_name}</Text>
                <Text style={Styles.localPlayerAsist}>{item.player_assist_name}</Text>
              </View>
            );
      })}

      {localSubstitutions.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <View style={Styles.svgPlayerCont}>
                  <ArrowGreenSvg />
                  <Text style={Styles.ChangePlayer}>{item.player_in_name}</Text>
                </View>
                <View style={Styles.playerSvgCont}>
                  <Text style={Styles.changedPlayer}>{item.player_out_name}</Text>
                  <ArrowRedSvg />
                </View>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.localTime}>{item.minute}'</Text>
                <View style={Styles.svgPlayerCont}>
                  <ArrowGreenSvg />
                  <Text style={Styles.ChangePlayer}>{item.player_in_name}</Text>
                </View>
                <View style={Styles.playerSvgCont}>
                  <Text style={Styles.changedPlayer}>{item.player_out_name}</Text>
                  <ArrowRedSvg />
                </View>
              </View>
            );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  commonCont: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  localTime: {
    fontSize: 13,
    width: 27,
    textAlign: "left",
  },

  localPlayer: {
    fontSize: 12,
    fontWeight: "500",
  },
  localPlayerAsist: {
    fontSize: 11,
    color: "#888888",
    marginHorizontal: 8,
  },
  card: {
    marginHorizontal: 8,
  },
  entypo: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  iconPlay: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderColor: "#E1E1E1",
  },
  ballIcon: {
    marginHorizontal: 8,
  },
  ChangePlayer: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 8,
  },
  changedPlayer: {
    fontSize: 11,
    color: "#888888",
  },
  playerSvgCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  svgPlayerCont: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10.5,
  },
});
