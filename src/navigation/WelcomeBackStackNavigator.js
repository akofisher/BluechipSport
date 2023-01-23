import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import { LoginScreen, RegisterScreen, ResetScreen } from "screens/welcome/auth";
import { Colors } from "styles";

const Stack = createStackNavigator();

const WelcomeBackStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.welcomeBackground },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Reset" component={ResetScreen} />
      <Stack.Screen name="SignUp" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeBackStackNavigator;
