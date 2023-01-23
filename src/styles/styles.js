import { StyleSheet } from "react-native";

import Colors from "./colors";

const AppStyles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Jost",
    fontWeight: "500",
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  selfCenter: {
    alignSelf: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
  welcomeTextLead: {
    marginVertical: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeTextSecondary: {
    marginVertical: 5,
    fontSize: 12,
    textAlign: "center",
    color: Colors.primaryLight,
  },
});

export default AppStyles;
