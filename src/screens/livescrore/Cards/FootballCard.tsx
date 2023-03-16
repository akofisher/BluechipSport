import {StyleSheet, View} from 'react-native';
import React from 'react';
import {League} from '../../../../types';
import LeagueHeader from '../shared/LeagueHeader';
import Match from '../shared/Match';

type Props = {
  data: League;
};

const FootballCard = ({data}: Props) => {
  return (
    <View style={styles.container}>
      <LeagueHeader uri={data.icon} title={data.league_name} />
      <View style={styles.matchesContainer}>
        {data?.data?.map((match, index) => (
          <Match
            hasBorder={data?.data?.length - 1 !== index}
            match={match}
            key={match.id.toString()}
          />
        ))}
      </View>
    </View>
  );
};

export default FootballCard;

const styles = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 15},
  matchesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});
