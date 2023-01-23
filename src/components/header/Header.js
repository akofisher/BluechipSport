import { Icon, Text } from "components/common";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "styles";

const Header = React.memo((props) => {
  const { content, leftAction, title, rightAction, mode = "black", renderTitle } = props;

  const insets = useSafeAreaInsets();

  const isLightMode = mode === "light";

  const renderIcon = useCallback(
    (iconName, onPress) => {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.iconWrapper, isLightMode ? styles.iconLightWrapper : null]}
        >
          <Icon iconName={iconName} />
        </TouchableOpacity>
      );
    },
    [isLightMode],
  );

  const _renderLeft = useCallback(() => {
    if (!leftAction) {
      return <Icon iconName={isLightMode ? "BrandLogoBlack" : "BrandLogo"} />;
    }

    const { iconName, onPress } = leftAction;
    return renderIcon(iconName, onPress);
  }, [leftAction, renderIcon, isLightMode]);

  const _renderTitle = useCallback(() => {
    if (renderTitle) {
      return renderTitle();
    }

    if (!title) {
      return null;
    }

    return <Text style={styles.title}>{title}</Text>;
  }, [title, renderTitle]);

  const _renderRight = useCallback(() => {
    if (!rightAction) {
      return null;
    }

    if (rightAction.length) {
      const [
        { iconName: iconName1, onPress: onPress1 },
        { iconName: iconName2, onPress: onPress2 },
      ] = rightAction;
      return (
        <View style={styles.rightHeaderActions}>
          {renderIcon(iconName1, onPress1)}
          {renderIcon(iconName2, onPress2)}
        </View>
      );
    }

    const { iconName, onPress } = rightAction;
    return renderIcon(iconName, onPress);
  }, [rightAction, renderIcon]);

  return (
    <View
      style={[styles.wrapper, isLightMode ? styles.lightWrapper : null, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        {_renderLeft()}
        {_renderTitle()}
        {_renderRight()}
      </View>
      {content ? <View>{content}</View> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.headerBackground,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  lightWrapper: {
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    backgroundColor: Colors.headerIconWrapper,
    width: 32,
    height: 32,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLightWrapper: {
    backgroundColor: Colors.headerIconLightWrapper,
  },
  rightHeaderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 76,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.white,
  },
});

export default Header;
