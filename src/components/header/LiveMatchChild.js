import AntDesign from "react-native-vector-icons/dist/AntDesign";
import {
  getTimeStatusLabel,
  TIME_STATUSES,
} from "components/Livescore/LiveScoreScreen/MatchStatusScore";
import moment from "moment";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CancelSource, API } from "services";
import Colors from "styles/colors";

import FastImage from "react-native-fast-image";

AntDesign.loadFont();

export default function LiveMatchChild({
  i,
  index,
  item,
  deviceId,
  trigger,
  settrigger,
  navigation,
}) {
  const [star, setStar] = useState();
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

  const isMatchFinished =
    i.time_status === TIME_STATUSES.FT || i.time_status === TIME_STATUSES.FT_PEN;

  return (
    <View style={[styles.box, { marginRight: 5 }]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("liveScoreDetails", {
            item: i,
            ligueName: item.league_name,
            time_status: i.time_status,
          });
        }}
        style={styles.topBox}
      >
        <View style={styles.left}>
          <View style={styles.clubCont}>
            <View style={styles.imgCont}>
              <FastImage
                style={{ width: "100%", height: "100%" }}
                source={{ uri: i.localteam_logo_path }}
              />
            </View>
            <Text numberOfLines={1} style={styles.clubName}>
              {i.localteam_name}
            </Text>
          </View>
          <View style={styles.clubCont}>
            <View style={styles.imgCont}>
              <FastImage
                style={{ width: "100%", height: "100%" }}
                source={{ uri: i.visitorteam_logo_path }}
              />
            </View>
            <Text numberOfLines={1} style={styles.clubName}>
              {i.visitorteam_name}
            </Text>
          </View>
        </View>
        {i.time_status === "NS" ? (
          <View style={styles.right}>
            <Text style={[styles.num, { color: "black" }]}>-</Text>
            <Text style={[styles.num, { color: "black" }]}>-</Text>
          </View>
        ) : (
          <View style={styles.right}>
            <Text
              style={{
                ...styles.num,
                ...{ color: isMatchFinished ? "black" : "red" },
              }}
            >
              {i.localteam_score}
            </Text>
            <Text style={[styles.num, { color: isMatchFinished ? "black" : "red" }]}>
              {i.visitorteam_score}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.bottomContent}>
        <TouchableOpacity style={styles.iconCont}>
          {star ? (
            <AntDesign
              name="star"
              size={15}
              color="#E53C48"
              onPress={() => {
                setStar(false);
                addOrRemoveFavoriteMatchesHandler(i.match_id, "remove");
                settrigger(!trigger);
              }}
            />
          ) : (
            <AntDesign
              name="staro"
              size={15}
              color="#D5D5D5"
              onPress={() => {
                setStar(true);
                addOrRemoveFavoriteMatchesHandler(i.match_id, "save");
                settrigger(!trigger);
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.textCont}>
          <Text
            style={[
              styles.num,
              { color: isMatchFinished ? "black" : "red" },
              { marginRight: isMatchFinished || i.time_minute ? -5 : 0 },
            ]}
          >
            {/* {i.time_minute
                     ? `${i.time_minute}'`
                     : i.time_status === 'FT' && i.time_status} */}
            {i.time_status === TIME_STATUSES.FT ||
            i.time_status === TIME_STATUSES.HT ||
            i.time_status === TIME_STATUSES.ET ||
            i.time_status === TIME_STATUSES.AET ||
            i.time_status === TIME_STATUSES.FT_PEN
              ? getTimeStatusLabel(i.time_status)
              : i.time_minute && `${i.time_minute}'`}
          </Text>
          {!i.time_minute && (
            <Text style={styles.time}>{moment(i.starting_at).format("HH:mm")}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  boxContainer: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingRight: 40,
    paddingVertical: 11,
    zIndex: 10,
  },
  box: {
    height: 97,
    width: 165,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    backgroundColor: Colors.white,
  },
  topBox: {
    height: 66,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  left: {
    flex: 1,
    paddingLeft: 14,
  },
  right: {
    width: 30,
    backgroundColor: "#EEEEEE",
    borderRadius: 7,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 2,
  },
  num: {
    color: "#E53C48",
    fontSize: 12,
  },
  clubCont: {
    flex: 1 / 2,
    alignItems: "center",
    flexDirection: "row",
  },
  clubName: {
    color: "#000",
    fontSize: 10,
    marginRight: 28,
  },
  imgCont: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  bottomContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconCont: {
    width: 14,
    height: 14,
    color: "#A1A1A1",
    marginLeft: 17,
  },
  textCont: {
    flexDirection: "row",
    marginRight: 14,
  },
  time: {
    fontSize: 12,
    color: "#A1A1A1",
    marginLeft: 9,
  },
});
