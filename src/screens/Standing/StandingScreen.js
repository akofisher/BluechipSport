import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import Standing from "components/Livescore/Details/standingsDetails/Standing";
import ScrollViewHorizontalCommon from "components/Livescore/commonDetails/ScrollViewHorizontalCommon";
import PopLeagueMatchs from "components/PopularLeague/Matchs/PopLeagueMatchs";
import { Spinner } from "components/common";
import SearchBox from "components/common/SearchBox";
import { Header } from "components/header";
import i18next from "i18next";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StandingPlayerStatistic } from "screens/Standing/StandingPlayerStatistic";
import { API } from "services";
import Colors from "styles/colors";
import cxs from "styles/cxs";

import { ArrowDownSvg } from "../../../assets/svgs/AllSvgs";

const TYPES = {
  STANDING: i18next.t("Table"),
  MATHCES: i18next.t("Matches"),
  STAT: i18next.t("Statistics"),
};

const details = [TYPES.STANDING, TYPES.MATHCES, TYPES.STAT];

export default function StandingScreen({ navigation, route }) {
  const [standing, setStanding] = useState(null);
  const [leagues, setLeagues] = useState(null);
  const [activeLeague, setActiveLeague] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleDetails, setVisibleDetails] = useState(TYPES.STANDING);
  const [err, setErr] = useState();

  const bottomSheetModalRef = useRef(null);
  const presentLeagueModal = () => bottomSheetModalRef.current.present();
  const close = () => bottomSheetModalRef.current.close();
  const snapPoints = useMemo(() => ["10%", "75%"], []);

  useEffect(() => {
    setIsLoading(true);
    API.getLeaguesList()
      .then(({ data }) => {
        setActiveLeague(data.data[0]);
        setLeagues(data.data);
      })
      .catch((error) => {
        setErr(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!activeLeague) {
      return;
    }

    setIsLoading(true);
    API.leaguesTeamStandings({ kwds: { leagueID: activeLeague.league_id } })
      .then(({ data }) => {
        setStanding(data[0]?.standings, { isLoading: false });
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeLeague]);

  const leaguesFiltered = leagues?.filter((item) => {
    if (!search) {
      return true;
    }
    return item.name?.includes(search) || item.country_name?.includes(search);
  });

  const renderContent = () => {
    if (!activeLeague) {
      return null;
    }

    if (visibleDetails === TYPES.MATHCES) {
      return <PopLeagueMatchs id={activeLeague.league_id} navigation={navigation} />;
    }

    if (visibleDetails === TYPES.STANDING) {
      return (
        <Standing
          err={err}
          containerStyle={cxs.pt0}
          LeagueId={activeLeague.league_id}
          standing={standing}
          navigation={navigation}
          screenName={route.name}
        />
      );
    }

    if (visibleDetails === TYPES.STAT) {
      return (
        <StandingPlayerStatistic
          leagueId={activeLeague.league_id}
          seasonId={activeLeague.current_season_id}
          navigation={navigation}
        />
      );
    }
  };

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
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header rightAction={headerRightActions} />
      <TouchableOpacity
        onPress={presentLeagueModal}
        style={[cxs.row, cxs.px20, cxs.alignCenter, cxs.justifyBetween]}
      >
        <View style={[cxs.row, cxs.alignCenter]}>
          <Image
            source={{ uri: activeLeague?.icon }}
            style={[{ width: 30, height: 30 }, cxs.m10]}
          />
          <Text>{activeLeague?.name}</Text>
        </View>
        <ArrowDownSvg />
      </TouchableOpacity>
      {isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <ScrollView style={{ backgroundColor: Colors.white, borderRadius: 25 }}>
          <ScrollViewHorizontalCommon
            details={details}
            setVisibleDetail={setVisibleDetails}
            visibleDetail={visibleDetails}
          />
          {renderContent()}
        </ScrollView>
      )}
      <BottomSheetModal
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        enablePanDowntoClose
        snapPoints={snapPoints}
      >
        <View style={[cxs.px15, cxs.flex]}>
          <SearchBox
            setSearch={setSearch}
            search={search}
            placeholder={i18next.t("EnterLeagueName")}
            onChangeText={setSearch}
            onClear={() => setSearch("")}
            style={{
              marginTop: 32,
              backgroundColor: "white",
            }}
          />
          <FlatList
            style={{ flex: 1 }}
            data={leaguesFiltered}
            initialNumToRender={10}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.leagueItem}
                  key={item.league_id + item.priority}
                  onPress={() => {
                    setActiveLeague(item);
                    close();
                  }}
                >
                  <Image source={{ uri: item.icon }} style={styles.selectorIcon} />
                  <Text style={styles.fontWeight700}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  leagueItem: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 13,
    marginVertical: 5,
    alignItems: "center",
  },
  selectorIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  fontWeight700: {
    fontWeight: "700",
    fontSize: 12,
  },
});
