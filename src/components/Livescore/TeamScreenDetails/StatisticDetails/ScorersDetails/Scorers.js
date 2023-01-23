import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { API } from "services";

import PlayerAllScorers from "./PlayerAllScorers";

export default function Scorers({ id, navigation }) {
  const [scorers, setScorers] = useState({ isloading: true });
  const [cards, setCards] = useState();
  const [asists, setAsists] = useState();
  const [playerScore, setPlayerScore] = useState();
  const [playerCard, setPlayerCard] = useState();
  const [playerAsists, setPlayerAsist] = useState();

  useEffect(() => {
    API.getTeamPlayers({ kwds: { id } })
      .then(({ data }) => {
        setScorers(data.goalscorers, { isloading: false });
        setCards(data.cardscorers);
        setAsists(data.assistscorers);
        setPlayerScore(data.goalscorers[0].player_image);
        setPlayerCard(data.cardscorers[0].player_image);
        setPlayerAsist(data.assistscorers[0].player_image);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  return scorers?.isloading ? (
    <Spinner />
  ) : (
    <View>
      {scorers &&
      asists &&
      cards &&
      (scorers.length > 0 || cards.length > 0 || asists.length > 0) ? (
        <View>
          <PlayerAllScorers
            scorers={scorers}
            ball
            img={playerScore}
            tittle={i18next.t("Goals")}
            navigation={navigation}
          />
          <PlayerAllScorers
            scorers={cards}
            card
            img={playerCard}
            tittle={i18next.t("Cards")}
            navigation={navigation}
          />
          <PlayerAllScorers
            scorers={cards}
            red
            img={playerCard}
            tittle={i18next.t("Cards")}
            navigation={navigation}
          />
          <PlayerAllScorers
            scorers={asists}
            asist
            img={playerAsists}
            tittle={i18next.t("assists")}
            navigation={navigation}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
