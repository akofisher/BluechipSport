import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  uri: string;
  name: string;
};

const ScoresTeam = ({uri, name}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: uri}} style={styles.size} resizeMode="contain" />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default ScoresTeam;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  size: {width: 80, height: 80},
  title: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 4,
  },
});
