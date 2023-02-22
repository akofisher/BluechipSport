

import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  ViewPropTypes,
  ColorPropType,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
} from "react-native";
// import {
//   ViewPropTypes,
//   ColorPropType,
// } from "deprecated-react-native-prop-types";

const SCALE = 6 / 5;

export default class extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    circleColorActive: ColorPropType,
    circleColorInactive: ColorPropType,
    backgroundActive: ColorPropType,
    backgroundInactive: ColorPropType,
    onAsyncPress: PropTypes.func,
    onSyncPress: PropTypes.func,
    style: ViewPropTypes.style,
    circleStyle: ViewPropTypes.style,
    renderCircleContentActive: PropTypes.func,
    renderCircleContentInactive: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
  };

  static defaultProps = {
    width: 40,
    height: 21,
    value: false,
    disabled: false,
    circleColorActive: "white",
    circleColorInactive: "white",
    backgroundActive: "#43d551",
    backgroundInactive: "#dddddd",
    onAsyncPress: (callback) => {
      callback(true);
    },
    renderCircleContentInactive: null,
    renderCircleContentActive: null,
    onDragStart: null,
    onDragStop: null,
  };

  constructor(props, context) {
    super(props, context);
    const { width, height, value } = props;

    this.offset = width - height + 1;
    this.handlerSize = height - 4;

    this.state = {
      value,
      toggleable: true,
      alignItems: value ? "flex-end" : "flex-start",
      handlerAnimation: new Animated.Value(this.handlerSize),
      switchAnimation: new Animated.Value(value ? -1 : 1),
      switchAnimationNative: new Animated.Value(value ? -1 : 1),
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease,
      onPanResponderTerminate: this._onPanResponderRelease,
    });
  }

  componentDidUpdate(prevProps) {
    if (typeof this.props.value !== "undefined" && prevProps.value !== this.props.value) {
      this.toggleSwitchToValue(true, this.props.value);
    }
  }

  _onPanResponderGrant = (evt, gestureState) => {
    const { disabled, onDragStart } = this.props;
    if (disabled) return;

    this.setState({ toggleable: true });
    this.animateHandler(this.handlerSize * SCALE);
    if (onDragStart) onDragStart();
  };

  _onPanResponderMove = (evt, gestureState) => {
    const { value } = this.state;
    const { disabled } = this.props;
    if (disabled) return;

    this.setState({
      toggleable: value ? gestureState.dx < 10 : gestureState.dx > -10,
    });
  };

  _onPanResponderRelease = (evt, gestureState) => {
    const { toggleable } = this.state;
    const { disabled, onAsyncPress, onSyncPress, onDragStop } = this.props;

    if (disabled) return;

    if (toggleable) {
      if (onSyncPress) {
        this.toggleSwitch(true, onSyncPress);
      } else {
        onAsyncPress(this.toggleSwitch);
      }
    } else {
      this.animateHandler(this.handlerSize);
    }
    if (onDragStop) onDragStop();
  };

  /**
   *
   * @param result result of task
   * @param callback invoke when task is finished
   */
  toggleSwitch = (result, callback = () => null) => {
    const { value } = this.state;
    this.toggleSwitchToValue(result, !value, callback);
  };

  /**
   * @param result result of task
   * @param toValue next status of switch
   * @param callback invoke when task is finished
   */
  toggleSwitchToValue = (result, toValue, callback = () => null) => {
    const { switchAnimation, switchAnimationNative } = this.state;

    this.animateHandler(this.handlerSize);
    if (result) {
      this.animateSwitch(toValue, () => {
        this.setState(
          {
            value: toValue,
            alignItems: toValue ? "flex-end" : "flex-start",
          },
          () => {
            callback(toValue);
          },
        );
        switchAnimation.setValue(toValue ? -1 : 1);
        switchAnimationNative.setValue(toValue ? -1 : 1);
      });
    }
  };

  animateSwitch = (value, callback = () => null) => {
    const { switchAnimation, switchAnimationNative } = this.state;

    Animated.timing(switchAnimation, {
      toValue: value ? this.offset : -this.offset,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(callback);

    Animated.timing(switchAnimationNative, {
      toValue: value ? this.offset : -this.offset,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  animateHandler = (value, callback = () => null) => {
    const { handlerAnimation } = this.state;

    Animated.timing(handlerAnimation, {
      toValue: value,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(callback);
  };

  render() {
    const { switchAnimation, handlerAnimation, switchAnimationNative, alignItems, value } =
      this.state;
    const {
      backgroundActive,
      backgroundInactive,
      width,
      height,
      circleColorActive,
      circleColorInactive,
      style,
      circleStyle,
      renderCircleContentActive,
      renderCircleContentInactive,
      ...rest
    } = this.props;

    const interpolatedBackgroundColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [backgroundInactive, backgroundActive],
      extrapolate: "clamp",
    });

    const interpolatedCircleColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [circleColorInactive, circleColorActive],
      extrapolate: "clamp",
    });

    const interpolatedOpacityActive = switchAnimationNative.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const interpolatedOpacityInactive = switchAnimationNative.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const interpolatedRotation = switchAnimationNative.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: ["-90deg", "0deg"],
      extrapolate: "clamp",
    });

    const circlePosition = (value) => {
      const modifier = value ? 2 : -2;
      let position = modifier * -1;

      if (circleStyle?.borderWidth) {
        position += modifier;
      }

      if (style?.borderWidth) {
        position += modifier;
      }

      return position;
    };

    const interpolatedTranslateX = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -2] : [1, this.offset],
      outputRange: value
        ? [-this.offset, circlePosition(value)]
        : [circlePosition(value), this.offset],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        {...rest}
        {...this._panResponder.panHandlers}
        style={[
          styles.container,
          {
            width,
            height,
            alignItems,
            borderRadius: height / 2,
            backgroundColor: interpolatedBackgroundColor,
          },
          style,
        ]}
      >
        <Animated.View
          style={[
            {
              backgroundColor: interpolatedCircleColor,
              width: handlerAnimation,
              height: this.handlerSize,
              borderRadius: this.handlerSize / 2,
              transform: [{ translateX: interpolatedTranslateX }],
            },
            circleStyle,
          ]}
        >
          <Animated.View
            style={{
              opacity: interpolatedOpacityActive,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              transform: [{ rotate: interpolatedRotation }],
            }}
          >
            {renderCircleContentActive && renderCircleContentActive()}
          </Animated.View>

          <Animated.View
            style={{
              opacity: interpolatedOpacityInactive,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              transform: [{ rotate: interpolatedRotation }],
            }}
          >
            {renderCircleContentInactive && renderCircleContentInactive()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
  },
});