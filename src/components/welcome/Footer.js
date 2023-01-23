import React from "react";
import { View, StyleSheet } from "react-native";

const Footer = ({ style, children }) => <View style={[styles.wrapper, style]}>{children}</View>;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    paddingBottom: 0,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Footer;
