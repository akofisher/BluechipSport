import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  uri: string;
  title: string;
  score: string;
};

const TeamLine = ({uri, title, score}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{uri}} style={styles.teamIcon} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default TeamLine;

const styles = StyleSheet.create({
  titleContainer: {flexDirection: 'row'},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  teamIcon: {width: 24, height: 24, marginRight: 10},
  text: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },
  score: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },
});
