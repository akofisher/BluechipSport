import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '../../common'

interface VerticalListModeSwitcherProps {
  isTileMode: boolean
  onChange?: (isTileMode: boolean) => void
}

export const VerticalListModeSwitcher =
  React.memo<VerticalListModeSwitcherProps>(
    ({ isTileMode = true, onChange }) => {
      const [isTillMoveActive, setIsTillMoveActive] = useState(isTileMode)

      const enableTillMode = () => {
        setIsTillMoveActive(true)
        onChange && onChange(true)
      }

      const disableTillMode = () => {
        setIsTillMoveActive(false)
        onChange && onChange(false)
      }

      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.option, isTillMoveActive ? styles.active : null]}
            onPress={enableTillMode}
          >
            <Icon
              iconName={isTillMoveActive ? 'Rectangle' : 'RectangleBlack'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.option, isTillMoveActive ? null : styles.active]}
            onPress={disableTillMode}
          >
            <Icon iconName={isTillMoveActive ? 'LisBlack' : 'List'} />
          </TouchableOpacity>
        </View>
      )
    },
  )

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    padding: 2,
    borderRadius: 6,
    width: 60,
    height: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  option: {
    borderRadius: 4,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#3555FF',
  },
  activeIcon: {
    backgroundColor: '#111315',
  },
})
