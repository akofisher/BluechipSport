import { Separator, Text } from "components/common";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function AverageList({ stats, tittle, bold, secondStats }) {
  return (
    <View style={Styles.container}>
      <View>
        <View style={Styles.cont}>
          {bold ? (
            <Text style={[Styles.tittleText, { fontWeight: bold ? "bold" : "normal" }]}>
              {tittle}
            </Text>
          ) : (
            <Text
              style={[Styles.tittleText, { width: 180 }, { fontWeight: bold ? "bold" : "normal" }]}
            >
              {tittle}
            </Text>
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.statsText}>{stats}</Text>
            {secondStats && <Text style={Styles.statsText}>({secondStats})</Text>}
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
    alignItems: "center",
  },
});
