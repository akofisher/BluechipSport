import { useIsFocused } from "@react-navigation/native";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import { API } from "services";
import { Text } from "components/common";

import LiveMatch from "./LIveMatch";

MaterialIcons.loadFont();

const NewsHeader = ({ navigation, info, League, leagueId, LeagueLogo, deviceId }) => {
  const [dropDown, setDropdown] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const [league, setLeague] = useState(League);
  const [leagueLogo, setLeagueLogo] = useState(LeagueLogo);

  const isFocused = useIsFocused();

  const getLiveMatchesDetail = async (id) => {
    await API.getLiveMatchesDetail({ kwds: { id } })
      .then(({ data }) => {
        // console.log('data flatlist', data);
        setDetailInfo(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getLiveMatchesDetail(leagueId);
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderColor: "#F2F2F2",
        height: 165,
      }}
    >
      <View style={styles.leagueHeader}>
        <View style={{ marginRight: 11 }}>
          <FastImage
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            source={{ uri: leagueLogo }}
          />
        </View>

        <TouchableOpacity
          style={styles.dropDownCon}
          onPress={() => {
            setDropdown(!dropDown);
          }}
        >
          <Text style={styles.dropDownText}>{league}</Text>
          <View style={styles.dropDownIconCont}>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Livescore")}>
          <Text>{i18next.t("All")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chooseTab}>
        {dropDown && (
          <ScrollView style={{ height: 120 }}>
            {info?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "#EBEBEB",
                    flexDirection: "row",
                  }}
                  key={index}
                  onPress={() => {
                    setLeague(item.name);
                    getLiveMatchesDetail(item.league_id);
                    setLeagueLogo(item.image_path);
                    setDropdown(false);
                  }}
                >
                  <FastImage
                    style={{ marginHorizontal: 10, width: 25, height: 25 }}
                    source={{ uri: item.image_path }}
                    resizeMode="contain"
                  />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      <FlatList
        style={styles.boxContainer}
        contentContainerStyle={{ paddingRight: 32 }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        extraData={detailInfo}
        data={detailInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LiveMatch item={item} deviceId={deviceId} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leagueHeader: {
    height: 44,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#EBEBEB",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDownCon: {
    flex: 1,
    flexDirection: "row",
  },
  dropDownTwxt: {
    color: "#3E3E3E",
    fontSize: 11,
    fontWeight: "bold",
  },
  chooseTab: {
    backgroundColor: "#ffffff",
    width: "100%",
    position: "absolute",
    zIndex: 100,
    top: 44,
  },
  dropDownIconCont: {
    width: 20,
    height: 20,
    marginHorizontal: 29,
  },
  boxContainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingRight: 40,
    paddingVertical: 11,
    zIndex: 10,
  },
  box: {
    width: 165,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
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

export default NewsHeader;
