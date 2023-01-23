import Lineup from "components/Livescore/Details/LineupDetails/Lineup";
import StartingLineupText from "components/Livescore/Details/LineupDetails/StartingLineupText";
import i18next from "i18next";
import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { TabBar, TabView as TabsViewLib } from "react-native-tab-view";
import { Colors } from "styles";
import { Text } from "components/common";

export const LineupSquadTabs = React.memo((props) => {
  const { onPlayerPress, data } = props;
  const [index, setIndex] = React.useState(0);
  const [componentRoutes] = React.useState(
    data.map((team) => ({
      key: team.name,
      title: team.name,
      playersMain: team.playersMain,
      playersBench: team.playersBench,
      logo: team.logo,
    })),
  );

  const renderTabBar = (tabProps) => (
    <TabBar
      {...tabProps}
      renderLabel={({ route, focused }) => {
        const textStyle = focused
          ? { color: "black", textAlign: "center", fontSize: 11 }
          : { fontSize: 11, color: Colors.textDefault };
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <FastImage
              source={{ uri: route.logo }}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
                margin: 3,
              }}
              resizeMode="contain"
            />
            <Text style={textStyle}>{route.title}</Text>
          </View>
        );
      }}
      indicatorStyle={{ backgroundColor: Colors.primary, height: 4 }}
      style={{
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
      }}
    />
  );

  const renderScene = ({ route }) => {
    return (
      <View>
        <StartingLineupText title={i18next.t("InitialComposition")} />
        <Lineup onPlayerPress={onPlayerPress} info={route.playersMain} />
        <StartingLineupText title={i18next.t("SpareChair")} />
        <Lineup onPlayerPress={onPlayerPress} info={route.playersBench} />
      </View>
    );
  };

  return (
    <TabsViewLib
      swipeEnabled
      navigationState={{ index, routes: componentRoutes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
});
