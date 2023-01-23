import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";

// FontAwesome5.loadFont();

const IconPressable = ({ onPress, style, size = 20, ...rest }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <FontAwesome size={size} {...rest} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconPressable;
