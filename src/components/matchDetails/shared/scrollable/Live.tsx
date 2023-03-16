import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import greenUp from '../../../../../assets/green_up.png';
import redDown from '../../../../../assets/red_down.png';

type Props = {
  data: any;
  localTeamId: number;
  visitorTeamId: number;
};

const returnComponent = item => {
  switch (item.type) {
    case 'yellowcard':
      return (
        <>
          <View
            style={{
              width: 15,
              height: 20,
              backgroundColor: '#fec838',
              borderRadius: 3,
              marginHorizontal: 4,
            }}
          />
          <Text>{item.player_name}</Text>
        </>
      );
    case 'penalty':
    case 'goal':
      return (
        <>
          <View
            style={{
              borderRadius: 3,
              marginHorizontal: 4,
            }}>
            <FontAwesome name="futbol-o" size={18} color="#424242" />
          </View>
          <Text style={{fontSize: 13, color: '#292929', paddingStart: 6}}>
            {item.player_name}{' '}
          </Text>
          {item.player_assist_name ? (
            <Text style={{paddingEnd: 6, color: '#a6a6a6', fontSize: 13}}>
              ({item.player_assist_name})
            </Text>
          ) : null}
        </>
      );
    case 'subst':
      return (
        <>
          <View
            style={{
              borderRadius: 3,
              marginHorizontal: 4,
            }}>
            <Image source={greenUp} />
          </View>
          <Text style={{fontSize: 13, color: '#292929', paddingStart: 6}}>
            {item.player_in_name}{' '}
          </Text>
          <View
            style={{
              borderRadius: 3,
              marginHorizontal: 4,
            }}>
            <Image source={redDown} />
          </View>
          <Text style={{fontSize: 13, color: '#292929', paddingStart: 6}}>
            {item.player_out_name}{' '}
          </Text>
        </>
      );
  }
};

const Live = ({data, localTeamId, visitorTeamId}: Props) => {
  const sortedData = [...data.cards, ...data.goals, ...data.substitutions].sort(
    (a, b) => a.minute - b.minute,
  );
  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
        <Text style={styles.halfText}>First half</Text>
      </View>
      {sortedData
        .filter(it => it.minute <= 45)
        .map(item => (
          <View
            style={[
              styles.directionContainer,
              item.team_id === localTeamId.toString()
                ? styles.direction
                : styles.directionReverse,
            ]}>
            <Text style={{width: 30}}>{item.minute}'</Text>
            {returnComponent(item)}
          </View>
        ))}
      <View style={styles.halfContainer}>
        <Text style={styles.halfText}>Second half</Text>
      </View>
      {sortedData
        .filter(it => it.minute > 45)
        .map(item => (
          <View
            style={[
              styles.directionContainer,
              item.team_id === localTeamId.toString()
                ? styles.direction
                : styles.directionReverse,
            ]}>
            <Text style={{width: 30}}>{item.minute}'</Text>
            {returnComponent(item)}
          </View>
        ))}
    </View>
  );
};

export default Live;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginVertical: 24,
    paddingVertical: 0,
  },
  halfContainer: {
    backgroundColor: '#F4F4F4',
    height: 40,
    marginVertical: 15,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 15,
  },
  halfText: {fontSize: 13, fontWeight: '400'},
  directionContainer: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    alignItems: 'center',
  },
  direction: {
    flexDirection: 'row',
  },
  directionReverse: {
    flexDirection: 'row-reverse',
  },
});
