import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TouchableOpacity as TouchableGesture } from 'react-native-gesture-handler'
import { Colors } from 'styles'

import Text from './Text'
const Touchable = Platform.select({
  ios: TouchableOpacity,
  android: TouchableGesture,
})

const Button = ({
  title,
  onPress,
  style,
  big = false,
  color = 'primary',
  textColor = 'white',
  width = '100%',
  height = 48,
  disabled = false,
  leftContent,
  rightContent,
}) => {
  const [fontSize, borderRadius, fontWeight] = big
    ? [16, 6, '500']
    : [14, 6, '500']
  return (
    <View style={{ width: '100%' }}>
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            backgroundColor: disabled ? '#ECEDEF' : Colors[color],
            borderRadius,
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          },
          style,
        ]}
      >
        {leftContent ? leftContent : null}
        <Text
          style={{
            color: Colors[textColor],
            fontWeight,
            fontSize,
            marginHorizontal: 10,
          }}
        >
          {title}
        </Text>
        {rightContent ? rightContent : null}
      </Touchable>
    </View>
  )
}

export default Button
