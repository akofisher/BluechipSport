import { getPlayerScoreBackground } from "components/Livescore/Details/LineupDetails/utils";
import React from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { getFormattedPlayerRating } from "utils/normalise";
import { Text } from "components/common";

import goalkeeper from "../../../../../assets/icons/local.png";
import localPlayerPhoto from "../../../../../assets/icons/localWhite.png";
import visitorPlayerPhoto from "../../../../../assets/icons/visitor.png";

const LineupStadiumRow = (props) => {
  const { goalKeeper, items, rowHeight, reverse, onPlayerPress } = props;
  const goalKeeperRating = getFormattedPlayerRating(goalKeeper);

  return (
    <View style={[styles.rowContainer, { height: `${100 / (rowHeight + 1)}%` }]}>
      {!goalKeeper ? (
        items?.map((player) => {
          const rating = getFormattedPlayerRating(player);
          if (!player) {
            return null;
          }
          return (
            <TouchableOpacity
              onPress={() => onPlayerPress(player)}
              key={player?.player_id}
              style={styles.container}
            >
              <ImageBackground
                resizeMode="cover"
                style={styles.bgImage}
                source={reverse ? visitorPlayerPhoto : localPlayerPhoto}
              >
                <Text ellipsizeMode="tail" style={{ fontSize: 10, fontWeight: "bold" }}>
                  {player.number}
                </Text>
                {rating ? (
                  <View
                    style={[styles.rating, { backgroundColor: getPlayerScoreBackground(rating) }]}
                  >
                    <Text style={[styles.ratingText]}>{rating}</Text>
                  </View>
                ) : null}
              </ImageBackground>
              <Text ellipsizeMode="tail" style={{ color: "#FFFFFF", fontSize: 12, marginTop: 5 }}>
                {player.player_name}
              </Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <TouchableOpacity onPress={() => onPlayerPress(goalKeeper)} style={styles.goalkeeper}>
          <ImageBackground resizeMode="cover" style={styles.bgImage} source={goalkeeper}>
            <Text ellipsizeMode="tail" style={{ fontSize: 10, fontWeight: "bold" }}>
              {goalKeeper.number}
            </Text>
            {goalKeeperRating ? (
              <View
                style={[
                  styles.rating,
                  { backgroundColor: getPlayerScoreBackground(goalKeeperRating) },
                ]}
              >
                <Text style={styles.ratingText}>{goalKeeperRating}</Text>
              </View>
            ) : null}
          </ImageBackground>
          <Text ellipsizeMode="tail" style={{ color: "#FFFFFF", fontSize: 12, marginTop: 5 }}>
            {goalKeeper.player_name}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: 33,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  goalkeeper: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rating: {
    position: "absolute",
    zIndex: 5,
    top: -10,
    right: -25,
    backgroundColor: "#8BEC95",
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 1,
    borderWidth: 3,
    borderColor: "#45A74F",
    width: 35,
  },
  ratingText: {
    fontWeight: "700",
    color: "white",
    fontSize: 8,
    textAlign: "center",
  },
});

export default LineupStadiumRow;
