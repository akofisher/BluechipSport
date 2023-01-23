import {
  PlayedTimeSvg,
  PlayerStatsBall,
  AsistSvg,
  RedCardSvg,
  YallCardSvg,
} from "assets/svgs/AllSvgs";
import i18next from "i18next";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatsComponent({
  player,
  scorers,
  title,
  goal,
  playedTime,
  assist,
  yellowCard,
  redCard,
}) {
  return (
    <View style={Styles.greyCont}>
      <View style={Styles.svgAndTextCont}>
        {playedTime && <PlayedTimeSvg />}
        {goal && <PlayerStatsBall />}
        {assist && <AsistSvg />}
        {yellowCard && <YallCardSvg />}
        {redCard && <RedCardSvg />}

        <Text
          style={[
            Styles.tittleText,
            {
              marginLeft: goal || playedTime || assist || yellowCard || redCard ? 10 : 0,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.text}>{scorers}</Text>
        {playedTime && <Text style={[Styles.text, { marginLeft: 5 }]}>{i18next.t("Minute")}</Text>}
        {goal && <Text style={[Styles.text, { marginLeft: 5 }]}>{i18next.t("Goal")}</Text>}
        {assist && <Text style={[Styles.text, { marginLeft: 5 }]}>{i18next.t("Transfer")}</Text>}
        {yellowCard && <Text style={[Styles.text, { marginLeft: 5 }]}>{i18next.t("Card")}</Text>}
        {redCard && <Text style={[Styles.text, { marginLeft: 5 }]}>{i18next.t("Card")}</Text>}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  greyCont: {
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginHorizontal: 25,
    marginBottom: 5,
  },
  svgAndTextCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  tittleText: {
    marginLeft: 10,
    color: "#8E8E8E",
    fontSize: 11,
  },
  text: {
    fontSize: 11,
    color: "#E53C48",
    fontWeight: "bold",
  },
});
