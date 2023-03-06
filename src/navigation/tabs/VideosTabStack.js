import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import { NewsDetailsScreen } from "screens/news";
import PlayerScreen from "screens/player/PlayerScreen";
import TeamScreen from "screens/team/TeamScreen";
import Competition from "../../screens/Standings/Competition";
import StandingsScreen from "../../screens/Standings/Standings";

const Stack = createStackNavigator();

const VideosTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="StandingsScreen" component={StandingsScreen} />
      <Stack.Screen name="Competition" component={Competition} />
      <Stack.Screen name="TeamScreen" component={TeamScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />

      {/* <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({ title: route.params.title, animationEnabled: false })}
      /> */}
    </Stack.Navigator>
  );
};

export default VideosTabStack;
