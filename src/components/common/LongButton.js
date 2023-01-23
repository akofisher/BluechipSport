import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableOpacity as TouchableGesture } from "react-native-gesture-handler";
const Touchable = Platform.select({
  ios: TouchableOpacity,
  android: TouchableGesture,
});

export default function LongButton({ style, onPress, textStyle, tittle }) {
  return (
    <Touchable onPress={onPress} style={[Styles.button, style]}>
      <Text style={[Styles.text, textStyle]}>{tittle}</Text>
    </Touchable>
  );
}
const Styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  text: {
    color: "#949494",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
