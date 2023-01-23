import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { TouchableOpacity as TouchableGesture } from "react-native-gesture-handler";
import { Text } from "components/common";

const Touchable = Platform.select({
  ios: TouchableOpacity,
  android: TouchableGesture,
});
export default function ChoosePlayerComp({ onPress, checked, item }) {
  return (
    <Touchable
      onPress={onPress}
      style={[
        Styles.cont,
        { borderColor: checked ? "#E53C48" : "#E8E8E8" },
        { borderWidth: checked ? 2 : 1 },
      ]}
    >
      <View style={Styles.imgNameCont}>
        <Image
          style={Styles.image}
          source={{
            uri: item.image_path,
          }}
        />
        <Text style={Styles.name}>{item.player_name}</Text>
      </View>
      <Text style={Styles.rating}>{item.stats.rating}</Text>
    </Touchable>
  );
}
const Styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    marginHorizontal: 27,
    paddingLeft: 4,
    paddingRight: 12,
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 5,
  },
  image: {
    width: 29,
    height: 29,
    borderRadius: 4,
  },
  name: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  imgNameCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
});
