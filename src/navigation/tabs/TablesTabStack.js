import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import { StandingScreen } from "screens/Standing";
import { LiveScoreDetails, PlayerScoreDetails, TeamScoreDetails } from "screens/livescrore";
import { NewsDetailsScreen, NewsScreen } from "screens/news";

const Stack = createStackNavigator();

const TablesTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="standing" component={StandingScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="liveScoreDetails" component={LiveScoreDetails} />
      <Stack.Screen name="teamScore" component={TeamScoreDetails} />
      <Stack.Screen name="playerScore" component={PlayerScoreDetails} />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({ title: route.params.title, animationEnabled: false })}
      />
    </Stack.Navigator>
  );
};

export default TablesTabStack;