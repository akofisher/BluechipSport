import { BottomGreenArrowSvg } from "assets/svgs/AllSvgs";
import { Separator, Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { API } from "services";

export default function Transfers({ id, navigation }) {
  const [transfers, setTransfers] = useState({ isloading: true });

  useEffect(() => {
    API.getTeamsTransfers({ kwds: { id } })
      .then(({ data }) => {
        setTransfers(data.data, { isloading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {transfers && transfers.length > 0 && (
        <View style={Styles.tittle}>
          <Text style={Styles.tittleText}>{i18next.t("Player")}</Text>
          <Text style={Styles.tittleText}>{i18next.t("TransferPrice")}</Text>
        </View>
      )}
      {transfers.isloading ? (
        <Spinner style={{}} />
      ) : (
        <View style={Styles.whiteContainer}>
          {transfers?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("playerScore", {
                    PlayerId: item?.player_id,
                  });
                }}
              >
                <View style={Styles.whiteComtChild}>
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={Styles.image}
                      source={{
                        uri: item.player_image,
                      }}
                      resizeMode="contain"
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.playerName}>
                        {item.player_name}
                      </Text>
                      <Text style={Styles.possition}>{item.player_position}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 8,
                          alignItems: "center",
                        }}
                      >
                        <FastImage
                          style={Styles.teamIcon}
                          source={{
                            uri: item.to_team_image,
                          }}
                          resizeMode="contain"
                        />
                        <Text style={Styles.teamName}>{item.to_team_name}</Text>
                        <BottomGreenArrowSvg style={{ marginLeft: 10 }} />
                      </View>
                    </View>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Text style={Styles.price}>{item.amount}</Text>
                    <Text style={[Styles.dateText, { paddingTop: 8 }]}>{item.date}</Text>
                  </View>
                </View>
                {transfers.length - 1 !== index && <Separator />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  tittle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  tittleText: {
    fontSize: 13,
    color: "#888888",
  },
  whiteContainer: {
    backgroundColor: "white",
    borderRadius: 25,
  },
  whiteComtChild: {
    flexDirection: "row",
    paddingLeft: 12,
    justifyContent: "space-between",
    paddingVertical: 19,
    paddingRight: 20,
    alignItems: "center",
  },
  playerName: {
    fontSize: 14,
    color: "#3C3C3C",
    fontWeight: "600",
    width: 180,
  },
  possition: {
    fontSize: 12,
    color: "#4E4E4E",
    paddingTop: 2,
  },
  teamName: {
    fontSize: 12,
    color: "#727272",
    paddingLeft: 5,
  },
  price: {
    fontSize: 18,
    color: "#E53C48",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#727272",
  },
  image: {
    width: 57,
    height: 60,
    borderRadius: 4,
  },

  teamIcon: {
    width: 16,
    height: 19,
  },
});
