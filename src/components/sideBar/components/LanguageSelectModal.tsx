import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import i18next from 'i18next'
import { useSelector } from 'react-redux'
import {
  selectAppAvailableLanguages,
  selectAppLanguage,
} from '../../../store/selectors/appSelectors'
import { setAppLanguage } from '../../../store/thunks/appThunks'
import { AppLanguageCode } from '../../../store/slices/appSlice'
import { Icon, RadioListItem, Text } from '../../common'
import { useAppDispatch } from '../../../store'
import { Colors } from '../../../styles'

interface LanguageSelectModalProps {
  bottomSheetModalRef: React.Ref<BottomSheetModal>
}

export const LanguageSelectModal = React.memo<LanguageSelectModalProps>(
  ({ bottomSheetModalRef }) => {
    const snapPoints = useMemo(() => [310, 310], [])

    const appLanguage = useSelector(selectAppLanguage)
    const languages = useSelector(selectAppAvailableLanguages)
    const dispatch = useAppDispatch()

    const closeModal = useCallback(
      // @ts-ignore
      () => bottomSheetModalRef?.current?.close(),
      [bottomSheetModalRef],
    )

    const onChangeLanguage = useCallback(
      (languageCode: AppLanguageCode) => {
        dispatch(setAppLanguage(languageCode))
      },
      [dispatch],
    )

    return (
      <BottomSheetModal
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={closeModal}>
            <Icon iconName={'CloseBlack'} />
          </TouchableOpacity>
          <Text style={styles.title}>{i18next.t('ChooseLanguage')}</Text>
          {languages.map((language, idx) => {
            return (
              <View key={idx}>
                <RadioListItem
                  key={language.code}
                  checked={language.code === appLanguage}
                  title={language.title}
                  iconName={language.iconName}
                  onPress={() => onChangeLanguage(language.code)}
                />
                <View style={styles.space} ></View>
              </View>
            )
          })}
        </View>
      </BottomSheetModal>
    )
  },
)

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
  close: {
    position: 'absolute',
    right: 14,
  },
})
