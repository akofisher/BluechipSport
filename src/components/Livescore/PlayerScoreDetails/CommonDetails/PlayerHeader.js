import i18next from "i18next";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

export default function PlayerHeader({ player }) {
  return (
    <View>
      <View style={Styles.cont}>
        <FastImage
          style={Styles.image}
          source={{
            uri: player?.image_path,
          }}
          resizeMode="contain"
        />
        <View style={Styles.contChild}>
          <View>
            <Text style={Styles.fullName}>{i18next.t("FullName")}</Text>
            <Text style={Styles.name}>{player?.fullname}</Text>
          </View>
          <View>
            <Text style={Styles.fullName}>{i18next.t("PlayerName")}</Text>
            <Text style={Styles.name}>{player?.data?.player?.data?.display_name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    paddingLeft: 28,
    paddingVertical: 25,
  },
  contChild: {
    justifyContent: "space-around",
    paddingLeft: 20,
  },
  image: {
    width: 90,
    height: 105,
    borderRadius: 8,
  },
  fullName: {
    fontSize: 10,
    color: "#A5A5A5",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
