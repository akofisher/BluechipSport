import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { cxs } from "styles";
import FastImage from "react-native-fast-image";

const TeamListItem = React.memo(({ imageURI, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.floating, styles.shadow]}>
      <FastImage style={[cxs.w25, cxs.h25]} source={{ uri: imageURI }} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  floating: {
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default TeamListItem;
