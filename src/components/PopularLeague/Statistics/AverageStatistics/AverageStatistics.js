import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { API } from "services";

import AverageList from "./AverageList";

export default function AverageStatistics({ seasonID }) {
  const [averageStats, setAverageStats] = useState();
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    API.leaguesStandingsAverage({ kwds: { seasonID } })
      .then(({ data }) => {
        setAverageStats(data.data);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setisloading(false);
      });
  }, [seasonID]);
  return (
    <View>
      {averageStats ? (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            paddingVertical: 30,
            paddingHorizontal: 27,
            marginBottom: 20,
          }}
        >
          <AverageList bold tittle={i18next.t("LeagueAverageStatistics")} />
          <AverageList tittle={i18next.t("TeamsCount")} stats={averageStats.number_of_clubs} />
          <AverageList tittle={i18next.t("MatchesCount")} stats={averageStats.number_of_matches} />
          <AverageList
            tittle={i18next.t("NumberMatchesPlayed")}
            stats={averageStats.number_of_matches_played}
          />

          <AverageList tittle={i18next.t("NumberOfGoals")} stats={averageStats.number_of_goals} />
          <AverageList
            tittle={i18next.t("BothTeamsScored")}
            stats={averageStats.matches_both_teams_scored}
          />

          <AverageList tittle={i18next.t("GoalMatch")} stats={averageStats.avg_goals_per_match} />
          <AverageList
            tittle={i18next.t("YellowCards")}
            stats={averageStats.number_of_yellowcards}
          />
          <AverageList tittle={i18next.t("RedCards")} stats={averageStats.number_of_redcards} />
          <AverageList
            tittle={i18next.t("YellowCardInMatch")}
            stats={averageStats?.avg_yellowcards_per_match}
          />
          <AverageList
            tittle={i18next.t("RedCardInMatch")}
            stats={averageStats?.avg_redcards_per_match}
          />
          <AverageList
            tittle={i18next.t("TeamMostGoals")}
            stats={averageStats?.team_with_most_goals?.name}
            secondStats={averageStats?.team_with_most_goals_number}
          />
          <AverageList
            tittle={i18next.t("TeamMostMissedGoals")}
            stats={averageStats?.team_with_most_conceded_goals?.name}
            secondStats={averageStats?.team_with_most_conceded_goals_number}
          />
          <AverageList
            tittle={i18next.t("ScorerOfSeason")}
            stats={averageStats?.season_topscorer?.common_name}
            secondStats={averageStats?.season_topscorer_number}
          />
          <AverageList
            tittle={i18next.t("BestAssistantSeason")}
            stats={averageStats?.season_assist_topscorer?.common_name}
            secondStats={averageStats?.season_assist_topscorer_number}
          />
          <AverageList
            tittle={i18next.t("MostDryDoors")}
            stats={averageStats?.goalkeeper_most_cleansheets?.common_name}
            secondStats={averageStats.team_most_cleansheets_number}
          />
          <AverageList
            tittle={i18next.t("GoalPassesEveryMinute")}
            stats={averageStats?.goalkeeper_most_cleansheets_number}
          />
          <AverageList
            tittle={i18next.t("CornerMatc")}
            stats={averageStats?.avg_corners_per_match}
          />
          <AverageList
            tittle={i18next.t("MostCornerMatch")}
            stats={averageStats?.team_most_corners_id}
            secondStats={averageStats?.team_most_corners_count}
          />
          <AverageList
            tittle={i18next.t("GoalScoredHome")}
            stats={averageStats?.avg_homegoals_per_match}
          />
          <AverageList
            tittle={i18next.t("AwayGoalScored")}
            stats={averageStats?.avg_awaygoals_per_match}
          />
        </View>
      ) : isloading ? (
        <Spinner />
      ) : (
        <View>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            {i18next.t("AverageStatisticsNotObtained")}
          </Text>
        </View>
      )}
    </View>
  );
}
