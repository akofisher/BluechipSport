import React from "react";
import { View, Text } from "react-native";

export default function Position({ tittle }) {
  return (
    <View style={{ marginHorizontal: 23, marginVertical: 25 }}>
      <Text style={{ fontSize: 12, color: "#818181" }}>{tittle}</Text>
    </View>
  );
}
