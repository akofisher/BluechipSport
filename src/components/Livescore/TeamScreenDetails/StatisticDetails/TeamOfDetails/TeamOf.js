import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "screens/transfers/Dropdown";
import { API } from "services";

import List from "./List";

export default function TeamOf({ id, leagues }) {
  const [teamStats, setTeamStats] = useState();
  const [activeLeague, setActiveLeague] = useState(leagues[0]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    API.getTeamsStatistic({ kwds: { id, LeagueId: activeLeague.league_id } })
      .then(({ data }) => {
        setTeamStats(data.data);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setisloading(false);
      });
  }, [id, activeLeague]);

  return (
    <View>
      <View style={{ marginBottom: 10, marginHorizontal: 16 }}>
        <Dropdown
          inputIcon={activeLeague?.icon}
          inputLabel={activeLeague?.name}
          value={activeLeague?.league_id}
          onValueChange={(value) => {
            const league = leagues.find((item) => item.league_id === value);
            league && setActiveLeague(league);
          }}
          items={leagues.map((league) => ({
            label: league.name,
            value: league.league_id,
          }))}
        />
      </View>
      {teamStats ? (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            paddingVertical: 30,
            paddingHorizontal: 27,
          }}
        >
          <List bold tittle={i18next.t("WonTotal")} stats={teamStats.win?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.win?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.win?.away} />
          <List bold tittle={i18next.t("DrawTotal")} stats={teamStats.draw?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.draw?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.draw?.away} />
          <List bold tittle={i18next.t("LossTotal")} stats={teamStats.lost?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.lost?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.draw?.away} />
          <List bold tittle={i18next.t("TotalGoalsScored")} stats={teamStats.goals_for?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.goals_for?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.goals_for?.away} />
          <List bold tittle={i18next.t("MissedGoalTotal")} stats={teamStats.goals_against?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.goals_against?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.goals_against?.away} />
          <List bold tittle={i18next.t("DryStoredDoor")} stats={teamStats.clean_sheet?.total} />
          <List tittle={i18next.t("Home")} stats={teamStats.clean_sheet?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.clean_sheet?.away} />
          <List bold tittle={i18next.t("GoalScoringPeriod")} />
          <List
            percent
            perc
            tittle={teamStats.scoring_minutes[0].period[0].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[0].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.scoring_minutes[0].period[1].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[1].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.scoring_minutes[0].period[2].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[2].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.scoring_minutes[0].period[3].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[3].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.scoring_minutes[0].period[4].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[4].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.scoring_minutes[0].period[5].minute}
            tmst
            stats={teamStats.scoring_minutes[0].period[5].percentage}
          />
          <List bold tittle={i18next.t("GoalPeriod")} />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[0].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[0].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[1].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[1].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[2].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[2].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[3].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[3].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[4].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[4].percentage}
          />
          <List
            perc
            percent
            tittle={teamStats.goals_conceded_minutes[0].period[5].minute}
            tmst
            stats={teamStats.goals_conceded_minutes[0].period[5].percentage}
          />
          <List
            bold
            tittle={i18next.t("GoalScoredMatch")}
            stats={teamStats.avg_goals_per_game_scored?.total}
          />
          <List tittle={i18next.t("Home")} stats={teamStats.avg_goals_per_game_scored?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.avg_goals_per_game_scored?.away} />

          <List
            bold
            tittle={i18next.t("GoalMissedInMatch")}
            stats={teamStats.avg_goals_per_game_conceded?.total}
          />
          <List tittle={i18next.t("Home")} stats={teamStats.avg_goals_per_game_conceded?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.avg_goals_per_game_conceded?.away} />

          <List
            bold
            tittle={i18next.t("FirstGoalAverage")}
            stats={teamStats.avg_first_goal_scored.total}
          />
          <List tittle={i18next.t("Home")} stats={teamStats.avg_first_goal_scored?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.avg_first_goal_scored?.away} />

          <List
            bold
            tittle={i18next.t("FirstMissedGoalGcored")}
            stats={teamStats.avg_first_goal_conceded.total}
          />
          <List tittle={i18next.t("Home")} stats={teamStats.avg_first_goal_conceded?.home} />
          <List tittle={i18next.t("Guest")} stats={teamStats.avg_first_goal_conceded?.away} />
          <List bold tittle={i18next.t("Attack")} stats={teamStats.attacks} />
          <List tittle={i18next.t("DangerousAttack")} stats={teamStats.dangerous_attacks} />
          <List
            percent
            tittle={i18next.t("PossessionOfBall")}
            stats={teamStats.avg_ball_possession_percentage}
          />
          <List tittle={i18next.t("AccurateShot")} stats={teamStats.shots_on_target} />
          <List
            tittle={i18next.t("AccurateShotInMatch")}
            stats={teamStats.avg_shots_on_target_per_game}
          />
          <List bold tittle={i18next.t("Fine")} stats={teamStats.fouls} />
          <List tittle={i18next.t("PenaltyInMatch")} stats={teamStats.avg_fouls_per_game} />
          <List tittle={i18next.t("Offside")} stats={teamStats.offsides} />
          <List tittle={i18next.t("RedCards")} stats={teamStats.redcards} />
          <List tittle={i18next.t("YellowCards")} stats={teamStats.yellowcards} />
          <List bold tittle={i18next.t("AngularTotal")} stats={teamStats.total_corners} />
          <List tittle={i18next.t("CornerMatc")} stats={teamStats.avg_corners} />
          <List tittle={i18next.t("Deprivation")} stats={teamStats.tackles} />
          <List tittle={i18next.t("PlayerRatingAverage")} stats={teamStats.avg_player_rating} />
          <List
            tittle={i18next.t("PlayerRatingInMatch")}
            stats={teamStats.avg_player_rating_per_match}
          />
        </View>
      ) : isloading ? (
        <Spinner />
      ) : (
        <View>
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            {i18next.t("StatisticsNotObtained")}
          </Text>
        </View>
      )}
    </View>
  );
}
