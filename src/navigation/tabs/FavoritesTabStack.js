import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Text, Button } from "components/common";
import React from "react";
import { View } from "react-native";
import { cxs } from "styles";

const FavoritesDetails = () => {
  return (
    <View style={[cxs.flex, cxs.alignCenter, cxs.justifyCenter]}>
      <Text>Favorites Details</Text>
    </View>
  );
};

const Favorites = ({ navigation }) => {
  return (
    <View style={[cxs.flex, cxs.alignCenter, cxs.justifyCenter]}>
      <Text style={[cxs.mb10]}>Favorites</Text>
      <Button onPress={() => navigation.navigate("FavoritesDetails")} title="Go to details" />
    </View>
  );
};

const Stack = createStackNavigator();

const FavoritesTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="FavoritesDetails" component={FavoritesDetails} />
    </Stack.Navigator>
  );
};

export default FavoritesTabStack;
