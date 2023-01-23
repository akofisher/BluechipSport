import React, { useState } from "react";
import { View } from "react-native";

import LiveMatchChild from "./LiveMatchChild";

const LiveMatch = ({ item, deviceId, navigation }) => {
  const [trigger, settrigger] = useState();

  return (
    <View style={{ flexDirection: "row" }}>
      {item?.data?.map((i, index) => {
        return (
          <LiveMatchChild
            i={i}
            key={index}
            index={index}
            trigger={trigger}
            settrigger={settrigger}
            item={item}
            deviceId={deviceId}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

export default LiveMatch;
