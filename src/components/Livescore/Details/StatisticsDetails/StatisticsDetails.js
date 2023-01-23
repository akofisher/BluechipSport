import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { API } from "services";

import MatchStatistics from "./MatchStatistics/MatchStatistics";
import Players from "./Players/Players";
import Comparison from "./PlayersComparison/Comparison";
import ScrollViewHorizontal from "./ScrollViewHorizontal";

const details = [i18next.t("Match"), i18next.t("Footballers"), i18next.t("Comparison")];

export default function StatisticsDetails({ match_id, navigation, time_status }) {
  const [visibleDetails, setVisibleDetails] = useState(details[0]);
  const [statistics, setStatistics] = useState();
  const [isloading, setisloading] = useState(true);

  const [players, setPlayers] = useState();

  useEffect(() => {
    API.all([
      API.liveMatchStatistic({ kwds: { match_id } }),
      API.liveMatchPlayer({ kwds: { match_id } }),
    ])
      .then((responses) => {
        const [liveMatchStatisticResponse, liveMatchPlayerResponse] = responses;
        setStatistics(liveMatchStatisticResponse.data.data);
        setisloading(false);
        setPlayers(liveMatchPlayerResponse.data);
      })
      .catch((error) => {
        IsCancel(error);
      });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollViewHorizontal
        details={details}
        setVisibleDetails={setVisibleDetails}
        visibleDetails={visibleDetails}
      />

      {visibleDetails === i18next.t("Match") && statistics?.length > 0 ? (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 25,
            paddingVertical: 10,
          }}
        >
          {(statistics[0]?.possessiontime !== null || statistics[0]?.possessiontime !== null) && (
            <MatchStatistics
              title={i18next.t("Possession")}
              percent
              left={statistics[0]?.possessiontime}
              right={statistics[1]?.possessiontime}
            />
          )}

          {(statistics[0]?.goal_attempts !== null || statistics[1]?.goal_attempts !== null) && (
            <MatchStatistics
              title={i18next.t("GoalAttemt")}
              left={statistics[0]?.goal_attempts}
              right={statistics[1]?.goal_attempts}
            />
          )}

          {statistics[0]?.shots &&
            (statistics[0]?.shots?.ongoal !== null || statistics[1]?.shots?.ongoal !== null) && (
              <MatchStatistics
                title={i18next.t("GoalKicks")}
                left={statistics[0]?.shots?.ongoal}
                right={statistics[1]?.shots?.ongoal}
              />
            )}
          {statistics[0]?.shots &&
            (statistics[0]?.shots?.offgoal !== null || statistics[1]?.shots?.offgoal !== null) && (
              <MatchStatistics
                title={i18next.t("KickToDoor")}
                left={statistics[0]?.shots?.offgoal}
                right={statistics[1]?.shots?.offgoal}
              />
            )}
          {statistics[0]?.shots &&
            (statistics[0]?.shots?.blocked !== null || statistics[1]?.shots?.blocked !== null) && (
              <MatchStatistics
                title={i18next.t("BlockedKick")}
                left={statistics[0]?.shots?.blocked}
                right={statistics[1]?.shots?.blocked}
              />
            )}
          {(statistics[0]?.free_kick !== null || statistics[1]?.free_kick !== null) && (
            <MatchStatistics
              title={i18next.t("FreeKicks")}
              left={statistics[0]?.free_kick}
              right={statistics[1]?.free_kick}
            />
          )}
          {(statistics[0]?.corners !== null || statistics[1]?.corners !== null) && (
            <MatchStatistics
              title={i18next.t("CornerKicks")}
              left={statistics[0]?.corners}
              right={statistics[1]?.corners}
            />
          )}
          {(statistics[0]?.offsides !== null || statistics[1]?.offsides !== null) && (
            <MatchStatistics
              title={i18next.t("Offside")}
              left={statistics[0]?.offsides}
              right={statistics[1]?.offsides}
            />
          )}
          {(statistics[0]?.saves !== null || statistics[1]?.saves !== null) && (
            <MatchStatistics
              title={i18next.t("GoalkeeperSaves")}
              left={statistics[0]?.saves}
              right={statistics[1]?.saves}
            />
          )}
          {(statistics[0]?.fouls !== null || statistics[1]?.fouls !== null) && (
            <MatchStatistics
              title={i18next.t("Fines")}
              left={statistics[0]?.fouls}
              right={statistics[1]?.fouls}
            />
          )}
          {(statistics[0]?.yellowcards !== null || statistics[1]?.yellowcards !== null) && (
            <MatchStatistics
              title={i18next.t("YellowCards")}
              left={statistics[0]?.yellowcards}
              right={statistics[1]?.yellowcards}
            />
          )}
          {statistics[0]?.passes &&
            (statistics[0]?.passes?.total !== null || statistics[1]?.passes?.total !== null) && (
              <MatchStatistics
                title={i18next.t("Passes")}
                left={statistics[0]?.passes?.total}
                right={statistics[1]?.passes?.total}
              />
            )}
          {statistics[0]?.passes &&
            (statistics[0]?.passes?.accurate !== null ||
              statistics[1]?.passes?.accurate !== null) && (
              <MatchStatistics
                title={i18next.t("AccuratePasses")}
                left={statistics[0]?.passes?.accurate}
                right={statistics[1]?.passes?.accurate}
              />
            )}
          {statistics[0]?.attacks &&
            (statistics[0]?.attacks?.attacks !== null ||
              statistics[1]?.attacks?.attacks !== null) && (
              <MatchStatistics
                title={i18next.t("Attacks")}
                left={statistics[0]?.attacks?.attacks}
                right={statistics[1]?.attacks?.attacks}
              />
            )}
          {statistics[0]?.attacks &&
            (statistics[0]?.attacks?.dangerous_attacks !== null ||
              statistics[1]?.attacks?.dangerous_attacks !== null) && (
              <MatchStatistics
                title={i18next.t("DangerAttacks")}
                left={statistics[0]?.attacks?.dangerous_attacks}
                right={statistics[1]?.attacks?.dangerous_attacks}
              />
            )}
        </View>
      ) : visibleDetails === i18next.t("Footballers") && players?.lineup.length > 0 ? (
        <Players navigation={navigation} players={players?.lineup} />
      ) : visibleDetails === i18next.t("Comparison") && players?.lineup.length > 0 ? (
        <Comparison players={players?.lineup} />
      ) : isloading ? (
        <Spinner />
      ) : (
        <View>
          <Text style={{ textAlign: "center", marginTop: 40 }}>{i18next.t("MathDidNotStart")}</Text>
        </View>
      )}
    </ScrollView>
  );
}
