import { Text } from "components/common";
import i18next from "i18next";
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import commentIcon from "../../../assets/icons/message1.png";

const CommentsButton = React.memo(({ onPress, comentCount }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Image style={styles.image} source={commentIcon} />
      <Text style={styles.btnTitle}>{i18next.t("Comments")}</Text>
      <Text style={styles.comNum}>{comentCount}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 4,
    marginHorizontal: 20,
  },
  image: {
    width: 24,
    height: 20,
  },
  btnTitle: {
    marginHorizontal: 10,
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  comNum: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CommentsButton;
