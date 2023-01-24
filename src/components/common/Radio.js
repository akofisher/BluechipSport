import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from 'styles'

export default function Radio({ checked }) {
  return (
    <View style={styles.container}>
      {checked ? <View style={styles.inner} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 100,
  },
  inner: {
    width: 11,
    height: 11,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
})
