import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

export default function MutualMeetingsHeader({ tittle }) {
  return (
    <View>
      <Text style={Styles.text}>{tittle}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginVertical: 20,
    marginHorizontal: 20,
    color: "#424242",
  },
});
