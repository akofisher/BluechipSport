import { useNavigation } from "@react-navigation/native";
import {
  BrandIcon,
  MenuIcon,
  BackIcon,
  ShareIcon,
  SearchIcon,
  StarIconEmpty,
  StarIconFilled,
  WhiteStarSvg,
  LogoSvg,
} from "assets/svgs/AllSvgs";
import { Text } from "components/common";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import WhiteLogo from "../../../assets/whiteLogo.png";

export const BackButton = ({ style, color, rame, ...rest }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.btnPadding, style]}
      onPress={() => {
        if (rame) {
          navigation.navigate("News");
        } else {
          navigation.goBack();
        }
      }}
      {...rest}
    >
      <BackIcon color={color} />
    </TouchableOpacity>
  );
};

export const MenuButton = ({ style, color, ...rest }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.btnPadding, style]}
      onPress={() => navigation.openDrawer()}
      {...rest}
    >
      <MenuIcon color={color} />
    </TouchableOpacity>
  );
};

export const ShareButton = React.memo(({ style, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btnPadding, style]} onPress={onPress} {...rest}>
      <ShareIcon color={color} />
    </TouchableOpacity>
  );
});

export const SearchButton = ({ style, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btnPadding, style]} onPress={onPress} {...rest}>
      <SearchIcon color={color} />
    </TouchableOpacity>
  );
};

export const StarButtonEmpty = ({ style, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btnPadding, style]} onPress={onPress} {...rest}>
      <StarIconEmpty color={color} />
    </TouchableOpacity>
  );
};
export const StarButtonFull = ({ style, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btnPadding, style]} onPress={onPress} {...rest}>
      <WhiteStarSvg color={color} />
    </TouchableOpacity>
  );
};

export const StarButtonFilled = ({ style, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btnPadding, style]} onPress={onPress} {...rest}>
      <StarIconFilled color={color} />
    </TouchableOpacity>
  );
};

export const BrandLogo = ({ color, ...rest }) => {
  return <LogoSvg />;
};

export const Title = ({ title }) => {
  return (
    <Text numberOfLines={1} style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  btnPadding: {
    padding: 20,
  },
  brandLogo: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});
