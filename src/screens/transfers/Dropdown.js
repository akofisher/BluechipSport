import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Text } from "components/common";

MaterialIcons.loadFont();

const downArrow = "keyboard-arrow-down";
const upArrow = "keyboard-arrow-up";

export const Dropdown = (props) => {
  const {
    value,
    onValueChange,
    items,
    viewContainerStyle,
    children,
    inputLabel,
    inputIcon,
    ...rest
  } = props;

  return (
    <RNPickerSelect value={value} doneText="" onValueChange={onValueChange} items={items} {...rest}>
      <TouchableOpacity style={styles.inputContainer}>
        <View style={styles.row}>
          {inputIcon ? <Image source={{ uri: inputIcon }} style={styles.icon} /> : null}
          <Text>{inputLabel}</Text>
        </View>
        <View>
          <MaterialIcons name={downArrow} size={22} color="#424242" />
        </View>
      </TouchableOpacity>
    </RNPickerSelect>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});
