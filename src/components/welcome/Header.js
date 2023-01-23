import Constants from "expo-constants";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "styles";

const Header = React.memo(({ children }) => <View style={styles.wrapper}>{children}</View>);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    backgroundColor: Colors.darkBlue,
  },
});

export default Header;
