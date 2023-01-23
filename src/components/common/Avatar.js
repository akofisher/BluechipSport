import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { storageURL } from "services/endpoints";

// FontAwesome5.loadFont();

export default function Avatar({ size, uri, color = "#585858" }) {
  return (
    <View>
      {uri ? (
        <FastImage
          style={{ width: size, height: size, resizeMode: "stretch" }}
          // source={{ uri: `data:image/png;base64,${uri}` }}
          source={{ uri: `${storageURL}/${uri}` }}
        />
      ) : (
        <FontAwesome name="user-circle" size={size} color={color} />
      )}
    </View>
  );
}
