import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  data: any;
  index: number;
};

const Player = ({data, index}: Props) => {
  return (
    <View
      style={{
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: data.image_path}}
          style={{width: 50, height: 50}}
        />
        <View
          style={{justifyContent: 'space-around', marginLeft: 8, height: 44.5}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              height: 22.5,
              textAlignVertical: 'center',
            }}>
            {data.player_name}
          </Text>
          <View
            style={{flexDirection: 'row', height: 18, alignItems: 'center'}}>
            <Image
              source={{uri: data?.team_logo_path}}
              style={{width: 20, height: 20, marginRight: 4}}
            />
            <Text style={{fontSize: 12, color: '#7c7c7c'}}>
              {data?.team_name}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: index === 0 ? '#47b652' : '#3e3e3e',
          fontSize: 18,
          fontWeight: '700',
          marginRight: 20,
        }}>
        {data.stat}
      </Text>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
