import { BallSvg, CardSvg, ArrowGreenSvg, ArrowRedSvg } from "assets/svgs/AllSvgs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VisitorTeamStatistic({
  visitorCard,
  visitorGoal,
  visitorSubstitutions,
  time,
}) {
  return (
    <View style={{ marginBottom: 13 }}>
      {visitorGoal.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.VisitorPlayerAsist}>{item.player_assist_name}</Text>
                <Text style={Styles.VisitorPlayer}>{item.player_name}</Text>
                <BallSvg style={Styles.ballIcon} />
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.VisitorPlayerAsist}>{item.player_assist_name}</Text>
                <Text style={Styles.VisitorPlayer}>{item.player_name}</Text>
                <BallSvg style={Styles.ballIcon} />
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
              </View>
            );
      })}
      {visitorCard.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.VisitorPlayer}>{item.player_name}</Text>
                <CardSvg style={Styles.card} />
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <Text style={Styles.VisitorPlayer}>{item.player_name}</Text>
                <CardSvg style={Styles.card} />
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
              </View>
            );
      })}

      {visitorSubstitutions.map((item, index) => {
        return time
          ? item.minute > 45 && (
              <View style={Styles.commonCont} key={index}>
                <View style={Styles.outCont}>
                  <Text style={Styles.changedPlayer}>{item.player_out_name}</Text>
                  <ArrowRedSvg />
                </View>
                <View style={Styles.inCont}>
                  <Text style={Styles.ChangePlayer}>{item.player_in_name}</Text>
                  <ArrowGreenSvg style={{ marginLeft: 8 }} />
                </View>
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
              </View>
            )
          : item.minute <= 45 && (
              <View style={Styles.commonCont} key={index}>
                <View style={Styles.outCont}>
                  <Text style={Styles.changedPlayer}>{item.player_out_name}</Text>
                  <ArrowRedSvg />
                </View>
                <View style={Styles.inCont}>
                  <Text style={Styles.ChangePlayer}>{item.player_in_name}</Text>
                  <ArrowGreenSvg style={{ marginLeft: 8 }} />
                </View>
                <Text style={Styles.VisitorTime}>{item.minute}'</Text>
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
    justifyContent: "flex-end",
  },
  VisitorTime: {
    fontSize: 13,
    width: 27,
    textAlign: "right",
  },
  VisitorBallIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 8,
  },
  VisitorPlayer: {
    fontSize: 12,
    fontWeight: "500",
  },
  VisitorPlayerAsist: {
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
  },
  changedPlayer: {
    fontSize: 11,
    color: "#888888",
  },
  outCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  inCont: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10.5,
  },
});
