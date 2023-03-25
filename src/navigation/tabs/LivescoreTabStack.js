import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import {
  LivescoreScreen,
  LiveScoreDetails,
  TeamScoreDetails,
  PlayerScoreDetails,
  LeagueScoreDetails,
} from 'screens/livescrore';
import { NewsDetailsScreen } from 'screens/news';
import MatchDetails from '../../components/matchDetails';
import MatchDetailsScreen from '../../screens/Match Details/MatchDetailsScreen';
import PlayerScreen from '../../screens/player/PlayerScreen';

const Stack = createStackNavigator();

const LivescoreTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none">
      <Stack.Screen name="Livescore" component={LivescoreScreen} />
      <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
      <Stack.Screen name="MatchDetailsNew" component={MatchDetails} />
      <Stack.Screen name="liveScoreDetails" component={LiveScoreDetails} />
      <Stack.Screen name="teamScore" component={TeamScoreDetails} />
      <Stack.Screen name="playerScore" component={PlayerScoreDetails} />
      <Stack.Screen name="League" component={LeagueScoreDetails} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
          animationEnabled: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default LivescoreTabStack;
