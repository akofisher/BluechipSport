import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

export default function StartingLineupText({ title }) {
  return (
    <View style={Styles.titleCont}>
      <Text style={Styles.startingLineupText}>{title}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  startingLineupText: {
    fontSize: 12,
    color: "#000000",
  },
  titleCont: {
    padding: 20,
    alignItems: "center",
  },
});
