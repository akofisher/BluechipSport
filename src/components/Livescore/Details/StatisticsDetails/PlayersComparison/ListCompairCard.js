import { Separator, Text } from "components/common";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ListCompairCard({ tittle, left, right, percent }) {
  if (left) {
    return (
      <View>
        <View style={Styles.cont}>
          <Text style={[Styles.textLeftRight, { color: left > right ? "#E53C48" : "#000000" }]}>
            {percent ? left + "%" : left}
          </Text>
          <Text style={Styles.titl}>{tittle}</Text>
          <Text style={[Styles.textLeftRight, { color: right > left ? "#E53C48" : "#000000" }]}>
            {percent ? right + "%" : right}
          </Text>
        </View>
        <Separator />
      </View>
    );
  } else {
    return <View />;
  }
}

const Styles = StyleSheet.create({
  textLeftRight: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titl: {
    fontSize: 12,
    color: "#747474",
  },
  cont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
});
