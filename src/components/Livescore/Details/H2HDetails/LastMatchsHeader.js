import i18next from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

export default function LocalLastMatchsHeader({ tittle }) {
  return (
    <View style={Styles.cont}>
      <Text style={Styles.lastMatch}>{i18next.t("LastMatches")}</Text>

      <Text style={Styles.titl}>{tittle}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  lastMatch: {
    fontSize: 12,
    color: "#888888",
  },
  titl: {
    fontSize: 12,
    marginHorizontal: 4,
  },
});
