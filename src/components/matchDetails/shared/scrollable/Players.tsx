import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getMatchPlayers} from '../../../../../api/match';
import {useQuery} from 'react-query';

type Props = {
  matchId: number;
  localTeamId: number;
};

const Players = ({matchId, localTeamId}: Props) => {
  const {data, isLoading: isLoadingPlayers} = useQuery(
    ['MATCH_PLAYERS', matchId],
    () => getMatchPlayers(matchId),
  );

  if (isLoadingPlayers) return null;
  const localLineup = data?.lineup?.filter(
    item => item.team_id === localTeamId,
  );
  const visitorLineup = data?.lineup?.filter(
    item => item.team_id !== localTeamId,
  );

  const lineupToMap =
    localLineup.length > visitorLineup ? localLineup : visitorLineup;

  const localBench = data?.bench?.filter(item => item.team_id === localTeamId);
  const visitorBench = data?.bench?.filter(
    item => item.team_id !== localTeamId,
  );

  const benchToMap =
    localBench.length > visitorBench ? localBench : visitorBench;

  return (
    <View>
      <View style={styles.top}>
        <Text>{data?.formations?.localteam_formation}</Text>
        <Text>Lineups</Text>
        <Text>{data?.formations?.visitorteam_formation}</Text>
      </View>

      <View style={{backgroundColor: '#FFF', marginTop: 15, padding: 15}}>
        <View style={styles.header}>
          <Text style={{fontWeight: '600', textAlign: 'center'}}>
            Starting Lineups
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
            marginTop: 8,
          }}>
          {lineupToMap?.map((_, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#f4f4f4',
                  height: 39,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13, width: 30}}>
                    {localLineup?.[index]?.number}
                  </Text>
                  <Text style={{fontSize: 13}}>
                    {localLineup?.[index]?.player_name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13}}>
                    {visitorLineup?.[index]?.player_name}
                  </Text>
                  <Text style={{fontSize: 13, width: 30, textAlign: 'right'}}>
                    {visitorLineup?.[index]?.number}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFF',
          marginTop: 15,
          padding: 15,
          marginBottom: 40,
        }}>
        <View style={styles.header}>
          <Text style={{fontWeight: '600', textAlign: 'center'}}>Subs</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
            marginTop: 8,
          }}>
          {benchToMap?.map((_, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#f4f4f4',
                  height: 39,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13, width: 30}}>
                    {localBench?.[index]?.number}
                  </Text>
                  <Text style={{fontSize: 13}}>
                    {localBench?.[index]?.player_name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13}}>
                    {visitorBench?.[index]?.player_name}
                  </Text>
                  <Text style={{fontSize: 13, width: 30, textAlign: 'right'}}>
                    {visitorBench?.[index]?.number}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    height: 40,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#F4F4F4',
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
