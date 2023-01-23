import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { Icon, VideoPlayer } from "components/common";
import { Colors } from "styles";

const { width: deviceWidth } = Dimensions.get("window");

const VerticalListItemHeader = React.memo((props) => {
  const { mainVideoUrl, imageURI, isSquareImage, onSharePress } = props;

  return (
    <>
      {mainVideoUrl ? (
        <TouchableOpacity
          style={isSquareImage ? styles.squareImageStyle : styles.mainImageStyle}
          activeOpacity={1}
        >
          <VideoPlayer
            uri={mainVideoUrl}
            posterUri={imageURI}
            style={isSquareImage ? styles.squareImageStyle : styles.mainImageStyle}
          />
        </TouchableOpacity>
      ) : (
        <FastImage
          style={isSquareImage ? styles.squareImageStyle : styles.mainImageStyle}
          source={{ uri: imageURI }}
        />
      )}
      <TouchableOpacity onPress={onSharePress} style={styles.share}>
        <Icon iconName="Share" />
      </TouchableOpacity>
    </>
  );
});

const styles = StyleSheet.create({
  mainImageStyle: { width: deviceWidth, height: 200 },
  squareImageStyle: { width: deviceWidth, height: 200 },
  share: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: Colors.blurredWhite,
  },
});

export default VerticalListItemHeader;
