import React from "react";
import { TouchableOpacity, View } from "react-native";
import { TouchableOpacity as TouchableGesture } from "react-native-gesture-handler";
import { cxs, Colors } from "styles";

import Text from "./Text";
const Touchable = Platform.select({
  ios: TouchableOpacity,
  android: TouchableGesture,
});

const Button = ({
  title,
  onPress,
  style,
  big = false,
  color = "primary",
  textColor = "white",
  width = "100%",
  height = 50,
  disabled = false,
}) => {
  const [fontSize, borderRadius, fontWeight] = big ? [16, 50, "600"] : [14, 10, "500"];
  return (
    <View style={{ width: "100%" }}>
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            backgroundColor: disabled ? "#ECEDEF" : Colors[color],
            borderRadius,
            width,
            height,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        <Text
          style={{
            color: Colors[textColor],
            fontWeight,
            fontSize,
          }}
        >
          {title}
        </Text>
      </Touchable>
    </View>
  );
};

export default Button;
