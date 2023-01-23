import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useScrollToTop } from "@react-navigation/native";
import { Separator, Spinner, IconPressable } from "components/common";
import { Header, MenuButton, SearchButton, NewsHeader } from "components/header";
import { HorizontalListItem } from "components/news";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { CategoriesList } from "screens/news/categoriesList";
import { NewsListTabs } from "screens/news/newsListTabs";
import TeamListItem from "screens/news/teamListItem";
import { processGetArticlesResponse } from "screens/news/utils";
import { SubscribeModal } from "screens/subscribe";
import { IsCancel, CancelSource, API } from "services";
import { useSubscribe, useDevice } from "stores";
import useGlobalState from "stores/useGlobalState";
import { cxs } from "styles";
import { RuntimeConsts } from "utils";

const SUBSCRIPTION_TYPE = {
  TEAM: "team",
  LEAGUE: "league",
  PLAYER: "player",
};

const FLAT_LIST_ITEMS = {
  HORIZONTAL_SLIDES: "HORIZONTAL_SLIDES",
  TABS: "TABS",
};

const FLAT_LIST_DATA = [{ key: FLAT_LIST_ITEMS.HORIZONTAL_SLIDES }, { key: FLAT_LIST_ITEMS.TABS }];

const NewsScreen = ({ navigation }) => {
  const mainRef = React.useRef(null);
  useScrollToTop(
    React.useRef({
      scrollToTop: () => {
        Refresh(new Date().valueOf());
        setRefreshing(true);
        setRefreshing(false);
        mainRef.current?.scrollToIndex({ index: 0 });
      },
    }),
  );

  const { subscriptions } = useSubscribe();
  const [isLoading, setIsLoading] = useState(true);
  const [slideArticles, setSlideArticles] = useState([]);
  const [league, setLeague] = useState("");
  const [LeagueLogo, setLeagueLogo] = useState();
  const [info, setInfo] = useState();
  const [subscriptionsFromAPI, setSubscriptionsFromAPI] = useState();

  const [leagueId, setLeagueId] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { deviceId } = useDevice();

  const source = CancelSource();
  const { Refresh, myRefresh } = useGlobalState();

  const bottomSheetModalRef = useRef(null);
  const present = () => bottomSheetModalRef.current.present();
  const close = () => bottomSheetModalRef.current.close();
  const snapPoints = useMemo(() => ["10%", "75%"], []);

  const getMySubscriptions = async () => {
    API.getMySubscriptions({ cancelToken: source.token })
      .then(({ data }) => {
        setSubscriptionsFromAPI(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getMySubscriptions();
    API.all([
      API.getSlideArticles({ cancelToken: source.token }),
      API.getLiveMatches({ cancelToken: source.token }),
    ])
      .then((responses) => {
        const [slideResponse, liveMatches] = responses;
        setSlideArticles(processGetArticlesResponse(slideResponse?.data?.data?.slice(0, 5)));
        setLeague(liveMatches.data.data[0]?.name);
        setLeagueId(liveMatches.data.data[0]?.league_id);
        setInfo(liveMatches.data.data);
        setLeagueLogo(liveMatches.data.data[0]?.image_path);
      })
      .catch((error) => {
        IsCancel(error);
      })
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
    return source.cancel;
  }, [myRefresh]);

  const listData = [
    ...subscriptions.teams.map((team) => ({ ...team, type: SUBSCRIPTION_TYPE.TEAM })),
    ...subscriptions.leagues.map((team) => ({ ...team, type: SUBSCRIPTION_TYPE.LEAGUE })),
    ...subscriptions.players.map((team) => ({ ...team, type: SUBSCRIPTION_TYPE.PLAYER })),
  ];

  const renderItem = ({ item }) => {
    if (item.key === FLAT_LIST_ITEMS.HORIZONTAL_SLIDES) {
      return renderHorizontalSlides();
    }

    if (item.key === FLAT_LIST_ITEMS.TABS) {
      return <NewsListTabs openDetails={openNewsDetails} refreshing={refreshing} />;
    }
  };

  const renderHorizontalSlides = () => {
    return (
      <>
        <View style={{ backgroundColor: "#f6f6f6" }}>
          <FlatList
            listKey="subscriptions.teams"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={RuntimeConsts.token != null ? subscriptionsFromAPI : listData}
            extraData={RuntimeConsts.token != null ? subscriptionsFromAPI : listData}
            keyExtractor={(item) => item?.id?.toString()}
            contentContainerStyle={[cxs.px20, cxs.py15, cxs.alignCenter]}
            ItemSeparatorComponent={() => <View style={cxs.m5} />}
            // ListHeaderComponent={() => (
            //   <IconPressable
            //     style={[styles.floating, styles.shadow, cxs.mr10]}
            //     name="plus"
            //     onPress={present}
            //   />
            // )}
            renderItem={({ item }) => {
              const onPress = () => {
                if (item.type === SUBSCRIPTION_TYPE.TEAM) {
                  navigation.navigate("teamScore", {
                    TeamId: item.id,
                    TeamName: item.name,
                    imageUrl: RuntimeConsts.token != null ? item.image : item.imageUrl,
                    teamLogo: RuntimeConsts.token != null ? item.image : item.imageUrl,
                    isSubscribed: item.is_subscribed,
                  });
                }

                if (item.type === SUBSCRIPTION_TYPE.LEAGUE) {
                  navigation.navigate("Leaguee", { rame: true, leagueId: item.id });
                }

                if (item.type === SUBSCRIPTION_TYPE.PLAYER) {
                  navigation.navigate("playerScore", { PlayerId: item.id });
                }
              };

              return (
                <TeamListItem
                  onPress={onPress}
                  imageURI={RuntimeConsts.token != null ? item.image : item.imageUrl}
                />
              );
            }}
          />
        </View>
        {info && LeagueLogo && leagueId && (
          <NewsHeader
            navigation={navigation}
            info={info}
            League={league}
            leagueId={leagueId}
            LeagueLogo={LeagueLogo}
            deviceId={deviceId}
          />
        )}
        <FlatList
          listKey="slideArticles"
          horizontal
          decelerationRate="normal"
          showsHorizontalScrollIndicator={false}
          data={slideArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HorizontalListItem
              itemData={item}
              onPress={() => openNewsDetails(item.id, item.title, item?.mainVideoUrl)}
            />
          )}
        />
        <Separator />
      </>
    );
  };

  const openNewsDetails = React.useCallback((id, title, mainVideoUrl) => {
    navigation.navigate("NewsDetails", {
      articleId: id,
      title,
      mainVideoUrl,
    });
  }, []);

  const openLeague = React.useCallback(
    (leagueId) => navigation.navigate("Leaguee", { rame: false, leagueId }),
    [],
  );
  const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);

  const renderListHeader = useCallback(() => {
    const rightAction = [
      {
        onPress: onSearchPress,
        iconName: "Search",
      },
      {
        onPress: navigation.openDrawer,
        iconName: "Menu",
      },
    ];
    return <Header rightAction={rightAction} />;
  }, [onSearchPress, navigation.openDrawer]);

  return (
    <View style={cxs.flex}>
      {isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <FlatList
          ref={mainRef}
          keyExtractor={(item) => item.key}
          data={FLAT_LIST_DATA}
          ListHeaderComponent={renderListHeader}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            Refresh(new Date().valueOf());
          }}
        />
      )}
      <BottomSheetModal
        enablePanDowntoClose
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <SubscribeModal onSubmit={close} userTeams={subscriptionsFromAPI} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  floating: {
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default NewsScreen;
