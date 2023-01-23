import i18next from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

import Feather from "react-native-vector-icons/dist/Feather";

Feather.loadFont();

export default function League() {
  return (
    <View style={Styles.leagueCont}>
      <Text style={Styles.league}>{i18next.t("PremierLeague")}</Text>
      <Feather name="chevron-down" style={Styles.feather} />
    </View>
  );
}

const Styles = StyleSheet.create({
  feather: {
    color: "#ADADAD",
    fontSize: 24,
  },
  leagueCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 23,
    marginVertical: 25,
    alignItems: "center",
  },
  league: {
    color: "#424242",
    fontSize: 15,
  },
});
