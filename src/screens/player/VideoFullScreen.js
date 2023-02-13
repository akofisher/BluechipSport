import { useNavigation, useRoute } from "@react-navigation/native";
import { VideoPlayer } from "components/common";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";

const VideoFullScreen = () => {
  const { params } = useRoute();
  const { uri, videoState } = params;

  const { pop } = useNavigation();

  const onBack = () => {
    pop(1);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBack);

    return () => BackHandler.removeEventListener("hardwareBackPress", onBack);
  }, []);

  return (
    <View style={st.flex}>
      <VideoPlayer uri={uri} style={st.video} preVideoState={videoState} />
    </View>
  );
};

export default VideoFullScreen;

const st = StyleSheet.create({
  btnPadding: {
    top: 20,
    left: 20,
    position: "absolute",
    zIndex: 1,
  },
  video: {
    height: "100%",
    width: "100%",
  },
  flex: {
    flex: 1,
  },
});
