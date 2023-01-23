import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "components/common";

export default function ScrollViewHorizontalCommon({
  details,
  setVisibleDetail,
  visibleDetail,
  containerStyle,
  itemStyle,
}) {
  const scrollRef = useRef(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ marginVertical: 15 }, containerStyle]}
    >
      <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
        {details.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={itemStyle}
              onPress={() => {
                scrollRef.current.scrollTo({
                  x: index < 2 ? index * 50 : index * 90,
                });
                setVisibleDetail(item);
              }}
            >
              <View
                style={[
                  Styles.textCont,
                  {
                    backgroundColor: visibleDetail === item ? "#F5F5F5" : "white",
                  },
                ]}
              >
                <Text
                  style={[
                    Styles.text,
                    { color: visibleDetail === item ? "black" : "#777777" },
                    { fontWeight: visibleDetail === item ? "500" : "400" },
                  ]}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#777777",
  },
  textCont: {
    paddingVertical: 10,
    borderRadius: 24,
    paddingHorizontal: 15,
  },
});
