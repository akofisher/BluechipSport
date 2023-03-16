import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from 'react-query';
import {getPlayerStats} from '../../../../../api/match';
import Top from '../Top';

type Props = {
  matchId: number;
};

const TopPlayers = ({matchId}: Props) => {
  const {data, isLoading: isLoadingPlayers} = useQuery(
    ['TOP_PLAYERS', matchId],
    () => getPlayerStats(matchId),
  );
  console.log(data);
  if (isLoadingPlayers) {
    return null;
  }
  return (
    <View>
      <Top data={data?.rating} label="Player Ratings" />
      <Top data={data?.shots} label="Total Shots" />
      <Top data={data?.shots_on_goal} label="Chances created" />
      <Top data={data?.tackles} label="Tackles" />
    </View>
  );
};

export default TopPlayers;

const styles = StyleSheet.create({});
