import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import TransfersScreen from "screens/transfers/TransfersScreen";

const Stack = createStackNavigator();

const TransferTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="News" component={TransfersScreen} />
    </Stack.Navigator>
  );
};

export default TransferTabStack;
