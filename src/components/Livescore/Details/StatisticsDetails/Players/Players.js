import LongButton from "components/common/LongButton";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

const ratingSort = (a, b) => {
  return b.stats.rating - a.stats.rating;
};

const shotsSort = (a, b) => {
  return b.stats.shots.shots_total - a.stats.shots.shots_total;
};

export default function Players({ players, navigation }) {
  const [state, setstate] = useState([]);
  const [isarray, setisArray] = useState(false);
  const [threeItems, setThreeItem] = useState([]);
  const [otherItems, setOtherItems] = useState([]);

  const [isOpren, setIsOpren] = useState(false);
  const [isOpen1, setIsopen1] = useState(false);

  useEffect(() => {
    if (isarray === false) {
      setstate(players.slice().sort(ratingSort));
      setisArray(true);
    }
  }, []);
  useEffect(() => {
    renderItems();
  }, [state]);

  const renderItems = () => {
    if (state.length > 0) {
      const three = [];
      for (let i = 0; i < 3; i++) {
        three.push(state[i]);
        setThreeItem(three);
      }
      const other = [];
      for (let g = 3; g < state.length; g++) {
        other.push(state[g]);
        setOtherItems(other);
      }
    }
  };

  if (state.length > 0) {
    return (
      <View>
        <View style={Styles.container}>
          <Text style={Styles.playersRating}>{i18next.t("PlayerRating")}</Text>
          <View style={Styles.contChild}>
            {threeItems.length > 0 &&
              threeItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={Styles.playersCont}
                    onPress={() =>
                      navigation.navigate("playerScore", {
                        PlayerId: item?.player_id,
                      })
                    }
                  >
                    <View style={Styles.cont}>
                      <FastImage style={Styles.playerImage} source={{ uri: item.image_path }} />
                      <View style={Styles.playerNameTeamNameCont}>
                        <Text style={Styles.playerName}>{item.player_name}</Text>
                        <View style={Styles.teamLogoTeamNameCont}>
                          <FastImage
                            style={Styles.teamImage}
                            source={{
                              uri: item.team_logo_path,
                            }}
                          />
                          <Text style={Styles.teamName}>{item.team_name}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={Styles.rating}>{item.stats.rating}</Text>
                  </TouchableOpacity>
                );
              })}
            {isOpren === true &&
              otherItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={Styles.playersCont}
                    onPress={() =>
                      navigation.navigate("playerScore", {
                        PlayerId: item?.player_id,
                      })
                    }
                  >
                    <View style={Styles.cont}>
                      <FastImage style={Styles.playerImage} source={{ uri: item.image_path }} />
                      <View style={Styles.playerNameTeamNameCont}>
                        <Text style={Styles.playerName}>{item.player_name}</Text>
                        <View style={Styles.teamLogoTeamNameCont}>
                          <FastImage
                            style={Styles.teamImage}
                            source={{
                              uri: item.team_logo_path,
                            }}
                          />
                          <Text style={Styles.teamName}>{item.team_name}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={Styles.rating}>{item.stats.rating}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          <LongButton
            onPress={() => {
              if (isOpren === false) {
                setIsOpren(true);
              } else if (isOpren === true) {
                setIsOpren(false);
              }
            }}
            tittle={`${!isOpren ? i18next.t("ViewAllPlayers") : i18next.t("Close")}`}
            textStyle={{ color: "#949494" }}
            style={Styles.button}
          />
        </View>
        <View style={Styles.container}>
          <Text style={Styles.playersRating}>{i18next.t("TotalShots")}</Text>
          <View style={Styles.contChild}>
            {threeItems.length > 0 &&
              threeItems
                .slice()
                .sort(shotsSort)
                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={Styles.playersCont}
                      onPress={() =>
                        navigation.navigate("playerScore", {
                          PlayerId: item?.player_id,
                        })
                      }
                    >
                      <View style={Styles.cont}>
                        <FastImage style={Styles.playerImage} source={{ uri: item.image_path }} />
                        <View style={Styles.playerNameTeamNameCont}>
                          <Text style={Styles.playerName}>{item.player_name}</Text>
                          <View style={Styles.teamLogoTeamNameCont}>
                            <FastImage
                              style={Styles.teamImage}
                              source={{
                                uri: item.team_logo_path,
                              }}
                            />
                            <Text style={Styles.teamName}>{item.team_name}</Text>
                          </View>
                        </View>
                      </View>
                      <Text style={Styles.rating}>{item.stats.shots.shots_total}</Text>
                    </TouchableOpacity>
                  );
                })}
            {isOpen1 === true &&
              otherItems
                .slice()
                .sort(shotsSort)
                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={Styles.playersCont}
                      onPress={() =>
                        navigation.navigate("playerScore", {
                          PlayerId: item?.player_id,
                        })
                      }
                    >
                      <View style={Styles.cont}>
                        <FastImage style={Styles.playerImage} source={{ uri: item.image_path }} />
                        <View style={Styles.playerNameTeamNameCont}>
                          <Text style={Styles.playerName}>{item.player_name}</Text>
                          <View style={Styles.teamLogoTeamNameCont}>
                            <FastImage
                              style={Styles.teamImage}
                              source={{
                                uri: item.team_logo_path,
                              }}
                            />
                            <Text style={Styles.teamName}>{item.team_name}</Text>
                          </View>
                        </View>
                      </View>
                      <Text style={Styles.rating}>{item.stats.shots.shots_total}</Text>
                    </TouchableOpacity>
                  );
                })}
          </View>

          <LongButton
            onPress={() => {
              if (isOpen1 === false) {
                setIsopen1(true);
              } else if (isOpen1 === true) {
                setIsopen1(false);
              }
            }}
            tittle={`${!isOpen1 ? i18next.t("ViewAllPlayers") : i18next.t("Close")}`}
            textStyle={{ color: "#949494" }}
            style={Styles.button}
          />
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  contChild: {
    paddingHorizontal: 27,
  },
  playersRating: {
    fontSize: 13,
    fontWeight: "bold",
    paddingVertical: 20,
    paddingHorizontal: 27,
    textTransform: "uppercase",
  },
  playersCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 5,
    marginVertical: 3,
  },
  playerImage: {
    height: 55,
    width: 54,
    borderRadius: 5,
  },
  playerName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  playerNameTeamNameCont: {
    marginLeft: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E3E3E",
    paddingRight: 15,
  },
  teamName: {
    fontSize: 10,
    color: "#7C7C7C",
    marginLeft: 5,
  },
  teamImage: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#F4F4F4",
    marginTop: 17,
    marginHorizontal: 27,
    marginBottom: 20,
  },
  cont: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamLogoTeamNameCont: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
  },
});
