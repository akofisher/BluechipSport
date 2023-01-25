import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from '../../common'
import { Colors } from '../../../styles'
import FastImage from 'react-native-fast-image'

interface IconWithTitleProps {
  title: string
  icon: string | null
}

export const IconWithTitle = memo<IconWithTitleProps>((props) => {
  const { title, icon } = props
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: icon || '' }} style={styles.image} />
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
  image: { height: 38, width: 38 },
})
