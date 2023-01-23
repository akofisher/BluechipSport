import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "styles";

const screens = ["Teams", "Players", "Login"];

const Rectangle = ({ active = false, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={active}
    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    style={[styles.rectangle, active && { backgroundColor: Colors.primary }]}
  />
);

const Pager = ({ numOfPages = 3, active = 1 }) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.wrapper}>
      {Array(numOfPages)
        .fill(null)
        .map((_, i) => (
          <Rectangle key={i} active={i === active - 1} onPress={() => navigate(screens[i])} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  rectangle: {
    width: 30,
    height: 5,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});

export default Pager;
