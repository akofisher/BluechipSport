import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import { LoginScreen, RegisterScreen, ResetScreen } from 'screens/welcome/auth'
import {
  SubscribeTeamsScreen,
  SubscribePlayersScreen,
} from 'screens/welcome/subscribe'
import { useAuth } from 'stores'
import { Colors } from 'styles'

const Stack = createStackNavigator()

const WelcomeStackNavigator = () => {
  const { isAppLaunchedBefore, authSkipped } = useAuth()

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.welcomeBackground },
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
      initialRouteName={isAppLaunchedBefore || authSkipped ? 'Login' : 'Teams'}
    >
      <Stack.Screen name="Teams" component={SubscribeTeamsScreen} />
      <Stack.Screen name="Players" component={SubscribePlayersScreen} />
    </Stack.Navigator>
  )
}

export default WelcomeStackNavigator
