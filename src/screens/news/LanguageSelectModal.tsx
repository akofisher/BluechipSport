import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { RadioListItem, Text } from 'components/common'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from 'styles'

import i18next from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAppAvailableLanguages,
  selectAppLanguage,
} from '../../store/selectors/appSelectors'
import { setAppLanguage } from '../../store/thunks/appThunks'
import { AppLanguageCode } from '../../store/slices/appSlice'

const LanguageSelectModal = ({ bottomSheetModalRef }) => {
  const snapPoints = useMemo(() => [310, 310], [])

  const appLanguage = useSelector(selectAppLanguage)
  const languages = useSelector(selectAppAvailableLanguages)
  const dispatch = useDispatch()

  const onChangeLanguage = useCallback(
    (languageCode: AppLanguageCode) => {
      dispatch(setAppLanguage(languageCode))
    },
    [dispatch],
  )

  return (
    <BottomSheetModal
      enablePanDowntoClose
      backdropComponent={BottomSheetBackdrop}
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{i18next.t('ChooseLanguage')}</Text>
        {languages.map((language) => {
          return (
            <>
              <RadioListItem
                key={language.code}
                checked={language.code === appLanguage}
                title={language.title}
                iconName={language.iconName}
                onPress={() => onChangeLanguage(language.code)}
              />
              <View style={styles.space} />
            </>
          )
        })}
      </View>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 45,
    paddingHorizontal: 25,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: Colors.black,
    textTransform: 'uppercase',
    marginBottom: 34,
  },
  space: {
    height: 18,
  },
})

export default LanguageSelectModal
