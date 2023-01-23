import { getTimeStatusLabel } from "components/Livescore/LiveScoreScreen/MatchStatusScore";
import moment from "moment";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export default function LocalteamVisitorteamLive({ items, navigation }) {
  return (
    <View>
      <View style={Styles.contain}>
        <TouchableOpacity
          style={Styles.localteamNameteamCont}
          onPress={() => {
            navigation.navigate("teamScore", {
              TeamId: items.localteam_id,
              LeagueId: items.league_id,
              TeamName: items.localteam_name,
              teamLogo: items.localteam_logo_path,
            });
          }}
        >
          <FastImage
            source={{ uri: items.localteam_logo_path }}
            style={Styles.image}
            resizeMode="contain"
          />
          <Text style={Styles.teamName}>{items.localteam_name}</Text>
        </TouchableOpacity>
        {items.time_status === "NS" ||
        items.time_status === "CANCL" ||
        items.time_status === "TBA" ||
        items.time_status === "POSTP" ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={Styles.date}>
                {moment(items.starting_at, "YYYY-MM-D HH:mm:ss").format("D.MM.YYYY")}
              </Text>
              <Text style={Styles.timed}>
                {moment(items.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
              </Text>
            </View>
            <Text style={Styles.beaforetDash}>-</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={Styles.dateTime} />

            <View style={Styles.scoreCont}>
              <Text
                style={[
                  Styles.score,
                  {
                    color:
                      items.time_status === "FT" ||
                      items.time_status === "FT_PEN" ||
                      items.time_status === "AET" ||
                      items.time_status === "NS" ||
                      items.time_status === "CANCL" ||
                      items.time_status === "TBA" ||
                      items.time_status === "POSTP"
                        ? "black"
                        : "#E53C48",
                  },
                ]}
              >
                {items.localteam_score}
              </Text>
              <Text
                style={[
                  Styles.dash,
                  {
                    color:
                      items.time_status === "FT" ||
                      items.time_status === "FT_PEN" ||
                      items.time_status === "AET" ||
                      items.time_status === "NS" ||
                      items.time_status === "CANCL" ||
                      items.time_status === "TBA" ||
                      items.time_status === "POSTP"
                        ? "black"
                        : "#E53C48",
                  },
                ]}
              >
                -
              </Text>
              <Text
                style={[
                  Styles.score,
                  {
                    color:
                      items.time_status === "FT" ||
                      items.time_status === "FT_PEN" ||
                      items.time_status === "AET" ||
                      items.time_status === "NS" ||
                      items.time_status === "CANCL" ||
                      items.time_status === "TBA" ||
                      items.time_status === "POSTP"
                        ? "black"
                        : "#E53C48",
                  },
                ]}
              >
                {items.visitorteam_score}
              </Text>
            </View>
            {items.time_status === "FT" ||
            items.time_status === "AET" ||
            items.time_status === "FT_PEN" ||
            items.time_status === "AET" ? (
              <Text style={[Styles.time, { color: "#000000" }]}>
                {getTimeStatusLabel(items.time_status)}
              </Text>
            ) : (
              <Text style={Styles.time}>{items.time_minute}'</Text>
            )}
          </View>
        )}

        <View>
          <TouchableOpacity
            style={Styles.localteamNameteamCont}
            onPress={() => {
              navigation.navigate("teamScore", {
                TeamId: items.visitorteam_id,
                LeagueId: items.league_id,
                TeamName: items.visitorteam_name,
                teamLogo: items.visitorteam_logo_path,
              });
            }}
          >
            <FastImage
              source={{
                uri: items.visitorteam_logo_path,
              }}
              style={Styles.image}
              resizeMode="contain"
            />
            <Text style={Styles.teamName}>{items.visitorteam_name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  contain: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  localteamNameteamCont: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 45,
    height: 45,
  },
  teamName: {
    fontSize: 13,
    textAlign: "center",
    width: 100,
    marginBottom: 5,
    marginTop: 8,
    lineHeight: 20,
  },
  scoreCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  dash: {
    paddingHorizontal: 5,
    fontSize: 23,
    fontWeight: "bold",
    color: "#E53C48",
  },
  beaforetDash: {
    fontSize: 23,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  score: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#E53C48",
    marginVertical: 5,
  },
  time: {
    fontSize: 11,
    color: "#E53C48",
  },
  date: {
    fontSize: 10,
    color: "#949494",
  },
  timed: {
    fontSize: 10,
    color: "#949494",
    marginLeft: 4,
  },
});
