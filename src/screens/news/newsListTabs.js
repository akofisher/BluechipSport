import i18next from "i18next";
import React from "react";
import { StyleSheet } from "react-native";
import { TabBar, TabView as TabsViewLib } from "react-native-tab-view";
import { NewsVerticalList } from "screens/news/NewsVerticalList";
import { API } from "services";
import { Colors } from "styles";
import { Text } from "components/common";

export const NewsListTabs = React.memo((props) => {
  const TABS = {
    MAIN: i18next.t("MainNews"),
    LATEST: i18next.t("LatestNews"),
  };
  const { openDetails, refreshing } = props;
  const [index, setIndex] = React.useState(0);
  const [componentRoutes] = React.useState(Object.values(TABS).map((key) => ({ key, title: key })));

  const renderTabBar = (tabProps) => (
    <TabBar
      {...tabProps}
      renderLabel={({ route, focused }) => {
        return <Text style={focused ? st.textFocused : st.textStyle}>{route.title}</Text>;
      }}
      indicatorStyle={st.indicator}
      contentContainerStyle={st.contentContainer}
      style={st.tabBar}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case TABS.MAIN:
        return (
          <NewsVerticalList
            refreshing={refreshing}
            isFullSizeItem
            getAPI={API.getLatestArticles}
            listKey="main"
            openDetails={openDetails}
          />
        );
      case TABS.LATEST:
        return (
          <NewsVerticalList
            refreshing={refreshing}
            getAPI={API.getLatestArticles}
            listKey="latest"
            openDetails={openDetails}
          />
        );
    }
  };

  return (
    <>
      <TabsViewLib
        swipeEnabled={false}
        navigationState={{ index, routes: componentRoutes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </>
  );
});

const st = StyleSheet.create({
  textStyle: {
    color: Colors.textDefault,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.02,
    textTransform: "uppercase",
  },
  indicator: { backgroundColor: Colors.primary, height: 4 },
  contentContainer: { backgroundColor: "rgba(238, 238, 238, 0.3)" },
  tabBar: {
    backgroundColor: "rgba(238, 238, 238, 0.3)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    shadowColor: "#fff",
  },
  textFocused: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.02,
    textTransform: "uppercase",
  },
});
