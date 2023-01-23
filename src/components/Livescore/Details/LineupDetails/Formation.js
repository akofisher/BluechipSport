import i18next from "i18next";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

export default function Formation({ formation }) {
  return (
    <View style={Styles.formation}>
      <Text style={Styles.formationText}>
        {formation.local.map((i, index) => {
          return index + 1 == formation.local.length ? i : i + " - ";
        })}
      </Text>
      <Text style={Styles.formationText}>{i18next.t("Formation")}</Text>
      <Text style={Styles.formationText}>
        {formation.visitor.map((i, index) => {
          return index + 1 == formation.visitor.length ? i : i + " - ";
        })}
      </Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  formation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  formationText: {
    fontSize: 12,
    color: "#000000",
  },
});
