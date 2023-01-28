import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { SvgICONSType } from '../../../../assets/svgs/svgIcons'
import { Icon, Text } from '../../common'

interface SideBarLanguageButtonProps {
  languageIconName: SvgICONSType
  languageCode: string
  openLanguageModal: () => void
}

export const SideBarLanguageButton = memo<SideBarLanguageButtonProps>(
  (props) => {
    const { languageIconName, languageCode, openLanguageModal } = props
    return (
      <TouchableOpacity
        style={styles.languageSelector}
        onPress={openLanguageModal}
      >
        <Icon iconName={languageIconName} />
        <Text style={styles.languageSelectorTitle}>{languageCode}</Text>
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  languageSelector: {
    right: -70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelectorTitle: {
    textTransform: 'uppercase',
    marginLeft: 8,
    fontWeight: '500',
  },
})
