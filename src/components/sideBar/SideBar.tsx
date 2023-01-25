import i18next from 'i18next'
import React, { useEffect, useRef, useMemo, useCallback, memo } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../header/Header'
import { useSelector } from 'react-redux'
import { selectAppLanguageCodeAndIcon } from '../../store/selectors/appSelectors'
import { LanguageSelectModal } from '../../screens/news/LanguageSelectModal'
import { SideBarLanguageButton } from './components/SideBarLanguageButton'
import { Accordion } from './components/Accordion'
import { IconWithTitle } from './components/IconWithTitle'
import { MenuItem } from './components/MenuItem'
import { Button, Text } from '../common'
import { Colors } from '../../styles'
import Avatar from '../common/Avatar'
import { selectCategories } from '../../store/selectors'
import { useAppDispatch } from '../../store'
import { fetchCategories } from '../../store/thunks'

const SideBar = memo(({ navigation }) => {
  const dispatch = useAppDispatch()
  const selectedLanguage = useSelector(selectAppLanguageCodeAndIcon)
  const sideBarData = useSelector(selectCategories)
  const user = true

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const bottomSheetModalRef = useRef(null)
  const openLanguageModal = useCallback(
    // @ts-ignore
    () => bottomSheetModalRef.current.present(),
    [],
  )

  const onSignInPress = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const onMyAccountPress = useCallback(() => {
    navigation.navigate('UserProfile')
  }, [navigation])

  useEffect(() => {}, [])

  const headerRightAction = useMemo(() => {
    return {
      onPress: navigation.closeDrawer,
      iconName: 'CloseBlack',
    }
  }, [navigation.closeDrawer])

  const renderLanguageButton = useCallback(() => {
    return (
      <SideBarLanguageButton
        languageCode={selectedLanguage.code}
        openLanguageModal={openLanguageModal}
        languageIconName={selectedLanguage.iconName}
      />
    )
  }, [selectedLanguage, openLanguageModal])

  return (
    <View style={styles.container}>
      <Header
        mode="light"
        rightAction={headerRightAction}
        renderTitle={renderLanguageButton}
      />
      <ScrollView>
        {sideBarData.map((game) => {
          return (
            <Accordion
              key={game.title}
              title={<IconWithTitle title={game.title} iconName={game.icon} />}
              content={
                <View>
                  {game.menuOptions.map((option) => (
                    <MenuItem
                      title={option.title}
                      onPress={() => null}
                      key={option.title}
                    />
                  ))}
                </View>
              }
            />
          )
        })}
      </ScrollView>
      <SafeAreaView style={styles.bottomContainer} edges={['bottom']}>
        {user ? (
          <TouchableOpacity
            style={styles.bottomUser}
            onPress={onMyAccountPress}
          >
            <Avatar uri={''} withEditIcon={true} />
            <Text style={styles.bottomUserName}>Rage King</Text>
          </TouchableOpacity>
        ) : (
          <Button
            big
            title={i18next.t('AUTHORIZATION')}
            onPress={onSignInPress}
            style={undefined}
          />
        )}
      </SafeAreaView>
      <LanguageSelectModal bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    padding: 15,
    paddingBottom: 0,
  },
  bottomUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomUserName: {
    color: Colors.textBlack,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
})

export default SideBar
