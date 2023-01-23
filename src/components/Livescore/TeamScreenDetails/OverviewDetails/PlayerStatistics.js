import { Separator, Text } from "components/common";
import i18next from "i18next";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

export default function PlayerStatistics({ navigation, lineup, def, mid, golk, forw }) {
  return (
    <View style={{ backgroundColor: "white", borderRadius: 25 }}>
      {lineup?.map((item, index) => {
        return (
          <View key={index}>
            {golk && item?.stats.position_id === 1 && (
              <View>
                <TouchableOpacity
                  style={Styles.contanier}
                  onPress={() => {
                    navigation.navigate("playerScore", {
                      PlayerId: item?.player_id,
                    });
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={Styles.image}
                      source={{
                        uri: item?.image_path,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={Styles.playerName}>
                        {item?.stats?.player?.data?.display_name}
                      </Text>
                      <View style={Styles.ageCont}>
                        <Text style={Styles.age}>{item?.stats.player.data.birthdate}</Text>
                      </View>
                      <Text style={Styles.diez}>#{item?.stats.number}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={Styles.score}>
                        {item?.stats.rating === null ? 0 : item?.stats.rating}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.appearences === null ? 0 : item?.stats.appearences}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.saves === null ? 0 : item?.stats.saves}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.cleansheets === null ? 0 : item?.stats.cleansheets}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.text}>{i18next.t("Rating")}</Text>
                      <Text style={Styles.text}>{i18next.t("Match")}</Text>
                      <Text style={Styles.text}>{i18next.t("Save")}</Text>
                      <Text style={Styles.text}>{i18next.t("DryDoor")}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {lineup.length - 1 !== index && <Separator color="#E5E5E5" />}
              </View>
            )}
            {def && item?.stats.position_id === 2 && (
              <View>
                <TouchableOpacity
                  style={Styles.contanier}
                  onPress={() => {
                    navigation.navigate("playerScore", {
                      PlayerId: item?.player_id,
                    });
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={Styles.image}
                      source={{
                        uri: item?.image_path,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={Styles.playerName}>
                        {item?.stats?.player?.data?.display_name}
                      </Text>
                      <View style={Styles.ageCont}>
                        <Text style={Styles.age}>{item?.stats.player.data.birthdate}</Text>
                      </View>
                      <Text style={Styles.diez}>#{item?.stats.number}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={Styles.score}>
                        {item?.stats.rating === null ? 0 : item?.stats.rating}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.appearences === null ? 0 : item?.stats.appearences}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.goals === null ? 0 : item?.stats.goals}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.assists === null ? 0 : item?.stats.assists}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.text}>{i18next.t("Rating")}</Text>
                      <Text style={Styles.text}>{i18next.t("Match")}</Text>
                      <Text style={Styles.text}>{i18next.t("Goal")}</Text>
                      <Text style={Styles.text}>{i18next.t("Assistant")}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {lineup.length - 1 !== index && <Separator color="#E5E5E5" />}
              </View>
            )}
            {mid && item?.stats.position_id === 3 && (
              <View>
                <TouchableOpacity
                  style={Styles.contanier}
                  onPress={() => {
                    navigation.navigate("playerScore", {
                      PlayerId: item?.player_id,
                    });
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={Styles.image}
                      source={{
                        uri: item.image_path,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={Styles.playerName}>
                        {item?.stats?.player?.data?.display_name}
                      </Text>
                      <View style={Styles.ageCont}>
                        <Text style={Styles.age}>{item.stats.player.data.birthdate}</Text>
                      </View>
                      <Text style={Styles.diez}>#{item.stats.number}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={Styles.score}>
                        {item.stats.rating === null ? 0 : item.stats.rating}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.appearences === null ? 0 : item?.stats.appearences}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.goals === null ? 0 : item?.stats.goals}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.assists === null ? 0 : item?.stats.assists}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.text}>{i18next.t("Rating")}</Text>
                      <Text style={Styles.text}>{i18next.t("Match")}</Text>
                      <Text style={Styles.text}>{i18next.t("Goal")}</Text>
                      <Text style={Styles.text}>{i18next.t("Assistant")}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {lineup.length - 1 !== index && <Separator color="#E5E5E5" />}
              </View>
            )}
            {forw && item?.stats.position_id === 4 && (
              <View>
                <TouchableOpacity
                  style={Styles.contanier}
                  onPress={() => {
                    navigation.navigate("playerScore", {
                      PlayerId: item?.player_id,
                    });
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={Styles.image}
                      source={{
                        uri: item.image_path,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={Styles.playerName}>
                        {item?.stats?.player?.data?.display_name}
                      </Text>
                      <View style={Styles.ageCont}>
                        <Text style={Styles.age}>{item.stats.player.data.birthdate}</Text>
                      </View>
                      <Text style={Styles.diez}>#{item.stats.number}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={Styles.score}>
                        {item?.stats.rating === null ? 0 : item?.stats.rating}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.appearences === null ? 0 : item?.stats.appearences}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.goals === null ? 0 : item?.stats.goals}
                      </Text>
                      <Text style={Styles.score}>
                        {item?.stats.assists === null ? 0 : item?.stats.assists}
                      </Text>
                    </View>
                    <View>
                      <Text style={Styles.text}>{i18next.t("Rating")}</Text>
                      <Text style={Styles.text}>{i18next.t("Match")}</Text>
                      <Text style={Styles.text}>{i18next.t("Goal")}</Text>
                      <Text style={Styles.text}>{i18next.t("Assistant")}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {lineup.length - 1 !== index && <Separator color="#E5E5E5" />}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  contanier: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 23,
    paddingVertical: 16,
  },
  image: {
    width: 57,
    height: 60,
    borderRadius: 4,
  },
  score: {
    fontSize: 12,
    color: "#3C3C3C",
    fontWeight: "bold",
    marginVertical: 3,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    color: "#9D9D9D",
    marginVertical: 3,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  ageCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  age: {
    marginVertical: 5,
    color: "#9A9A9A",
    fontSize: 12,
  },
  diez: {
    fontSize: 12,
    color: "#3C3C3C",
  },
});
