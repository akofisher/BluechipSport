import { Text } from "components/common";
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

const TagButton = ({ style, onPress, title, imgUri, item }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      {item.type === "LeagueNews"
        ? imgUri && (
            <Image source={{ uri: imgUri }} style={styles.imageLeague} resizeMode="contain" />
          )
        : imgUri && <Image source={{ uri: imgUri }} style={styles.image} resizeMode="contain" />}

      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  image: {
    width: 26,
    height: 30,
    marginRight: 10,
  },
  imageLeague: {
    width: 30,
    height: 22,
    marginRight: 10,
  },
});

export default TagButton;
