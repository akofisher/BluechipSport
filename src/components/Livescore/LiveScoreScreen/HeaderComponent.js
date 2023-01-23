import React from "react";
import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export default function HeaderComponent({ country, ligueName, icon }) {
  return (
    <View style={Styles.premierLeagueContrainer}>
      <View style={Styles.premierLeague}>
        <FastImage
          style={Styles.premierLeagueIcon}
          source={{
            uri: icon,
          }}
          resizeMode="contain"
        />

        <Text style={Styles.premierLeagueText}>{ligueName}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  premierLeagueContrainer: {
    flexDirection: "row",
    marginHorizontal: 14,
    paddingTop: 17,
  },
  premierLeague: {
    backgroundColor: "#FFEEC4",
    borderRadius: 19,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  englandText: {
    fontSize: 10,
    color: "#A8976A",
  },
  premierLeagueIcon: {
    width: 25,
    height: 14,
    marginLeft: 7,
    marginVertical: 7,
    borderRadius: 15,
  },
  premierLeagueText: {
    fontSize: 10,
    marginLeft: 10,
  },
});
