import { SmallBallSvg } from "assets/svgs/AllSvgs";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "components/common";

export default function PlayerAllScorers({
  scorers,
  ball,
  asist,
  card,
  red,
  img,
  tittle,
  navigation,
}) {
  return (
    <View style={Styles.whiteCont}>
      <View style={Styles.container}>
        <View style={Styles.goalHeader}>
          <Text style={Styles.tittleText}>{tittle}</Text>
          <View style={Styles.imgCont}>
            <Image
              style={Styles.image}
              source={{
                uri: img,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        {scorers?.map((item, index) => {
          return (
            <TouchableOpacity
              style={Styles.playerSocreCont}
              key={index}
              onPress={() => {
                navigation.navigate("playerScore", {
                  PlayerId: item?.player_id,
                });
              }}
            >
              <View style={Styles.cardAndScoreCont}>
                <View style={Styles.playerPositionCont}>
                  <Text style={Styles.indexPos}>{index + 1}</Text>
                </View>
                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.playerName}>
                  {item.player_name}
                </Text>
              </View>
              {ball && (
                <View style={Styles.cardAndScoreCont}>
                  <SmallBallSvg />
                  <Text style={Styles.goalsText}>{item.goals}</Text>
                </View>
              )}
              {card && (
                <View style={Styles.cardAndScoreCont}>
                  <View style={[Styles.card, { backgroundColor: "#FFD159" }]} />
                  <Text style={Styles.goalsText}>{item.yellowcards}</Text>
                </View>
              )}
              {red && (
                <View style={Styles.cardAndScoreCont}>
                  <View style={[Styles.card, { backgroundColor: "#E53C48" }]} />
                  <Text style={Styles.goalsText}>{item.redcards}</Text>
                </View>
              )}
              {asist && (
                <View style={Styles.cardAndScoreCont}>
                  <Text>A</Text>
                  <Text style={Styles.goalsText}>{item.assists}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
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
  },
  imgCont: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 55,
    height: 80,
    marginTop: 20,
    alignItems: "center",
  },
  playerPositionCont: {
    backgroundColor: "#E53C48",
    width: 25,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  indexPos: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  playerSocreCont: {
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  goalHeader: {
    backgroundColor: "#F4F4F4",
    height: 60,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 5,
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
    marginLeft: 10,
    fontWeight: "bold",
    width: 170,
  },

  card: {
    width: 15,
    height: 20,
    borderRadius: 3,
  },
  cardAndScoreCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  tittleText: {
    position: "absolute",
    left: 30,
    top: 20,
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
