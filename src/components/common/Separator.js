import React from "react";
import { View } from "react-native";
import { Colors } from "styles";

// usage:

// standard separator, represented with line
// <Separator vertical rounded lineWidth={10} />

// add prop 'blank' if you want invisible separator
// <Separator blank vertical />

export default function Separator({
  vertical = false,
  blank = false,
  lineWidth = 1,
  rounded = false,
  color = Colors.separator,
  style,
}) {
  const defaultStyle = {
    [vertical ? "width" : "height"]: blank ? 0 : lineWidth,
    borderRadius: rounded ? 100 : 0,
    backgroundColor: color,
  };

  return <View style={[defaultStyle, style]} />;
}
