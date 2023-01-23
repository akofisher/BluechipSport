import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Header } from "components/header";
import i18next from "i18next";
import React, { useState, useRef, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NewsVerticalList } from "screens/news/NewsVerticalList";
import { TransferListTabs } from "screens/transfers/transfersListTabs";
import { API } from "services";
import { cxs } from "styles";
import { Text } from "components/common";

const TransfersScreen = ({ navigation }) => {
  const TABS = {
    NEWS: i18next.t("News"),
    LIST: i18next.t("TransferTable"),
  };
  const [activeTab, setActiveTab] = useState(TABS.NEWS);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "75%"], []);

  const openNewsDetails = React.useCallback((id, title, mainVideoUrl) => {
    navigation.navigate("NewsDetails", {
      articleId: id,
      title,
      mainVideoUrl,
    });
  }, []);

  const TopHeader = () => (
    <View style={styles.topMenu}>
      <TouchableOpacity
        style={[cxs.pl20, cxs.p10, cxs.alignCenter]}
        onPress={() => setActiveTab(TABS.NEWS)}
      >
        <Text style={styles.categoryText}>{i18next.t("News")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[cxs.pl20, cxs.p10, cxs.alignCenter]}
        onPress={() => setActiveTab(TABS.LIST)}
      >
        <Text style={styles.categoryText}>{i18next.t("TransferTable")}</Text>
      </TouchableOpacity>
    </View>
  );

  const isNewsTabActive = activeTab === TABS.NEWS;

  const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);
  const headerRightActions = useMemo(
    () => [
      {
        onPress: onSearchPress,
        iconName: "Search",
      },
      {
        onPress: navigation.openDrawer,
        iconName: "Menu",
      },
    ],
    [navigation.openDrawer, onSearchPress],
  );

  return (
    <View style={cxs.flex}>
      <Header content={<TopHeader />} rightAction={headerRightActions} />
      <View style={cxs.flex}>
        {isNewsTabActive ? (
          <NewsVerticalList
            isFullSizeItem
            getAPI={API.getTransfersArticles}
            listKey="transfers"
            openDetails={openNewsDetails}
          />
        ) : (
          <TransferListTabs />
        )}
      </View>
      <BottomSheetModal
        enablePanDowntoClose
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
});

export default TransfersScreen;
