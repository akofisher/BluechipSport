import News from "components/Livescore/TeamScreenDetails/NewsDetails/News";
import OverviewDetails from "components/Livescore/TeamScreenDetails/OverviewDetails/OverviewDetails";
import Statistic from "components/Livescore/TeamScreenDetails/StatisticDetails/Statistic";
import Standing from "components/Livescore/TeamScreenDetails/StendingDetails/Standing";
import Transfers from "components/Livescore/TeamScreenDetails/TransfersDetails/Transfers";
import { Separator } from "components/common";
import { BackButton, Header, ShareButton, Title } from "components/header";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, Share, ScrollView } from "react-native";
import { API } from "services";
import { useGlobalState } from "stores";
import { cxs } from "styles";
import Colors from "styles/colors";

import LineupDetails from "../../components/Livescore/TeamScreenDetails/LineupDetails/LineupDetails";
import MatchsDetails from "../../components/Livescore/TeamScreenDetails/MatchsDetails/MatchsDetails";
import TeamLogoNameSubscribe from "../../components/Livescore/TeamScreenDetails/TeamScreencommonDetails/TeamLogoNameSubscribe";
import ScrollViewHorizontalCommon from "../../components/Livescore/commonDetails/ScrollViewHorizontalCommon";

const TYPES = {
  NEWS: i18next.t("News"),
  MATCHES: i18next.t("Matches"),
  TABLES: i18next.t("Tables"),
  COMPOSITION: i18next.t("Composition"),
  STATISTICS: i18next.t("Statistic"),
  TRANSFERS: i18next.t("Transfers"),
  OVERVIEW: i18next.t("Review"),
};

const details = [
  // TYPES.OVERVIEW,
  TYPES.NEWS,
  TYPES.MATCHES,
  TYPES.TABLES,
  TYPES.COMPOSITION,
  TYPES.STATISTICS,
  // TYPES.TRANSFERS,
];

export default function TeamScoreDetails({ navigation, route }) {
  const [visibleDetails, setVisibleDetail] = useState(details[0]);
  const { TeamId, TeamName, teamLogo, isSubscribed } = route.params;
  const [clubName, setClubName] = useState();
  const [set, setState] = useState();
  const [shareLink, setShareLink] = useState();
  const { Refresh, myRefresh } = useGlobalState();
  const [isloading, setisloading] = useState(true);
  const [leagues, setLeagues] = useState(null);

  useEffect(() => {
    const req = API.getClubInfo({ kwds: { teamID: TeamId } })
      .then(({ data }) => {
        setClubName(data.name);
        setShareLink(data.share_link);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {});

    API.getTeamsStanding({ kwds: { id: TeamId } }).then(({ data }) => {
      const leaguesResponse = data.data.map((item) => item.league);
      setLeagues(leaguesResponse);
    });

    return req.cancelRequest;
  }, [TeamId, myRefresh]);

  const subTeam = () => {
    API.subscribePostTeam({ kwds: { teamID: TeamId } })
      .then((response) => {})
      .catch((error) => console.error(error));
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
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

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header>
        <BackButton />
        <Title title={TeamName} />
        <View style={[cxs.row, cxs.alignCenter]}>
          <ShareButton onPress={onShare} />
        </View>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: Colors.white }}>
          <TeamLogoNameSubscribe
            itemType="teams"
            clubName={clubName}
            route={route}
            id={TeamId}
            set={set}
            setState={setState}
            teamLogo={teamLogo}
            subTeam={subTeam}
            isSubscribed={isSubscribed}
          />
          <Separator />
          <ScrollViewHorizontalCommon
            details={details}
            visibleDetail={visibleDetails}
            setVisibleDetail={setVisibleDetail}
          />
        </View>
        <View style={{ flex: 1 }}>
          {visibleDetails === TYPES.MATCHES ? (
            <MatchsDetails id={TeamId} navigation={navigation} screenName={route.name} />
          ) : visibleDetails === TYPES.COMPOSITION ? (
            <LineupDetails navigation={navigation} id={TeamId} screenName={route.name} />
          ) : visibleDetails === TYPES.NEWS ? (
            <View style={cxs.py10}>
              <News id={TeamId} screenName={route.name} />
            </View>
          ) : visibleDetails === TYPES.TABLES ? (
            <Standing id={TeamId} navigation={navigation} screenName={route.name} />
          ) : visibleDetails === TYPES.STATISTICS ? (
            <Statistic id={TeamId} leagues={leagues} navigation={navigation} />
          ) : visibleDetails === TYPES.TRANSFERS ? (
            <Transfers id={TeamId} navigation={navigation} />
          ) : visibleDetails === TYPES.OVERVIEW ? (
            <OverviewDetails
              id={TeamId}
              onSeeMoreNewsPress={() => setVisibleDetail(TYPES.NEWS)}
              onSeeFullStandingPress={() => setVisibleDetail(TYPES.TABLES)}
              navigation={navigation}
              screenName={route.name}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
