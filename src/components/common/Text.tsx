import React from 'react'
import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native'
import { cxs } from '../../styles'

interface ITextProps extends TextProps {
  style?: StyleProp<TextStyle>
}

const Text = React.memo<ITextProps>(({ style, ...rest }) => {
  return <RNText style={[cxs.defaultFont, style]} {...rest} />
})

export default Text
