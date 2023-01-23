import i18next from "i18next";
import React from "react";
import { View, Text } from "react-native";

import PlayerListStats from "./PlayerListStats";

export default function HomeStatistics({ playerStats }) {
  return (
    <View>
      <Text
        style={{
          paddingVertical: 20,
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {i18next.t("MainStatistic")}
      </Text>
      {playerStats && (
        <View>
          <PlayerListStats tittle={i18next.t("Rating")} stats={playerStats.stats.rating} />
          <PlayerListStats
            tittle={i18next.t("PlayedTime")}
            stats={playerStats.stats.other.minutes_played}
          />
          <PlayerListStats tittle={i18next.t("Goals")} stats={playerStats.stats.goals.scored} />
          <PlayerListStats tittle={i18next.t("Assist")} stats={playerStats.stats.goals.assists} />
          <PlayerListStats tittle={i18next.t("Fined")} stats={playerStats.stats.fouls.drawn} />
          <PlayerListStats
            tittle={i18next.t("FinedHim")}
            stats={playerStats.stats.fouls.commited}
          />
          <PlayerListStats
            tittle={i18next.t("AttemptDribbling")}
            stats={playerStats.stats.dribbles.attempts}
          />
          <PlayerListStats
            tittle={i18next.t("SuccessfulDribbling")}
            stats={playerStats.stats.dribbles.success}
          />
          <PlayerListStats
            tittle={i18next.t("MissedDribbling")}
            stats={playerStats.stats.dribbles.dribbled_past}
          />
          <PlayerListStats tittle={i18next.t("Duel")} stats={playerStats.stats.duels.total} />
          <PlayerListStats tittle={i18next.t("WonDuel")} stats={playerStats.stats.duels.won} />
          <PlayerListStats
            tittle={i18next.t("WonAirDuel")}
            stats={playerStats.stats.other.aerials_won}
          />
          <PlayerListStats tittle={i18next.t("Offside")} stats={playerStats.stats.other.offsides} />
          <PlayerListStats
            tittle={i18next.t("Deprivation")}
            stats={playerStats.stats.other.tackles}
          />
          <PlayerListStats tittle={i18next.t("block")} stats={playerStats.stats.other.blocks} />
          <PlayerListStats
            tittle={i18next.t("Intercept")}
            stats={playerStats.stats.other.interceptions}
          />
          <PlayerListStats
            tittle={i18next.t("LostTheBall")}
            stats={playerStats.stats.other.dispossesed}
          />
        </View>
      )}
    </View>
  );
}
