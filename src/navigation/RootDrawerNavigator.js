import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerItems } from 'navigation/options'
import React from 'react'
import { LiveScoreDetails } from 'screens/livescrore'
import LeagueScoreDetails from 'screens/livescrore/LeagueScoreDetails'
import PlayerScoreDetails from 'screens/livescrore/PlayerScoreDetails'
import TeamScoreDetails from 'screens/livescrore/TeamScoreDetails'
import NewsCommentsScreen from 'screens/news/newsCommentsScreen'
import searchScreen from 'screens/searchScreen/searchScreen'
import UserProfileScreen from 'screens/userProfile/userProfileScreen'

import BottomTabNavigator from './BottomTabNavigator'
import { Dimensions } from 'react-native'
import LoginScreen from '../screens/welcome/auth/LoginScreen'

const { width } = Dimensions.get('window')
const Drawer = createDrawerNavigator()

const RootDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: width / 1.2,
      }}
      drawerType="front"
      drawerContent={(props) => <DrawerItems {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
      <Drawer.Screen name="teamScoreDrawer" component={TeamScoreDetails} />
      <Drawer.Screen name="teamScore" component={TeamScoreDetails} />
      <Drawer.Screen name="liveScoreDetails" component={LiveScoreDetails} />
      <Drawer.Screen name="searchScreen" component={searchScreen} />
      <Drawer.Screen name="NewsComments" component={NewsCommentsScreen} />
      <Drawer.Screen name="LeagueDrawer" component={LeagueScoreDetails} />
      <Drawer.Screen name="playerScoreDrawer" component={PlayerScoreDetails} />
    </Drawer.Navigator>
  )
}

export default RootDrawerNavigator
