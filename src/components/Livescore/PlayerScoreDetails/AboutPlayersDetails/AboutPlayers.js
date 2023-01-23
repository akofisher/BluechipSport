import { Separator, Text } from "components/common";
import i18next from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function AboutPlayers({ player }) {
  return (
    <View>
      <Separator />
      <View
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <View style={Styles.cont}>
          <Text style={Styles.text}>{i18next.t("PlaceOfBirth")}</Text>
          <Text style={Styles.playerText}>{player?.nationality}</Text>
        </View>
        <Separator />
        <View style={Styles.cont}>
          <Text style={Styles.text}>{i18next.t("DateOfBirth")}</Text>
          <Text style={Styles.playerText}>{player?.data?.player.data.birthdate}</Text>
        </View>
        <Separator />
        <View style={Styles.cont}>
          <Text style={Styles.text}>{i18next.t("Height")}</Text>
          <Text style={Styles.playerText}>{player?.data?.player.data.height}</Text>
        </View>
        <Separator />
        <View style={Styles.cont}>
          <Text style={Styles.text}>{i18next.t("Weight")}</Text>
          <Text style={Styles.playerText}>{player?.data?.player.data.weight}</Text>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  text: {
    fontSize: 10,
    color: "#A5A5A5",
  },
  cont: {
    paddingVertical: 18,
    paddingLeft: 25,
  },
  playerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
});
