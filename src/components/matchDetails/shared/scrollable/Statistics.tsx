import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Stat from '../Stat';
import {getMatchStatistics} from '../../../../../api/match';
import {useQuery} from 'react-query';

type Props = {
  matchId: number;
};

const params = [
  {label: 'Ball Possesion', param: 'possessiontime'},
  {label: 'Goal attempts', param: 'goal_attempts'},
  {label: 'Shots on goal', param: 'shots.insidebox'},
  {label: 'Shots off goal', param: 'shots.offgoal'},
  {label: 'Blocked shots', param: 'shots.blocked'},
  {label: 'Corners', param: 'corners'},
  {label: 'Offsides', param: 'offsides'},
  {label: 'Saves', param: 'saves'},
  {label: 'Fouls', param: 'fouls'},
  {label: 'Red Cards', param: 'redcards'},
  {label: 'Yellow Cards', param: 'yellowcards'},
  {label: 'Passes', param: 'passes.total'},
];

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj,
  );
};

const Statistics = ({matchId}: Props) => {
  const {data, isLoading: isLoadingPlayers} = useQuery(
    ['MATCH_STATISTICS', matchId],
    () => getMatchStatistics(matchId),
  );
  console.log(data?.data?.[0]?.['shots']);
  return (
    <View style={{backgroundColor: '#FFF', marginVertical: 15}}>
      <View
        style={{
          borderBottomWidth: 1,
          padding: 15,
          borderBottomColor: '#f4f4f4',
        }}>
        <Text>Stats</Text>
      </View>
      <View style={{paddingVertical: 15}}>
        {params.map(item => (
          <Stat
            local={getNestedObject(data?.data?.[0], item.param.split('.'))}
            label={item.label}
            visitor={getNestedObject(data?.data?.[1], item.param.split('.'))}
          />
        ))}
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
