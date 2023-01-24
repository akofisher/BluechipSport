import React, { memo, ReactNode, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Icon } from '../../common'
import { Colors } from '../../../styles'

interface AccordionProps {
  title: ReactNode
  content: ReactNode
}

export const Accordion = memo<AccordionProps>((props) => {
  const [expanded, setExpanded] = useState(false)
  const { title, content } = props
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setExpanded(!expanded)}
        style={styles.header}
      >
        {title}
        <Icon
          iconName={expanded ? 'ChevronUp' : 'ChevronDown'}
          stroke={'white'}
        />
      </TouchableOpacity>
      {expanded ? (
        <>
          <View style={styles.divider} />
          {content}
          <View style={styles.divider} />
        </>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
})
