import Constants from 'expo-constants'
import React from 'react'
import { View, Platform, Dimensions } from 'react-native'

const { statusBarHeight } = Constants
const deviceHeight = Dimensions.get('window').height
const height = Platform.select({
  ios: deviceHeight,
  // hack to fix statusbar issue with Xiaomi Android Mi A2 Lite
  android: statusBarHeight > 24 ? deviceHeight + statusBarHeight : deviceHeight,
})

const KeyboardShiftlessView = ({ style, children }) => (
  <View style={[{ height }, style]}>{children}</View>
)

export default KeyboardShiftlessView
