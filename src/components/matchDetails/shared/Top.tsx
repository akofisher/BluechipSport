import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Player from './Player';

type Props = {
  data: any;
  label: string;
};

const Top = ({data, label}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <View style={{padding: 24, backgroundColor: '#FFF', marginTop: 24}}>
      <Text style={{fontWeight: '700', lineHeight: 22, marginBottom: 22}}>
        {label}
      </Text>
      {data?.slice(0, isExpanded ? data.length : 3)?.map((player, index) => (
        <Player key={player.player_id.toString()} index={index} data={player} />
      ))}
      <TouchableOpacity
        onPress={() => setIsExpanded(prev => !prev)}
        style={{
          padding: 13,
          backgroundColor: '#f4f4f4',
          borderRadius: 30,
          marginTop: 24,
        }}>
        <Text
          style={{color: '#949494', textAlign: 'center', fontWeight: '700'}}>
          {isExpanded ? 'Close' : 'See all players'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Top;

const styles = StyleSheet.create({});
