import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { cxs, Colors } from "styles";

import IconPressable from "./IconPressable";

const SearchBox = ({ style, onSearch, onClear, dark = false, ...rest }) => {
  const [focused, setFocused] = useState(false);

  let iconColor = "";
  let textColor = "";
  let placeHolderTextColor = "";
  let borderColor = "";

  if (focused) {
    iconColor = Colors.primaryLight;
    textColor = Colors.textSecondary;
    placeHolderTextColor = Colors.textSecondary;
    borderColor = Colors.borderColor;
  } else {
    iconColor = dark ? Colors.primaryLight : Colors.textSecondary;
    textColor = dark ? Colors.primaryLight : Colors.textSecondary;
    placeHolderTextColor = dark ? Colors.primaryLight : Colors.textSecondary;
    borderColor = Colors.primaryLight;
  }

  return (
    <View
      style={[
        styles.wrapper,
        cxs.row,
        cxs.alignCenter,
        cxs.px15,
        {
          borderColor,
          backgroundColor: focused ? Colors.white : "transparent",
        },
        style,
      ]}
    >
      <IconPressable
        onPress={onSearch}
        name="search"
        color={iconColor}
        style={[cxs.mr15]}
        size={17}
      />
      <TextInput
        placeholderTextColor={placeHolderTextColor}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          cxs.h45,
          cxs.flex,
          cxs.defaultFont,
          {
            color: textColor,
          },
        ]}
        {...rest}
      />
      <IconPressable
        onPress={onClear}
        name="times-circle"
        color={iconColor}
        style={[cxs.ml15]}
        size={17}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 2,
  },
});

export default SearchBox;
