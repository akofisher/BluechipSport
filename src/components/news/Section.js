import { Text, Separator } from "components/common";
import React from "react";
import { View } from "react-native";
import { cxs, Colors } from "styles";

const Section = ({ title, children }) => {
  return (
    <View>
      <Separator />
      <View style={[cxs.px15, cxs.py20]}>
        {title ? (
          <Text style={[cxs.mb15, cxs.textBold, cxs.f17, { color: Colors.textTitle }]}>
            {title}
          </Text>
        ) : null}
        {children}
      </View>
    </View>
  );
};

export default Section;
