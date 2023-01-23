import { Header } from "components/header";
import React, { useMemo } from "react";
import { View } from "react-native";
import { NewsVerticalList } from "screens/news/NewsVerticalList";
import { API } from "services";
import { cxs } from "styles";

const VideosScreen = ({ navigation }) => {
  const openNewsDetails = React.useCallback((id, title, mainVideoUrl) => {
    navigation.navigate("NewsDetails", {
      articleId: id,
      title,
      mainVideoUrl,
    });
  }, []);

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
      <Header rightAction={headerRightActions} />
      <NewsVerticalList
        isFullSizeItem
        isVideoItem
        getAPI={API.getVideoArticles}
        listKey="videos"
        openDetails={openNewsDetails}
      />
    </View>
  );
};

export default VideosScreen;
