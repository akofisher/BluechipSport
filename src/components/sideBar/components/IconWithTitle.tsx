import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'

import { Icon, Text } from '../../common'
import { SvgICONSType } from '../../../../assets/svgs/svgIcons'
import { Colors } from '../../../styles'

interface IconWithTitleProps {
  title: string
  iconName: SvgICONSType
}

export const IconWithTitle = memo<IconWithTitleProps>((props) => {
  const { title, iconName } = props
  return (
    <View style={styles.container}>
      <Icon iconName={iconName} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.textBlack,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
  },
})
