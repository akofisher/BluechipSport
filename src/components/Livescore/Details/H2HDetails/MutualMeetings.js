import { Separator, Text } from "components/common";
import LongButton from "components/common/LongButton";
import i18next from "i18next";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

export default function MutualMeetings({ mutual, bus }) {
  const [state, setstate] = useState([]);
  const [isarray, setisArray] = useState(false);

  const [threeItems, setThreeItem] = useState([]);
  const [otherItems, setOtherItems] = useState([]);

  const [isOpren, setIsOpren] = useState(false);

  useEffect(() => {
    if (isarray === false) {
      setstate(mutual);
      setisArray(true);
    }
  }, []);
  useEffect(() => {
    renderItems();
  }, [state]);

  const renderItems = () => {
    if (state.length > 0) {
      if (state.length > 5) {
        const three = [];
        for (let i = 0; i < 5; i++) {
          three.push(state[i]);
        }
        setThreeItem(three);
        const other = [];
        for (let g = 5; g < state.length; g++) {
          other.push(state[g]);
        }
        setOtherItems(other);
      } else {
        setThreeItem(mutual);
      }
    }
  };
  if (state.length > 0) {
    return (
      <View style={Styles.lastMatchsCont}>
        <View>
          {threeItems?.map((item, index) => {
            return (
              <View key={index}>
                <View style={Styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={Styles.startTimeCont}>
                      <Text style={Styles.starttime}>
                        {moment(item?.starting_at, "YYYY-MM-D HH:mm:ss").format("D.MM.YYYY")}
                      </Text>
                      <Text style={Styles.starttime}>
                        {moment(item?.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
                      </Text>
                    </View>
                    <View style={Styles.teamNameCont}>
                      <Text
                        style={[
                          Styles.teamName,
                          {
                            fontWeight:
                              item?.localteam_score > item?.visitorteam_score ? "bold" : "normal",
                          },
                        ]}
                      >
                        {item?.localteam_name}
                      </Text>
                      <Text
                        style={[
                          Styles.teamName,
                          {
                            fontWeight:
                              item?.visitorteam_score > item?.localteam_score ? "bold" : "normal",
                          },
                        ]}
                      >
                        {item?.visitorteam_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Styles.scoreCont}>
                      <Text style={Styles.score}>{item?.localteam_score}</Text>
                      <Text style={Styles.score}>{item?.visitorteam_score}</Text>
                    </View>

                    {!bus &&
                    item?.is_home_match === 1 &&
                    item?.localteam_score > item?.visitorteam_score ? (
                      <View style={Styles.winnCont}>
                        <Text style={Styles.winn}>{i18next.t("M")}</Text>
                      </View>
                    ) : (
                      item?.is_home_match === 1 &&
                      item?.localteam_score < item?.visitorteam_score && (
                        <View style={Styles.loseCont}>
                          <Text style={Styles.lose}>{i18next.t("W")}</Text>
                        </View>
                      )
                    )}

                    {!bus &&
                    item?.is_home_match === 0 &&
                    item?.visitorteam_score > item?.localteam_score ? (
                      <View style={Styles.winnCont}>
                        <Text style={Styles.winn}>{i18next.t("M")}</Text>
                      </View>
                    ) : (
                      item?.is_home_match === 0 &&
                      item?.visitorteam_score < item?.localteam_score && (
                        <View style={Styles.loseCont}>
                          <Text style={Styles.lose}>{i18next.t("W")}</Text>
                        </View>
                      )
                    )}

                    {!bus && item?.localteam_score === item?.visitorteam_score && (
                      <View style={Styles.drawCont}>
                        <Text style={Styles.draw}>{i18next.t("F")}</Text>
                      </View>
                    )}
                  </View>
                </View>
                {mutual.length - 1 !== index && <Separator />}
              </View>
            );
          })}
          {isOpren === true &&
            otherItems.map((item, index) => {
              return (
                <View key={index}>
                  <View style={Styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={Styles.startTimeCont}>
                        <Text style={Styles.starttime}>
                          {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("D.MM.YYYY")}
                        </Text>
                        <Text style={Styles.starttime}>
                          {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
                        </Text>
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
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={Styles.scoreCont}>
                        <Text style={Styles.score}>{item.localteam_score}</Text>
                        <Text style={Styles.score}>{item.visitorteam_score}</Text>
                      </View>

                      {!bus &&
                      item?.is_home_match === 1 &&
                      item?.localteam_score > item?.visitorteam_score ? (
                        <View style={Styles.winnCont}>
                          <Text style={Styles.winn}>{i18next.t("M")}</Text>
                        </View>
                      ) : (
                        item?.is_home_match === 1 &&
                        item?.localteam_score < item?.visitorteam_score && (
                          <View style={Styles.loseCont}>
                            <Text style={Styles.lose}>{i18next.t("W")}</Text>
                          </View>
                        )
                      )}

                      {!bus &&
                      item?.is_home_match === 0 &&
                      item?.visitorteam_score > item?.localteam_score ? (
                        <View style={Styles.winnCont}>
                          <Text style={Styles.winn}>{i18next.t("M")}</Text>
                        </View>
                      ) : (
                        item?.is_home_match === 0 &&
                        item?.visitorteam_score < item?.localteam_score && (
                          <View style={Styles.loseCont}>
                            <Text style={Styles.lose}>{i18next.t("W")}</Text>
                          </View>
                        )
                      )}

                      {!bus && item.localteam_score === item.visitorteam_score && (
                        <View style={Styles.drawCont}>
                          <Text style={Styles.draw}>{i18next.t("F")}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {mutual.length - 1 !== index && <Separator />}
                </View>
              );
            })}
        </View>
        {mutual.length <= 5 ? (
          <View />
        ) : (
          <LongButton
            onPress={() => setIsOpren(!isOpren)}
            tittle={`${!isOpren ? i18next.t("ShowMoreMatches") : i18next.t("Close")}`}
            textStyle={{}}
            style={{
              backgroundColor: "#F4F4F4",
              marginTop: 17,
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
        )}
      </View>
    );
  } else {
    return null;
  }
}
const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  starttime: {
    color: "#828282",
    fontSize: 11,
  },
  lastMatchsCont: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 25,
  },
  teamNameCont: {
    marginHorizontal: 15,
  },
  teamName: {
    fontSize: 13,
    color: "#282828",
    paddingVertical: 1,
  },
  scoreCont: {
    alignItems: "center",
    marginRight: 7,
  },
  score: {
    fontSize: 13,
    fontWeight: "600",
    paddingVertical: 1,
  },
  winnCont: {
    backgroundColor: "#47B652",
    borderRadius: 5,
    paddingVertical: 2.4,
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  winn: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  loseCont: {
    backgroundColor: "#E53C48",
    borderRadius: 5,
    paddingVertical: 2.4,
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  lose: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  drawCont: {
    backgroundColor: "#F5B946",
    borderRadius: 5,
    paddingVertical: 2.4,
    paddingHorizontal: 4.5,
    marginLeft: 10,
  },
  draw: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  startTimeCont: {
    width: 61,
  },
});
