import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  local: number;
  visitor: number;
  label: string;
};

const Stat = ({local, visitor, label}: Props) => {
  const localVal = (local / (visitor + local)) * 100;
  const visitorVal = (visitor / (visitor + local)) * 100;
  return (
    <View style={{paddingHorizontal: 15, marginBottom: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{local}</Text>
        <Text>{label}</Text>
        <Text>{visitor}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View
          style={{
            marginRight: 15,
            flex: 1,
            backgroundColor: '#F4F4F4',
            height: 10,
            borderRadius: 20,
            position: 'relative',
          }}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              width: `${localVal}%`,
              height: 10,
              borderRadius: 20,
              backgroundColor: localVal <= visitorVal ? '#2F3031' : '#E53C48',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 15,
            backgroundColor: '#F4F4F4',
            borderRadius: 20,
            position: 'relative',
          }}>
          <View
            style={{
              position: 'absolute',
              width: `${visitorVal}%`,
              height: 10,
              borderRadius: 20,
              backgroundColor: visitorVal <= localVal ? '#2F3031' : '#E53C48',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({});
