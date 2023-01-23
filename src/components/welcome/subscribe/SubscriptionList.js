import React from "react";
import { FlatList, View } from "react-native";
import { cxs } from "styles";

const SubscriptionList = ({ data, ...rest }) => {
  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={data}
      numColumns={3}
      contentContainerStyle={cxs.py20}
      ItemSeparatorComponent={() => <View style={cxs.m5} />}
      {...rest}
    />
  );
};

export default SubscriptionList;
