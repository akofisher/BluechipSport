import MatchDiscussion from "components/Livescore/Details/matchDiscussion/matchDiscussion";
import Standing from "components/Livescore/Details/standingsDetails/Standing";
import { Separator } from "components/common";
import Spinner from "components/common/Spinner";
import { Header } from "components/header";
import i18next from "i18next";
import React, { useState, useEffect, useMemo } from "react";
import { View, Share, ScrollView } from "react-native";
import { API } from "services";
import { cxs } from "styles";

import H2H from "../../components/Livescore/Details/H2HDetails/H2H";
import LineupDetails from "../../components/Livescore/Details/LineupDetails/LineupDetails";
import MatchCenterDetails from "../../components/Livescore/Details/MatchCenterDetails/MatchCenterDetails";
import StatisticsDetails from "../../components/Livescore/Details/StatisticsDetails/StatisticsDetails";
import LocalteamVisitorteamLive from "../../components/Livescore/commonDetails/LocalteamVisitorteamLive";
import ScrollViewHorizontalCommon from "../../components/Livescore/commonDetails/ScrollViewHorizontalCommon";

const LiveScoreDetails = ({ route, navigation }) => {
  const TYPES = {
    CENTRE: i18next.t("MatchCenter"),
    STAT: i18next.t("Statistic"),
    LINEUP: i18next.t("Composition"),
    H2H: i18next.t("TeamMeetings"),
    STANDING: i18next.t("Tables"),
    DISCUSSION: i18next.t("Discussion"),
  };

  const details = [
    TYPES.CENTRE,
    TYPES.STAT,
    TYPES.LINEUP,
    TYPES.H2H,
    TYPES.STANDING,
    TYPES.DISCUSSION,
  ];

  const [visibleDetail, setVisibleDetail] = useState(details[0]);
  const [visibleDetails, setVisibleDetails] = useState(details);
  const [isDataCheckInProgress, setIsDataCheckInProgress] = useState(true);
  const { item, ligueName, time_status } = route.params;
  const [shareLink, setShareLink] = useState();
  const [standing, setStanding] = useState({ isLoading: true });

  useEffect(() => {
    setIsDataCheckInProgress(true);
    API.getLineUp({ kwds: { id: item.match_id } })
      .then(({ data }) => {
        const a = details.filter((detail) => {
          if (detail === TYPES.CENTRE || detail === TYPES.STAT) {
            return item.time_status !== "NS";
          }

          if (detail === TYPES.LINEUP) {
            return data.lineup?.length;
          }

          return true;
        });

        setVisibleDetails(a);
        setVisibleDetail(a[0]);
      })
      .finally(() => setIsDataCheckInProgress(false));
  }, []);

  useEffect(() => {
    API.leaguesTeamStandings({ kwds: { leagueID: item.league_id } })
      .then(({ data }) => {
        setStanding(data[0]?.standings, { isLoading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [item.league_id]);

  useEffect(() => {
    const req = API.getLeaguesInfo({ kwds: { leagueID: item.league_id } })
      .then(({ data }) => {
        setShareLink(data.share_link);
      })
      .catch((error) => {
        console.warn(error);
      });
    return req.cancelRequest;
  }, []);

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
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header title={ligueName} leftAction={headerLeftAction} rightAction={headerRightAction} />
      <ScrollView>
        <View style={{ backgroundColor: "white", width: "100%" }}>
          <LocalteamVisitorteamLive items={item} navigation={navigation} />
          <Separator />
          <ScrollViewHorizontalCommon
            details={visibleDetails}
            setVisibleDetail={setVisibleDetail}
            visibleDetail={visibleDetail}
          />
        </View>
        {isDataCheckInProgress ? (
          <Spinner style={{ marginTop: 20 }} />
        ) : visibleDetail === TYPES.CENTRE ? (
          <MatchCenterDetails match_id={item?.match_id} item={item} time_status={time_status} />
        ) : visibleDetail === TYPES.STAT ? (
          <StatisticsDetails
            match_id={item?.match_id}
            navigation={navigation}
            time_status={time_status}
          />
        ) : visibleDetail === TYPES.LINEUP ? (
          <LineupDetails match_id={item.match_id} />
        ) : visibleDetail === TYPES.H2H ? (
          <H2H match_id={item?.match_id} />
        ) : visibleDetail === TYPES.STANDING ? (
          <View style={cxs.my20}>
            <Standing standing={standing} navigation={navigation} screenName={route.name} />
          </View>
        ) : (
          visibleDetail === TYPES.DISCUSSION && <MatchDiscussion matchId={item?.match_id} />
        )}
      </ScrollView>
    </View>
  );
};

export default LiveScoreDetails;
