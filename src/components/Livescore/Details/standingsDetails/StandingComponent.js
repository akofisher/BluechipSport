import { Separator, Text } from "components/common";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "styles";
import FastImage from "react-native-fast-image";

function StandingComponent({ standing, navigation, screenName, LeagueId }) {
  return (
    <View>
      {standing?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (screenName === "liveScoreDetails") {
                navigation.navigate("teamScore", {
                  TeamId: item.team_id,
                  TeamName: item.team_name,
                  teamLogo: item.logo_path,
                  LeagueId,
                });
              } else if (screenName === "LeagueDrawer") {
                navigation.navigate("teamScore", {
                  TeamId: item.team_id,
                  TeamName: item.team_name,
                  teamLogo: item.logo_path,
                  LeagueId,
                });
              } else if (screenName === "teamScoreDrawer") {
                navigation.navigate("teamScore", {
                  TeamId: item.team_id,
                  TeamName: item.team_name,
                  teamLogo: item.logo_path,
                  LeagueId,
                });
              } else if (screenName === "standing") {
                navigation.navigate("teamScore", {
                  TeamId: item.team_id,
                  TeamName: item.team_name,
                  teamLogo: item.logo_path,
                  LeagueId,
                });
              } else {
                navigation.navigate("teamScore", {
                  TeamId: item.team_id,
                  TeamName: item.team_name,
                  teamLogo: item.logo_path,
                  LeagueId,
                });
              }
            }}
          >
            <View style={styles.container}>
              <View style={styles.positIconTeamCont}>
                <View style={styles.numberContainer}>
                  <Text style={styles.posit}>{item.position}</Text>
                </View>
                <View>
                  <FastImage source={{ uri: item.logo_path }} style={styles.logoContainer} />
                </View>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.groupName}>
                  {item.team_name}
                </Text>
              </View>
              <View style={styles.endTextsContainer}>
                <Text style={styles.endTexts}>{item.overall?.games_played}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.endTexts]}>{item.overall?.goals_scored}</Text>
                  <Text style={[styles.endTexts]}>:</Text>
                  <Text style={[styles.endTexts]}>{item.overall?.goals_against}</Text>
                </View>
                <Text style={[styles.endTexts]}>{item.points}</Text>
              </View>
            </View>
            {standing.length - 1 !== index && <Separator />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 11,
    marginVertical: 10,
  },
  numberContainer: {
    height: 27,
    width: 27,
    borderRadius: 6,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 25,
    width: 25,
    borderRadius: 6,

    justifyContent: "center",
    alignItems: "center",
    marginLeft: 13,
  },
  groupName: {
    textAlign: "center",
    marginLeft: 12,
    fontSize: 12,
  },
  endTextsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: 87,
  },
  endTexts: {
    color: Colors.textDefault,
    fontSize: 12,
    textAlign: "center",
  },
  posit: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: "600",
  },
  positIconTeamCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default StandingComponent;
