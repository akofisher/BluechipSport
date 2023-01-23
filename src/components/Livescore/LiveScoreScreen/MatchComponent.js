import { Separator, Text } from "components/common";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { CancelSource, API } from "services";

AntDesign.loadFont();

import MatchStatusScore from "./MatchStatusScore";
import Icon from "react-native-vector-icons/dist/FontAwesome";

const MatchComponent = ({
  index,
  team,
  liga,
  navigation,
  deviceId,
  isFav,
  setTriggerrer,
  triggerrer,
}) => {
  const [star, setStar] = useState(isFav);
  const source = CancelSource();

  const addOrRemoveFavoriteMatchesHandler = (id, action) => {
    API.addOrRemoveFavoriteMatches({
      cancelToken: source.token,
      kwds: { action, id, deviceId },
    })
      .then(({ data }) => {})
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          {star ? (
            <AntDesign
              onPress={() => {
                setStar(false);
                addOrRemoveFavoriteMatchesHandler(team.match_id, "remove");
                setTriggerrer(!triggerrer);
              }}
              name="star"
              style={[Styles.antDesign, { color: "#E53C48" }]}
            />
          ) : (
            <AntDesign
              onPress={() => {
                setStar(true);
                addOrRemoveFavoriteMatchesHandler(team.match_id, "save");
                setTriggerrer(!triggerrer);
              }}
              name="staro"
              style={Styles.antDesign}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.liveContainer}
          onPress={() =>
            navigation.navigate("liveScoreDetails", {
              item: team,
              ligueName: liga.league_name,
              time_status: team.time_status,
            })
          }
        >
          <View style={Styles.imageTeamNameTeamContainer}>
            <View style={Styles.firstImageTeamNameTeamContainer}>
              <FastImage
                style={Styles.imageTeams}
                source={{ uri: team.localteam_logo_path }}
                resizeMode="contain"
              />
              <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.nameTeam}>
                {team.localteam_name}
              </Text>
            </View>
            <View style={Styles.secondImageTeamNameTeamContainer}>
              <FastImage
                style={Styles.imageTeams}
                source={{ uri: team.visitorteam_logo_path }}
                resizeMode="contain"
              />
              <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.nameTeam}>
                {team.visitorteam_name}
              </Text>
            </View>
          </View>
          <MatchStatusScore status={team.time_status} item={team} />
        </TouchableOpacity>
      </View>
      {liga.data.length - 1 !== index && <Separator />}
    </View>
  );
};

const Styles = StyleSheet.create({
  scrollViewContainar: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 20,
    paddingBottom: 4,
  },
  liveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginLeft: 12,
    flex: 1,
  },
  antDesign: {
    color: "#D5D5D5",
    fontSize: 22,
    marginVertical: 24,
    paddingLeft: 17,
  },

  imageTeamNameTeamContainer: {
    flexDirection: "column",
    marginTop: -3,
  },
  firstImageTeamNameTeamContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  imageTeams: {
    width: 22,
    height: 22,
  },
  nameTeam: {
    marginHorizontal: 6,
    fontSize: 12,

    width: 160,
  },
  secondImageTeamNameTeamContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default MatchComponent;
