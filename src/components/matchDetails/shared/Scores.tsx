import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {ScoresType, TeamType} from '../../../../types';
import bg from '../../../../assets/bg.png';
import ScoresTeam from './ScoresTeam';
import Result from './Result';
type Props = {
  visitorTeam: TeamType;
  localTeam: TeamType;
  scores: ScoresType;
};

const Scores = ({visitorTeam, localTeam, scores}: Props) => {
  return (
    <ImageBackground source={bg} style={styles.height}>
      <View style={styles.container}>
        <ScoresTeam name={localTeam.data.name} uri={localTeam.data.logo_path} />
        <Result scores={scores} />
        <ScoresTeam
          name={visitorTeam.data.name}
          uri={visitorTeam.data.logo_path}
        />
      </View>
      <View style={styles.overlay} />
    </ImageBackground>
  );
};

export default Scores;

const styles = StyleSheet.create({
  height: {height: 160, width: '100%'},
  container: {
    zIndex: 3,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  overlay: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(16, 25, 33, 0.77)',
  },
});
