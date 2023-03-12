import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  uri: string;
  title: string;
};

const LeagueHeader = ({uri, title}: Props) => {
  return (
    <View style={styles.leagueHeader}>
      <Image source={{uri}} style={styles.leagueIcon} />
      <Text style={styles.leagueTitle}>{title}</Text>
    </View>
  );
};

export default LeagueHeader;

const styles = StyleSheet.create({
  leagueHeader: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leagueIcon: {width: 24, height: 24},
  leagueTitle: {
    fontSize: 13,
    lineHeight: 18.2,
    color: '#111315',
    fontWeight: '700',
    marginLeft: 10,
  },
});
