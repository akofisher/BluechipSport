import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import { TipsScreen } from "screens/Standing";
import { LiveScoreDetails, PlayerScoreDetails, TeamScoreDetails } from "screens/livescrore";
import { NewsDetailsScreen, NewsScreen } from "screens/news";
import PredictionScreen from "../../screens/Standing/PredictionScreen";

const Stack = createStackNavigator();

const TablesTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="TipsScreen" component={TipsScreen} />
      <Stack.Screen name="prediction" component={PredictionScreen} />
      {/* <Stack.Screen name="News" component={NewsScreen} /> */}
      {/* <Stack.Screen name="liveScoreDetails" component={LiveScoreDetails} /> */}
      {/* <Stack.Screen name="teamScore" component={TeamScoreDetails} /> */}
      {/* <Stack.Screen name="playerScore" component={PlayerScoreDetails} /> */}
      {/* <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({ title: route.params.title, animationEnabled: false })}
      /> */}
    </Stack.Navigator>
  );
};

export default TablesTabStack;
