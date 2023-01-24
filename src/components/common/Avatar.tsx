import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { storageURL } from 'services/endpoints'
import Icon from './Icon'

interface AvatarProps {
  size?: number
  uri: string
  withEditIcon?: boolean
}

const Avatar = React.memo<AvatarProps>((props) => {
  const { size = 38, uri, withEditIcon } = props

  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
    },
  ]
  return (
    <View>
      {uri ? (
        <FastImage
          style={containerStyle}
          source={{ uri: `${storageURL}/${uri}` }}
        />
      ) : (
        <View style={containerStyle}>
          <Icon iconName={'Crown'} />
        </View>
      )}
      {withEditIcon ? (
        <View style={styles.editIcon}>
          <Icon iconName={'Edit'} stroke="#F2F2F2" strokeWidth={14} />
        </View>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FF0960',
  },
  editIcon: {
    position: 'absolute',
    backgroundColor: 'white',
    right: -5,
    bottom: -5,
    padding: 2,
    borderRadius: 50,
  },
})

export default Avatar
