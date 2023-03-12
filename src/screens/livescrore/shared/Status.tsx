import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MatchTime} from '../../../../types';
import {format} from 'date-fns';

type Props = {
  status: string;
  time: string;
  minute: number;
};

const Status = ({status, time, minute}: Props) => {
  const timeObj: MatchTime = JSON.parse(time);
  switch (status) {
    case 'NS':
      return (
        <View>
          <Text style={styles.date}>
            {format(new Date(timeObj.starting_at.timestamp), 'HH:MM')}
          </Text>
        </View>
      );
    case 'FT':
      //TO DO
      return (
        <View>
          <Text>FT</Text>
        </View>
      );
    case 'POSTP':
      return (
        <View style={styles.flexRow}>
          <View style={styles.redBackground}>
            <Text style={styles.whiteText}>POSTPONED</Text>
          </View>
        </View>
      );
    case 'LIVE':
      return (
        <View style={styles.flexRow}>
          <View style={styles.purpleBackground}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.purpleBackground}>
            <Text style={styles.liveText}>{minute}'</Text>
          </View>
        </View>
      );
    case 'HT':
      return (
        <View style={styles.flexRow}>
          <View style={styles.purpleBackground}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.darkPurpleBackground}>
            <Text style={styles.whiteText}>HT</Text>
          </View>
        </View>
      );
    case 'PENLIVE':
      //TO DO
      return (
        <View>
          <Text>PENLIVE {minute}</Text>
        </View>
      );
  }
  return (
    <View>
      <Text>UNKNOWN STATUS</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  date: {fontSize: 12, lineHeight: 16.8, fontWeight: '500'},
  whiteText: {
    lineHeight: 16.8,
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grayText: {
    color: '#111315',
    lineHeight: 16.8,
    fontSize: 12,
    fontWeight: '600',
  },
  redBackground: {
    backgroundColor: '#FF5F00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  purpleBackground: {
    backgroundColor: 'rgba(255, 9, 96, 0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  darkPurpleBackground: {
    backgroundColor: '#FF1D6D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  liveDot: {
    width: 5,
    height: 5,
    backgroundColor: '#FF0960',
    borderRadius: 5,
    marginRight: 5,
  },
  liveText: {
    lineHeight: 16.8,
    color: '#FF0960',
    fontSize: 12,
    fontWeight: '600',
  },
});
