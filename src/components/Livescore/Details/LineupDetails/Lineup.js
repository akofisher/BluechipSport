import { getPlayerScoreBackground } from "components/Livescore/Details/LineupDetails/utils";
import i18next from "i18next";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Colors from "styles/colors";
import { getFormattedPlayerRating } from "utils/normalise";
import { Text } from "components/common";

export default function Lineup({ info, onPlayerPress }) {
  return (
    <View style={Styles.container}>
      {info ? (
        <View style={Styles.infoCont}>
          {info?.map((player) => {
            const rating = getFormattedPlayerRating(player);
            return (
              <TouchableOpacity
                key={player?.player_id}
                style={Styles.onePlayer}
                onPress={() => onPlayerPress(player)}
              >
                <View style={Styles.onePlayer}>
                  <Text ellipsizeMode="tail" style={Styles.localPlayerNumber}>
                    {player.number}
                  </Text>
                  <FastImage
                    style={Styles.image}
                    source={{ uri: player.country_flag }}
                    resizeMode="cover"
                  />
                  <Text style={Styles.playerNumberName}>{player.player_name}</Text>
                </View>
                {rating ? (
                  <View
                    style={[Styles.rating, { backgroundColor: getPlayerScoreBackground(rating) }]}
                  >
                    <Text style={Styles.ratingText}>{rating}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
          <View style={Styles.halfScreen} />
        </View>
      ) : (
        <Text style={{ textAlign: "center", fontSize: 12 }}>{i18next.t("MatchNotStarted")}</Text>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 25,
    flexDirection: "row",
  },
  infoCont: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  onePlayer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  image: {
    width: 26,
    height: 17,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  playerNumberName: {
    color: "#292929",
    fontSize: 12,
  },
  localPlayerNumber: {
    fontSize: 12,
    color: "#474747",
    width: 20,
    textAlign: "center",
  },
  rating: {
    backgroundColor: "#2C8C36",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 30,
  },
  ratingText: {
    fontWeight: "700",
    color: Colors.white,
    fontSize: 8,
    textAlign: "center",
  },
});
