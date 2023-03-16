import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, Text} from '../common';
import {Colors} from '../../styles';
import {SvgICONSType} from '../../../assets/svgs/svgIcons';

interface HeaderProps {
  content?: ReactNode;
  leftAction?: {iconName: SvgICONSType; onPress: () => void};
  rightAction?:
    | {iconName: SvgICONSType; onPress: () => void}
    | {iconName: SvgICONSType; onPress: () => void}[];
  title?: string;
  mode?: 'black' | 'light';
  renderTitle?: () => ReactNode;
  withoutNavigation?: boolean;
}

const Header = React.memo<HeaderProps>(props => {
  const {
    content,
    leftAction,
    title,
    rightAction,
    mode = 'black',
    renderTitle,
    withoutNavigation,
  } = props;

  const insets = useSafeAreaInsets();

  const isLightMode = mode === 'light';

  const renderIcon = useCallback(
    (iconName: SvgICONSType, onPress: () => void) => {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.iconWrapper,
            isLightMode ? styles.iconLightWrapper : null,
          ]}>
          <Icon iconName={iconName} />
        </TouchableOpacity>
      );
    },
    [isLightMode],
  );

  const _renderLeft = useCallback(() => {
    if (!leftAction) {
      return <Icon iconName={isLightMode ? 'BrandLogoBlack' : 'BrandLogo'} />;
    }

    const {iconName, onPress} = leftAction;
    return renderIcon(iconName, onPress);
  }, [leftAction, renderIcon, isLightMode]);

  const _renderTitle = useCallback(() => {
    if (renderTitle) {
      return renderTitle();
    }

    if (!title) {
      return null;
    }

    return (
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    );
  }, [title, renderTitle]);

  const _renderRight = useCallback(() => {
    if (!rightAction) {
      return null;
    }

    if (Array.isArray(rightAction) && rightAction.length) {
      const [
        {iconName: iconName1, onPress: onPress1},
        {iconName: iconName2, onPress: onPress2},
      ] = rightAction;
      return (
        <View style={styles.rightHeaderActions}>
          {renderIcon(iconName1, onPress1)}
          {renderIcon(iconName2, onPress2)}
        </View>
      );
    } else {
      // @ts-ignore
      const {iconName, onPress} = rightAction;
      return renderIcon(iconName, onPress);
    }
  }, [rightAction, renderIcon]);

  return (
    <View
      style={[
        styles.wrapper,
        isLightMode ? styles.lightWrapper : null,
        {paddingTop: insets.top},
      ]}>
      {withoutNavigation ? null : (
        <View style={styles.header}>
          <View style={styles.leftContent}>{_renderLeft()}</View>
          <View style={styles.centerContent}>{_renderTitle()}</View>
          <View style={styles.rightContent}>{_renderRight()}</View>
        </View>
      )}

      {content ? <View style={styles.content}>{content}</View> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.headerBackground,
  },
  lightWrapper: {
    backgroundColor: Colors.white,
  },
  leftContent: {flex: 1},
  centerContent: {flex: 2, alignItems: 'center'},
  rightContent: {flex: 1, alignItems: 'flex-end'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 11,
  },
  iconWrapper: {
    backgroundColor: Colors.headerIconWrapper,
    width: 32,
    height: 32,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLightWrapper: {
    backgroundColor: Colors.headerIconLightWrapper,
  },
  rightHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 76,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'uppercase',
    color: Colors.white,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: '#1A2631',
  },
});

export default Header;
