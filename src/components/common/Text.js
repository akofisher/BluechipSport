import React from "react";
import { Text as RNText } from "react-native";
import { cxs } from "styles";

export default function Text({ style, ...rest }) {
  return <RNText style={[cxs.defaultFont, style]} {...rest} />;
}
