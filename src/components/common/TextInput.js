import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from 'styles'
import { FloatingLabelInput } from 'react-native-floating-label-input'

const TextInput = ({
  onChangeText,
  placeholder,
  isPassword,
  value,
  onTogglePassword,
  customPasswordHideShowComponent,
}) => {
  const _onChangeText = (text) => {
    onChangeText(text)
  }
  return (
    <FloatingLabelInput
      value={value}
      isPassword={isPassword}
      customHidePasswordComponent={customPasswordHideShowComponent || <View />}
      customShowPasswordComponent={customPasswordHideShowComponent || <View />}
      onTogglePassword={onTogglePassword}
      onChangeText={_onChangeText}
      label={placeholder}
      inputStyles={styles.value}
      containerStyles={styles.container}
      customLabelStyles={{
        fontSizeBlurred: 13,
        fontSizeFocused: 12,
        colorFocused: Colors.textSecondary,
        colorBlurred: Colors.textSecondary,
        topBlurred: -7,
        topFocused: -17,
        leftBlurred: -1,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingTop: 15,
    backgroundColor: '#ECECEC',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 13,
  },
})

export default TextInput
