import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/common";

export default function MatchStatistics({ statistics, left, right, percent, title }) {
  const [leftperc, setLeftperc] = useState();
  const [rightperc, setRightperc] = useState();
  const percentage = (left, right) => {
    const onePercent = (left + right) / 100;
    setLeftperc(left / onePercent);
    setRightperc(right / onePercent);
  };
  useEffect(() => {
    percentage(left, right);
  }, []);
  return (
    <View style={Styles.container}>
      <View style={Styles.possessionBallCont}>
        <Text style={Styles.possessionBall}>{percent ? leftperc && leftperc + "%" : left}</Text>
        <Text style={[Styles.possessionBall, { marginBottom: 8 }]}>{title}</Text>
        <Text style={Styles.possessionBall}>{percent ? rightperc && rightperc + "%" : right}</Text>
      </View>

      <View style={Styles.viewContainer}>
        <View style={Styles.whiteCont}>
          <View
            style={[
              Styles.localRed,
              { width: leftperc ? leftperc + "%" : 0 },

              {
                backgroundColor: left && left > right ? "#E53C48" : "#6E6E6E",
              },
            ]}
          />
        </View>
        <View style={Styles.whiteCont}>
          <View
            style={[
              Styles.visitorRed,
              { width: rightperc ? rightperc + "%" : 0 },
              {
                backgroundColor: right && right > left ? "#E53C48" : "#6E6E6E",
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  possessionBallCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  possessionBall: {
    fontSize: 12,
    color: "#6E6E6E",
    marginVertical: 2,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  whiteCont: {
    backgroundColor: "#F4F4F4",
    width: "48%",
    borderRadius: 5,
  },
  localRed: {
    paddingVertical: 4.5,
    borderRadius: 5,
    alignSelf: "flex-end",
    width: "100%",
  },
  visitorRed: {
    paddingVertical: 4.5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
});
