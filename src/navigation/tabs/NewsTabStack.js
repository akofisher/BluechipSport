import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import {
  LiveScoreDetails,
  LivescoreScreen,
  TeamScoreDetails,
  PlayerScoreDetails,
  LeagueScoreDetails,
} from "screens/livescrore";
import { NewsScreen, NewsDetailsScreen } from "screens/news";

const Stack = createStackNavigator();

const NewsTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="News" component={NewsScreen} />

      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
          animationEnabled: !route.params.mainVideoUrl,
        })}
      />

      <Stack.Screen name="Livescore" component={LivescoreScreen} />
      <Stack.Screen name="Leaguee" component={LeagueScoreDetails} />
      <Stack.Screen name="liveScoreDetails" component={LiveScoreDetails} />
      <Stack.Screen name="teamScore" component={TeamScoreDetails} />
      <Stack.Screen name="playerScore" component={PlayerScoreDetails} />
    </Stack.Navigator>
  );
};

export default NewsTabStack;
