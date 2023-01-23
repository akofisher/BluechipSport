import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import { NewsDetailsScreen } from "screens/news";
import VideosScreen from "screens/videos/VideosScreen";

const Stack = createStackNavigator();

const VideosTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="Videos" component={VideosScreen} />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ route }) => ({ title: route.params.title, animationEnabled: false })}
      />
    </Stack.Navigator>
  );
};

export default VideosTabStack;
