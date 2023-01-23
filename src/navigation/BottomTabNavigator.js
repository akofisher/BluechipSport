import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import i18next from "i18next";
import { LivescoreTabStack, NewsTabStack, TablesTabStack, VideosTabStack } from "navigation/tabs";
import TransferTabStack from "navigation/tabs/TransfersTabStack";
import React, { useMemo } from "react";
import { Image } from "react-native";
import Colors from "styles/colors";

import { ICONS } from "../../assets/icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const TABS = useMemo(
    () => [
      {
        name: "NewsTab",
        tabBarLabel: i18next.t("News"),
        icon: ICONS.tabBar.news,
        activeIcon: ICONS.tabBar.activeNews,
        stack: NewsTabStack,
      },
      {
        name: "LivescoreTab",
        tabBarLabel: i18next.t("Score"),
        icon: ICONS.tabBar.liveScore,
        activeIcon: ICONS.tabBar.activeLiveScore,
        stack: LivescoreTabStack,
      },
      {
        name: "VideoTab",
        tabBarLabel: i18next.t("Standings"),
        icon: ICONS.tabBar.standings,
        activeIcon: ICONS.tabBar.activeStandings,
        stack: VideosTabStack,
      },
      {
        name: "TablesTab",
        tabBarLabel: i18next.t("Tips"),
        icon: ICONS.tabBar.tips,
        activeIcon: ICONS.tabBar.activeTips,
        stack: TablesTabStack,
      },
      {
        name: "TransfersTab",
        tabBarLabel: i18next.t("MyTeam"),
        icon: ICONS.tabBar.myTeam,
        activeIcon: ICONS.tabBar.activeMyTeam,
        stack: TransferTabStack,
      },
    ],
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName="NewsTab"
      tabBarOptions={{
        activeTintColor: Colors.pink,
        inactiveTintColor: Colors.gray,
        labelStyle: { fontSize: 11, fontWeight: "500", fontFamily: "Jost" },
      }}
    >
      {TABS.map((tab) => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.stack}
            options={{
              tabBarLabel: tab.tabBarLabel,
              tabBarIcon: ({ focused }) => {
                return <Image source={focused ? tab.activeIcon : tab.icon} />;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
