import React, {memo} from 'react';
import {SvgICONS, SvgICONSType} from '../../../assets/svgs/svgIcons';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface IconProps {
  iconName: SvgICONSType;
  style?: ViewStyle | null;
  stroke?: string;
  strokeWidth?: number;
}

const Icon = memo<IconProps>(props => {
  const {iconName, stroke, style, strokeWidth} = props;
  const SvgIcon = SvgICONS[iconName];

  if (!SvgIcon) {
    return null;
  }
  return stroke ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: stroke,
          width: strokeWidth,
          height: strokeWidth,
        },
      ]}>
      <SvgIcon style={style} />
    </View>
  ) : (
    <SvgIcon style={style} />
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
  },
});

export default Icon;
