import React, { useState } from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { cxs, Colors } from "styles";

import IconPressable from "./IconPressable";

const TextInput = ({ style, iconLeft = null, iconRight = null, ...rest }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        cxs.row,
        cxs.alignCenter,
        {
          borderColor: focused ? Colors.primary : Colors.inputBorder,
        },
        style,
      ]}
    >
      {iconLeft && (
        <IconPressable
          style={[cxs.pl15]}
          color={focused ? Colors.primary : Colors.iconColor}
          {...iconLeft}
        />
      )}
      <RNTextInput
        placeholderTextColor={Colors.textSecondary}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[cxs.h50, cxs.flex, cxs.defaultFont, cxs.px15, styles.textInput]}
        {...rest}
      />
      {iconRight && (
        <IconPressable
          style={cxs.pr15}
          color={focused ? Colors.primary : Colors.iconColor}
          {...iconRight}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: Colors.inputBackround,
    borderRadius: 10,
    borderWidth: 1,
  },
  textInput: {
    color: Colors.textSecondary,
  },
});

export default TextInput;
