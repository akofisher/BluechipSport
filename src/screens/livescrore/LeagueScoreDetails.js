import { useIsFocused } from "@react-navigation/native";
import PopLeagueMatchs from "components/PopularLeague/Matchs/PopLeagueMatchs";
import PopLeagueNews from "components/PopularLeague/News/PopLeagueNews";
import PopLeagueStandings from "components/PopularLeague/Stadnings/PopLeagueStandings";
import PopLeagueStatistics from "components/PopularLeague/Statistics/PopLeagueStatistics";
import { Separator } from "components/common";
import { Header } from "components/header";
import i18next from "i18next";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Share, FlatList, StyleSheet, ScrollView } from "react-native";
import TeamListItem from "screens/news/teamListItem";
import { CancelSource, API } from "services";
import { cxs } from "styles";
import Colors from "styles/colors";

import TeamLogoNameSubscribe from "../../components/Livescore/TeamScreenDetails/TeamScreencommonDetails/TeamLogoNameSubscribe";
import ScrollViewHorizontalCommon from "../../components/Livescore/commonDetails/ScrollViewHorizontalCommon";

export default function LeagueScoreDetails({ route, navigation }) {
  const details = [
    i18next.t("News"),
    i18next.t("Matches"),
    i18next.t("Tables"),
    i18next.t("Statistics"),
  ];

  const [visibleDetails, setVisibleDetail] = useState(details[0]);
  const [set, setState] = useState();
  const [leagueName, setLeagueName] = useState();
  const [leagueIcon, setLeagueIcon] = useState();
  const [teams, setTeams] = useState([]);
  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const { leagueId, rame } = route.params;

  const source = CancelSource();
  const [shareLink, setShareLink] = useState();
  const [scorers, setScorers] = useState(null);
  const [playerCard, setPlayerCard] = useState();
  const [playerAsist, setPlayerAsist] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setVisibleDetail(details[0]);
    }

    API.getLeaguesInfo({ kwds: { leagueID: leagueId } })
      .then(({ data: { data } }) => {
        setLeagueName(data.name);
        setLeagueIcon(data.logo_path);
        setShareLink(data.share_link);
        setTeams(data.teams);
        setCurrentSeasonId(data.current_season_id);
      })
      .catch((error) => {
        console.warn(error);
      });

    return source.cancel;
  }, [leagueId]);

  useEffect(() => {
    API.ligaStats({ kwds: { leagueId } })
      .then(({ data }) => {
        setScorers(data.goalscorers);
        setPlayerCard(data.cardscorers);
        setPlayerAsist(data.assistscorers);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [leagueId]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        // message: 'React Native | A framework for building native apps using React',
        url: shareLink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderTeamListItem = useCallback(({ item }) => {
    const onPress = () =>
      navigation.navigate("teamScore", {
        TeamId: item.team_id,
        TeamName: item.name,
        imageUrl: item.logo_path,
        teamLogo: item.logo_path,
      });

    return <TeamListItem imageURI={item.logo_path} onPress={onPress} />;
  }, []);

  const headerRightAction = useMemo(
    () => ({
      onPress: onShare,
      iconName: "Share",
    }),
    [onShare],
  );

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: "ArrowRight",
    }),
    [navigation.goBack],
  );

  return (
    isFocused && (
      <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
        <Header leftAction={headerLeftAction} rightAction={headerRightAction} title={leagueName} />
        <ScrollView>
          <View style={{ backgroundColor: "white" }}>
            <FlatList
              contentContainerStyle={[cxs.px20, cxs.py15, cxs.alignCenter, cxs.h50]}
              style={[cxs.py10, { backgroundColor: Colors.gray }]}
              ItemSeparatorComponent={() => <View style={cxs.m5} />}
              listKey="league.teams"
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderTeamListItem}
              data={teams}
            />
            <TeamLogoNameSubscribe
              itemType="leagues"
              id={leagueId}
              setState={setState}
              set={set}
              clubName={leagueName}
              leagueIcon={leagueIcon}
            />
            <Separator />
            <ScrollViewHorizontalCommon
              details={details}
              visibleDetail={visibleDetails}
              setVisibleDetail={setVisibleDetail}
            />
          </View>
          <View style={{ flex: 1 }}>
            {visibleDetails === i18next.t("Matches") ? (
              <View style={styles.card}>
                <PopLeagueMatchs id={leagueId} navigation={navigation} />
              </View>
            ) : visibleDetails === i18next.t("News") ? (
              <View style={cxs.py10}>
                <PopLeagueNews id={leagueId} rame={rame} />
              </View>
            ) : visibleDetails === i18next.t("Tables") ? (
              <PopLeagueStandings id={leagueId} navigation={navigation} screenName={route.name} />
            ) : visibleDetails === i18next.t("Statistics") ? (
              <View>
                <PopLeagueStatistics
                  id={leagueId}
                  seasonID={currentSeasonId}
                  navigation={navigation}
                  scorers={scorers}
                  playerCard={playerCard}
                  playerAsist={playerAsist}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
