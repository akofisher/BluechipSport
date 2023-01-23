import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "styles";
import Radio from "components/common/Radio";
import Text from "components/common/Text";
import Icon from "components/common/Icon";

export default function RadioListItem({ onPress, checked, title, iconName }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, checked ? styles.active : null]}
    >
      <View style={styles.row}>
        <Icon iconName={iconName}></Icon>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Radio checked={checked} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  active: {
    borderColor: Colors.green,
    backgroundColor: Colors.blurredGreen,
  },
  text: {
    fontWeight: "500",
    fontSize: 15,
    color: Colors.textBlack,
    marginLeft: 12,
  },
});
