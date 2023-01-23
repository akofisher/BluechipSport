import { Separator, Text } from "components/common";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function PlayerListStats({ stats, tittle, percent }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.cont}>
        <Text style={Styles.tittleText}>{tittle}</Text>
        <Text style={Styles.statsText}>{percent ? stats && stats + "%" : stats}</Text>
      </View>
      <Separator color="#DBDBDB" />
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  tittleText: {
    color: "#3E3E3E",
    fontSize: 14,
  },
  statsText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cont: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
});
