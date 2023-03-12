import {StyleSheet, View} from 'react-native';
import React from 'react';
import TeamLine from './TeamLine';
import {Match} from '../../../../types';
import Status from './Status';

type Props = {
  match: Match;
  hasBorder: boolean;
};

const MatchComponent = ({match, hasBorder}: Props) => {
  return (
    <View style={[styles.container, hasBorder ? styles.border : null]}>
      <Status status={match.status} time={match.time} minute={match.minute} />
      <TeamLine
        uri={match.localteam_logo_path}
        title={match.localteam_name}
        score={match.localteam_score}
      />
      <TeamLine
        uri={match.visitorteam_logo_path}
        title={match.visitorteam_name}
        score={match.visitorteam_score}
      />
    </View>
  );
};

export default MatchComponent;

const styles = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 16, paddingVertical: 15},
  border: {borderBottomWidth: 1, borderBottomColor: '#EAEAEA'},
});
