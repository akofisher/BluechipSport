import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TeamLine from './TeamLine';
import {Match} from '../../../../types';
import Status from './Status';
import {useNavigation} from '@react-navigation/native';

type Props = {
  match: Match;
  hasBorder: boolean;
};

const MatchComponent = ({match, hasBorder}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MatchDetailsNew', {
          matchId: match?.id,
        })
      }
      style={[styles.container, hasBorder ? styles.border : null]}>
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
    </TouchableOpacity>
  );
};

export default MatchComponent;

const styles = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 16, paddingVertical: 15},
  border: {borderBottomWidth: 1, borderBottomColor: '#EAEAEA'},
});
