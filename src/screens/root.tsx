import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { RootDrawerNavigator, WelcomeStackNavigator } from 'navigation'
import React, { useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import { useNotifications } from 'screens/hooks/useNotifications'
import { API } from 'services'
import { useAuth, useDevice, useLanguage, welcomeBackState } from 'stores'
import { RuntimeConsts } from 'utils'
import { useSelector } from 'react-redux'
import { initAppLanguage } from '../store/thunks/appThunks'
import { selectAppLanguage } from '../store/selectors/appSelectors'
import { useAppDispatch } from '../store'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
}

export default function Root() {
  const [isLoading, setIsLoading] = useState(true)
  const { authState, checkToken, checkFirstLaunch } = useAuth()
  const { deviceId, getDeviceId } = useDevice()
  const appLanguage = useSelector(selectAppLanguage)

  const { WelcomeBack, welcome } = welcomeBackState()

  const dispatch = useAppDispatch()

  useEffect(async () => {
    await checkToken()
    await getDeviceId()
    const isAppLaunchedBefore = await checkFirstLaunch()
    WelcomeBack(!isAppLaunchedBefore)
    await RNBootSplash.hide()
    dispatch(initAppLanguage())
    setIsLoading(false)
  }, [setIsLoading, dispatch, initAppLanguage])

  useNotifications()

  RuntimeConsts.token = authState.token
  RuntimeConsts.deviceId = deviceId
  RuntimeConsts.notificationToken = null
  // AsyncStorage.getItem('notificationToken').then((t) => {
  //   RuntimeConsts.notificationToken = t
  //   if (
  //     !RuntimeConsts.notificationToken &&
  //     typeof RuntimeConsts.deviceId === 'string'
  //   ) {
  //     messaging()
  //       .getToken(firebase?.app().options.messagingSenderId)
  //       .then(async (x) => {
  //         API.registerNotificationToken({
  //           kwds: {
  //             deviceId: RuntimeConsts.deviceId,
  //             token: x,
  //           },
  //         }).then(({ data }) => {
  //           AsyncStorage.setItem('notificationToken', x)
  //           RuntimeConsts.notificationToken = x
  //         })
  //       })
  //   }
  // })

  const renderStack = () => {
    // if (welcome && !authState.token) {
    //   return <WelcomeStackNavigator />;
    // }

    // if (isLoading) {
    //   return null;
    // }

    return <RootDrawerNavigator />
  }

  return (
    <BottomSheetModalProvider key={appLanguage}>
      <NavigationContainer theme={MyTheme}>{renderStack()}</NavigationContainer>
    </BottomSheetModalProvider>
  )
}
