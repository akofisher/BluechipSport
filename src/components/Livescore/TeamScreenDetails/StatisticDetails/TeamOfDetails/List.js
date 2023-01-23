import { Separator, Text } from "components/common";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function List({ stats, tittle, percent, bold, perc }) {
  return (
    <View style={Styles.container}>
      <View style={{}}>
        <View style={Styles.cont}>
          <Text style={[Styles.tittleText, { fontWeight: bold ? "bold" : "normal" }]}>
            {tittle}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.statsText}>{percent ? stats && stats + "%" : stats}</Text>
            {perc && <Text style={[Styles.statsText, { marginLeft: 5 }]}>({stats})</Text>}
          </View>
        </View>
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
    color: "#3E3E3E",
  },
  cont: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
});
