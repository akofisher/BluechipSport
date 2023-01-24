import React, { memo } from 'react'
import { SvgICONS, SvgICONSType } from '../../../assets/svgs/svgIcons'
import { ViewStyle } from 'react-native'

interface IconProps {
  iconName: SvgICONSType
  style?: ViewStyle
}

const Icon = memo<IconProps>((props) => {
  const { iconName, style } = props
  const SvgIcon = SvgICONS[iconName]
  return SvgIcon ? <SvgIcon style={style} /> : null
})

export default Icon
