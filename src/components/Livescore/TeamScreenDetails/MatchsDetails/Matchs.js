import { Separator } from "components/common";
import LongButton from "components/common/LongButton";
import i18next from "i18next";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export default function Matchs({ data, navigation, screenName, onEndReached }) {
  const [threeItems, setThreeItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [isOpren, setIsOpren] = useState(false);

  useEffect(() => {
    renderItems();
  }, [data]);

  const renderItems = () => {
    if (data.length > 0) {
      if (data.length > 4) {
        const three = [];
        for (let i = 0; i < 4; i++) {
          three.push(data[i]);
          setThreeItems(three);
        }
        const other = [];
        for (let g = 4; g < data.length; g++) {
          other.push(data[g]);
          setOtherItems(other);
        }
      } else {
        setThreeItems(data);
      }
    }
  };

  return (
    <View style={Styles.Cont}>
      {threeItems.length > 0 &&
        threeItems.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (screenName === "teamScore") {
                  navigation.push("liveScoreDetails", { item });
                } else {
                  navigation.navigate("liveScoreDetails", { item });
                }
              }}
            >
              <View style={Styles.matchsCont}>
                <View style={Styles.common}>
                  <View style={Styles.startTimeCont}>
                    <Text style={Styles.starttime}>
                      {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("D.MM.YYYY")}
                    </Text>
                    <Text style={Styles.starttime}>
                      {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
                    </Text>
                  </View>
                  <View style={Styles.common}>
                    <View style={{ marginRight: 8 }}>
                      <FastImage
                        style={Styles.image}
                        source={{ uri: item.localteam_logo_path }}
                        resizeMode="contain"
                      />
                      <FastImage
                        style={[Styles.image, { marginTop: 4 }]}
                        source={{ uri: item.visitorteam_logo_path }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={Styles.teamNameCont}>
                      <Text
                        style={[
                          Styles.teamName,
                          {
                            fontWeight:
                              item.localteam_score > item.visitorteam_score ? "bold" : "normal",
                          },
                        ]}
                      >
                        {item.localteam_name}
                      </Text>
                      <Text
                        style={[
                          Styles.teamName,
                          { marginTop: 4 },
                          {
                            fontWeight:
                              item.visitorteam_score > item.localteam_score ? "bold" : "normal",
                          },
                        ]}
                      >
                        {item.visitorteam_name}
                      </Text>
                    </View>
                  </View>
                </View>
                {item.time_status === "FT" ? (
                  <View style={{ marginTop: 4 }}>
                    <Text style={[Styles.score, {}]}>{item.localteam_score}</Text>
                    <Text style={[Styles.score, { marginTop: 2 }]}>{item.visitorteam_score}</Text>
                  </View>
                ) : (
                  <Text style={{ marginRight: 8.5 }}>-</Text>
                )}
              </View>
              {data.length - 1 !== index && <Separator />}
            </TouchableOpacity>
          );
        })}
      {isOpren === true && (
        <FlatList
          data={otherItems}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("liveScoreDetails", { item })}
              >
                <View style={Styles.matchsCont}>
                  <View style={Styles.common}>
                    <View style={Styles.startTimeCont}>
                      <Text style={Styles.starttime}>
                        {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("D.MM.YYYY")}
                      </Text>
                      <Text style={Styles.starttime}>
                        {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
                      </Text>
                    </View>
                    <View style={Styles.common}>
                      <View style={{ marginRight: 8 }}>
                        <FastImage
                          style={Styles.image}
                          source={{ uri: item.localteam_logo_path }}
                          resizeMode="contain"
                        />
                        <FastImage
                          style={[Styles.image, { marginTop: 4 }]}
                          source={{ uri: item.visitorteam_logo_path }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={Styles.teamNameCont}>
                        <Text
                          style={[
                            Styles.teamName,
                            {
                              fontWeight:
                                item.localteam_score > item.visitorteam_score ? "bold" : "normal",
                            },
                          ]}
                        >
                          {item.localteam_name}
                        </Text>
                        <Text
                          style={[
                            Styles.teamName,
                            { marginTop: 4 },
                            {
                              fontWeight:
                                item.visitorteam_score > item.localteam_score ? "bold" : "normal",
                            },
                          ]}
                        >
                          {item.visitorteam_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {item.time_status === "FT" ? (
                    <View style={{ marginTop: 4 }}>
                      <Text style={Styles.score}>{item.localteam_score}</Text>
                      <Text style={[Styles.score, { marginTop: 2 }]}>{item.visitorteam_score}</Text>
                    </View>
                  ) : (
                    <Text style={{ marginRight: 8.5 }}>-</Text>
                  )}
                </View>
                {data.length - 1 !== index && <Separator />}
              </TouchableOpacity>
            );
          }}
        />
      )}
      {data.length <= 4 ? (
        <View />
      ) : (
        <LongButton
          onPress={() => {
            if (isOpren === false) {
              setIsOpren(true);
            } else if (isOpren === true) {
              setIsOpren(false);
            }
          }}
          tittle={`${!isOpren ? i18next.t("ViewAllMatches") : i18next.t("Close")}`}
          textStyle={{ color: "#949494" }}
          style={Styles.button}
        />
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  starttime: {
    color: "#828282",
    fontSize: 11,
  },
  Cont: {
    backgroundColor: "white",
    borderRadius: 25,
  },
  matchsCont: {
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamNameCont: {},
  teamName: {
    fontSize: 13,
    color: "#282828",
  },
  startTimeCont: {
    width: 65,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#F4F4F4",
    marginTop: 17,
    marginHorizontal: 27,
    marginBottom: 20,
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 18,
    height: 18,
  },
  score: {
    fontSize: 14,
    fontWeight: "500",
  },
});
