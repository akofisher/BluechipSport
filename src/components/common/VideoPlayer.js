import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/dist/Feather";
import WebView from "react-native-webview";
import { Colors } from "styles";

Feather.loadFont();

const VideoPlayer = ({ style = {}, uri = "", posterUri = "" }) => {
  const [active, setActive] = useState(false);
  const onInitialPress = () => setActive(true);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActive(false);
      };
    }, []),
  );

  return (
    <View style={st.container}>
      {!active ? (
        <TouchableOpacity style={st.absoluteFill} onPress={onInitialPress} activeOpacity={0.7}>
          <View style={st.playIconContainer}>
            <FontAwesome name="play" size={28} color={Colors.black} style={st.playIcon} />
          </View>
          <FastImage style={st.absoluteFill} source={{ uri: posterUri }} />
        </TouchableOpacity>
      ) : (
        <WebView
          source={
            Platform.OS === "android"
              ? {
                  uri,
                }
              : {
                  html: `<body>
              <video controls autoplay playsinline src=${uri} poster=${posterUri}></video>
             <style>
              video {
                position: absolute;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                height: 100%;
                width: 100%;
              }
              </style>
            </body>`,
                }
          }
          style={style}
          originWhitelist={["*"]}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          allowsAirPlayForMediaPlayback
          injectedJavaScript={`const video = document.getElementsByTagName("video")[0]; video.controlsList="nodownload";`}
        />
      )}
    </View>
  );
};

export default VideoPlayer;

const st = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  absoluteFill: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "black",
  },
  playIconContainer: {
    backgroundColor: "#ffffffb3",
    width: 56,
    height: 56,
    zIndex: 2,
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    zIndex: 2,
    marginLeft: 4,
  },
});
