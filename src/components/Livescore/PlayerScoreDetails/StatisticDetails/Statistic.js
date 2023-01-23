import { Separator } from "components/common";
import i18next from "i18next";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import StatsComponent from "./StatsComponent";

export default function Statistic({ player }) {
  return (
    <View>
      <Separator />
      <View style={Styles.whiteCont}>
        <View style={Styles.whiteContChild}>
          <Image
            style={Styles.clubIcon}
            source={{
              uri: player?.team?.logo_path,
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={Styles.club}>{i18next.t("Club")}</Text>
            <Text style={Styles.clubName}>{player?.team?.slug}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          {player?.data?.minutes !== null && (
            <StatsComponent
              scorers={player?.data?.minutes}
              title={i18next.t("TotalTimePlayed")}
              playedTime
            />
          )}
          {player?.data?.goals !== null && (
            <StatsComponent scorers={player?.data?.goals} title={i18next.t("GoalsScored")} goal />
          )}
          {player?.data?.assists !== null && (
            <StatsComponent scorers={player?.data?.assists} title={i18next.t("Transfer")} assist />
          )}
          {player?.data?.yellowcards !== null && (
            <StatsComponent
              scorers={player?.data?.yellowcards}
              title={i18next.t("YellowCards")}
              yellowCard
            />
          )}
          {player?.data?.redcards !== null && (
            <StatsComponent
              scorers={player?.data?.redcards}
              title={i18next.t("RedCards")}
              redCard
            />
          )}
          {player?.stats?.rating !== null && (
            <StatsComponent scorers={player?.stats?.rating} title={i18next.t("Rating")} />
          )}
          {player?.stats?.appearences !== null && (
            <StatsComponent scorers={player?.stats?.appearences} title={i18next.t("MatchHeld")} />
          )}
          {player?.stats?.lineups !== null && (
            <StatsComponent scorers={player?.stats?.lineups} title={i18next.t("InTheMain")} />
          )}
          {player?.stats?.substitutes_on_bench !== null && (
            <StatsComponent
              scorers={player?.stats?.substitutes_on_bench}
              title={i18next.t("OnSpare")}
            />
          )}
          {player?.stats?.owngoals !== null && (
            <StatsComponent scorers={player?.stats?.owngoals} title={i18next.t("OwnGoal")} />
          )}
          {player?.stats?.saves !== null && (
            <StatsComponent scorers={player?.stats?.saves} title={i18next.t("Save")} />
          )}
          {player?.stats?.dispossesed !== null && (
            <StatsComponent
              scorers={player?.stats?.dispossesed}
              title={i18next.t("BallWasTakenAway")}
            />
          )}
          {player?.stats?.tackles !== null && (
            <StatsComponent scorers={player?.stats?.tackles} title={i18next.t("Deprivation")} />
          )}
          {player?.stats?.interceptions !== null && (
            <StatsComponent scorers={player?.stats?.interceptions} title={i18next.t("Intercept")} />
          )}
          {player?.stats?.blocks !== null && (
            <StatsComponent scorers={player?.stats?.blocks} title={i18next.t("block")} />
          )}
          {player?.stats?.hit_post !== null && (
            <StatsComponent scorers={player?.stats?.hit_post} title={i18next.t("HitThePost")} />
          )}
          {player?.stats?.cleansheets !== null && (
            <StatsComponent scorers={player?.stats?.cleansheets} title={i18next.t("DryDoor")} />
          )}
          {player?.stats?.fouls?.committed !== null && (
            <StatsComponent scorers={player?.stats?.fouls?.committed} title={i18next.t("Fined")} />
          )}
          {player?.stats?.dribbles?.attempts !== null && (
            <StatsComponent
              scorers={player?.stats?.dribbles?.attempts}
              title={i18next.t("AttemptDribbling")}
            />
          )}
          {player?.stats?.dribbles?.success !== null && (
            <StatsComponent
              scorers={player?.stats?.dribbles?.success}
              title={i18next.t("SuccessfulDribbling")}
            />
          )}
          {player?.stats?.dribbles?.dribbled_past !== null && (
            <StatsComponent
              scorers={player?.stats?.dribbles?.dribbled_past}
              title={i18next.t("MissedDribbling")}
            />
          )}
          {player?.stats?.duels?.total !== null && (
            <StatsComponent scorers={player?.stats?.duels?.total} title={i18next.t("Duel")} />
          )}
          {player?.stats?.duels?.won !== null && (
            <StatsComponent scorers={player?.stats?.duels?.won} title={i18next.t("WonDuel")} />
          )}
          {player?.stats?.passes?.total !== null && (
            <StatsComponent scorers={player?.stats?.passes?.total} title={i18next.t("Pass")} />
          )}
          {player?.stats?.passes?.accuracy !== null && (
            <StatsComponent
              scorers={player?.stats?.passes?.accuracy}
              title={i18next.t("AccuracyOfPasses")}
            />
          )}
          {player?.stats?.passes?.key_passes !== null && (
            <StatsComponent
              scorers={player?.stats?.passes?.key_passes}
              title={i18next.t("KeyPass")}
            />
          )}
          {player?.stats?.penalties?.won !== null && (
            <StatsComponent
              scorers={player?.stats?.penalties?.won}
              title={i18next.t("PenaltyEarned")}
            />
          )}
          {player?.stats?.penalties?.scores !== null && (
            <StatsComponent
              scorers={player?.stats?.penalties?.scores}
              title={i18next.t("PenaltyTaken")}
            />
          )}
          {player?.stats?.penalties?.missed !== null && (
            <StatsComponent
              scorers={player?.stats?.penalties?.missed}
              title={i18next.t("SpoiledPenalty")}
            />
          )}
          {player?.stats?.penalties?.saves !== null && (
            <StatsComponent
              scorers={player?.stats?.penalties?.saves}
              title={i18next.t("RepulsedPenalty")}
            />
          )}
          {player?.stats?.shots?.shots_total !== null && (
            <StatsComponent scorers={player?.stats?.shots?.shots_total} title={i18next.t("Blow")} />
          )}
          {player?.stats?.shots?.shots_on_target !== null && (
            <StatsComponent
              scorers={player?.stats?.shots?.shots_on_target}
              title={i18next.t("GoalOnDoor")}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  clubIcon: {
    height: 30,
    width: 30,
  },
  seasonCont: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingLeft: 25,
  },
  seasonText: {
    color: "#9C9C9C",
    fontSize: 12,
  },
  season: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  whiteCont: {
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  whiteContChild: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingLeft: 25,
  },
  club: {
    fontSize: 10,
    color: "#A5A5A5",
  },
  clubName: {
    fontWeight: "bold",
    marginTop: 1,
  },
});
