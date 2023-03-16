import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScoresType} from '../../../../types';

type Props = {
  scores: ScoresType;
};

const Result = ({scores}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.score}>
        {scores.localteam_score} : {scores.visitorteam_score}
      </Text>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  score: {
    fontSize: 18,
    lineHeight: 25.2,
    color: '#FFF',
    fontWeight: '600',
  },
});
