import { BallSvg } from "assets/svgs/AllSvgs";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export default function ScorersComponent({
  scorer,
  goal,
  yallcard,
  redcard,
  asist,
  navigation,
  screenName,
}) {
  return (
    <View style={Styles.whiteCont}>
      {scorer?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("playerScore", { PlayerId: item.player_id })}
            style={Styles.container}
            key={index}
          >
            <View style={Styles.playerSocreCont}>
              <View style={Styles.cardAndScoreCont}>
                <View style={Styles.playerPositionCont}>
                  <FastImage
                    style={Styles.image}
                    source={{
                      uri: item?.player_image,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={Styles.playerName}>{item.player_name}</Text>
              </View>
              {goal && (
                <View style={Styles.cardAndScoreCont}>
                  <BallSvg />
                  <Text style={Styles.goalsText}>{item.goals}</Text>
                </View>
              )}
              {yallcard && (
                <View style={Styles.cardAndScoreCont}>
                  <View style={[Styles.card, { backgroundColor: "#FFD159" }]} />
                  <Text style={Styles.goalsText}>{item.yellowcards}</Text>
                </View>
              )}
              {redcard && (
                <View style={Styles.cardAndScoreCont}>
                  <View style={[Styles.card, { backgroundColor: "#E53C48" }]} />
                  <Text style={Styles.goalsText}>{item.redcards}</Text>
                </View>
              )}
              {asist && (
                <View style={Styles.cardAndScoreCont}>
                  <Text style={Styles.asists}>A</Text>
                  <Text style={Styles.goalsText}>{item.assists}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  whiteCont: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 30,
  },
  container: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },

  playerPositionCont: {
    width: 25,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  playerSocreCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
  },

  image: {
    width: 60,
    height: 60,
  },
  goalsText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
    textAlign: "center",
    width: 20,
    fontWeight: "bold",
  },

  playerName: {
    fontSize: 13,
    color: "#3C3C3C",
    marginLeft: 20,
    fontWeight: "bold",
  },

  cardAndScoreCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: 15,
    height: 20,
    borderRadius: 3,
  },
  asists: {
    fontSize: 18,
    marginRight: 4,
  },
});
