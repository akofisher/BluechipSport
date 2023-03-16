import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {HorizontalItem} from '../../../../types';

type Props = {
  data: HorizontalItem[];
};

const Scrollable = ({data}: Props) => {
  const [selectedItem, setSelectedItem] = useState<HorizontalItem>(data[0]);
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalStyle}
        horizontal={true}
        contentContainerStyle={styles.horizontalContainer}>
        {data.map((item: HorizontalItem, index: number) => {
          return (
            <TouchableOpacity
              key={item.id.toString()}
              onPress={() => setSelectedItem(item)}
              style={[
                styles.horizontalItem,
                index === data.length - 1 ? styles.horizontalLast : null,
                item.id === selectedItem.id ? styles.horizontalActive : null,
              ]}>
              <Text
                style={[
                  styles.horizontalText,
                  item.id === selectedItem.id
                    ? styles.horizontalTextActive
                    : null,
                ]}>
                {item.label.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {selectedItem.returnFunc()}
    </ScrollView>
  );
};

export default Scrollable;

const styles = StyleSheet.create({
  horizontalStyle: {width: '100%'},
  horizontalContainer: {
    height: 54,
    backgroundColor: '#101921',
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  horizontalItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#101921',
    height: '100%',
    justifyContent: 'center',
    marginRight: 36,
  },
  horizontalLast: {
    marginRight: 0,
  },
  horizontalActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF0960',
  },
  horizontalText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 13,
  },
  horizontalTextActive: {
    color: '#FF0960',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 13,
  },
});
