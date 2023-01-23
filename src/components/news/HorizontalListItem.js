import React from "react";
import { TouchableOpacity, Dimensions, ImageBackground, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, cxs } from "styles";
import { storageURL } from "services/endpoints";
import { Text } from "components/common";
import LinearGradient from "react-native-linear-gradient";

const width = Dimensions.get("window").width * 0.9;

const HorizontalListItem = ({ itemData, ...rest }) => {
  return (
    <TouchableOpacity style={[cxs.p10, { width }]} activeOpacity={0.7} {...rest}>
      <ImageBackground
        style={styles.image}
        imageStyle={styles.image}
        source={{
          uri: `${storageURL}/size/timthumb.php?src=/uploads/posts/${itemData.image}&w=450`,
        }}
      >
        <LinearGradient colors={["#00000000", "#000000"]} style={styles.gradient}>
          <Text style={styles.title}>{itemData.title}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HorizontalListItem;

const styles = StyleSheet.create({
  image: {
    height: 183,
    borderRadius: 8,
    justifyContent: "flex-end",
  },
  gradient: {
    height: 183,
    borderRadius: 8,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 21,
    color: Colors.white,
    padding: 15,
  },
});
