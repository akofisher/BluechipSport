import PopLeagueStatistics from "components/PopularLeague/Statistics/PopLeagueStatistics";
import Spinner from "components/common/Spinner";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { API } from "services";
import cxs from "styles/cxs";

export const StandingPlayerStatistic = React.memo((props) => {
  const { leagueId, navigation, seasonId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [scorers, setScorers] = useState(null);
  const [playerCard, setPlayerCard] = useState();
  const [playerAsist, setPlayerAsist] = useState();

  useEffect(() => {
    setIsLoading(true);
    API.ligaStats({ kwds: { leagueId } })
      .then(({ data }) => {
        setScorers(data.goalscorers);
        setPlayerCard(data.cardscorers);
        setPlayerAsist(data.assistscorers);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [leagueId]);

  if (isLoading) {
    return (
      <View style={cxs.m20}>
        <Spinner />
      </View>
    );
  }

  return (
    <PopLeagueStatistics
      id={leagueId}
      seasonID={seasonId}
      navigation={navigation}
      scorers={scorers}
      playerCard={playerCard}
      menuContainerStyle={cxs.my0}
      playerAsist={playerAsist}
    />
  );
});
