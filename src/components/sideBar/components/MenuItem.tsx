import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Text } from '../../common'
import { Colors } from '../../../styles'

interface MenuItemProps {
  title: string
  onPress: () => null
}

export const MenuItem = memo<MenuItemProps>((props) => {
  const { title, onPress } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {},
  title: {
    paddingLeft: 20,
    marginVertical: 11,
    color: Colors.textBlack,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '500',
  },
})
