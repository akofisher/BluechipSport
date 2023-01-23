import PlayerAllScorers from "components/Livescore/TeamScreenDetails/StatisticDetails/ScorersDetails/PlayerAllScorers";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

import ScorersComponent from "./ScorersComponent";

export default function PopLeagueScores({
  id,
  scorer,
  navigation,
  playerCard,
  scorers,
  playerAsist,
}) {
  if (scorers) {
    return (
      <View>
        <PlayerAllScorers
          scorers={scorers}
          ball
          img={scorers[0]?.player_image}
          tittle={i18next.t("Goals")}
          navigation={navigation}
        />
        <PlayerAllScorers
          scorers={playerCard}
          card
          img={playerCard[0].player_image}
          tittle={i18next.t("Cards")}
          navigation={navigation}
        />
        <PlayerAllScorers
          scorers={playerCard}
          red
          img={playerCard[0].player_image}
          tittle={i18next.t("Cards")}
          navigation={navigation}
        />
        <PlayerAllScorers
          scorers={playerAsist}
          asist
          img={playerAsist[0].player_image}
          tittle={i18next.t("assists")}
          navigation={navigation}
        />
      </View>
    );
  } else {
    return null;
  }
}
