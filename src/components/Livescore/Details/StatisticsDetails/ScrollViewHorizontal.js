import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function ScrollViewHorizontal({
  details,
  setVisibleDetails,
  visibleDetails,
  containerStyle,
}) {
  return (
    <ScrollView
      horizontal
      style={[Styles.scrollView, containerStyle]}
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
        {details.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => setVisibleDetails(item)}>
              <View
                style={[
                  Styles.textCont,
                  {
                    backgroundColor: visibleDetails === item ? "white" : "#E5E5E5",
                  },
                ]}
              >
                <Text
                  style={[
                    Styles.text,
                    { color: visibleDetails === item ? "black" : "#6E6E6E" },
                    { fontWeight: visibleDetails === item ? "500" : "400" },
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
  scrollView: {
    marginVertical: 15,
  },

  textCont: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 24,
  },
  text: {
    fontSize: 12,
    color: "#6E6E6E",
  },
});
