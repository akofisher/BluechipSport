import Standing from "components/Livescore/Details/standingsDetails/Standing";
import { Separator, Spinner, Text } from "components/common";
import LongButton from "components/common/LongButton";
import LiveMatch from "components/header/LIveMatch";
import { VerticalListItem } from "components/news";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { processGetArticlesResponse } from "screens/news/utils";
import { API } from "services";
import { useDevice } from "stores";
import Colors from "styles/colors";
import cxs from "styles/cxs";

const OverviewDetails = (props) => {
  const PLAYERS_RATING_MAP = {
    rating: {
      title: i18next.t("Rating"),
      field: "rating",
    },
    goalscorers: {
      title: i18next.t("Goals"),
      field: "goals",
    },
    assists: {
      title: i18next.t("Assists"),
      field: "assists",
    },
    cards: {
      title: i18next.t("Cards"),
      field: "cards",
    },
  };
  const { id, navigation, onSeeMoreNewsPress, onSeeFullStandingPress } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [articles, setArticles] = useState([]);
  const [standing, setStanding] = useState([]);
  const [players, setPlayers] = useState([]);

  const { deviceId } = useDevice();

  useEffect(() => {
    setIsLoading(true);
    API.getTeamOverview({ kwds: { id } })
      .then(({ data }) => {
        setMatches([{ data: [...data.matches] }]);
        setArticles(processGetArticlesResponse(data.articles));
        setStanding(data.standings);
        setPlayers(data.players);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const openNewsDetails = React.useCallback((id, title, mainVideoUrl) => {
    navigation.navigate("NewsDetails", {
      articleId: id,
      title,
      mainVideoUrl,
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View>
      <View>
        <FlatList
          listKey="matches"
          style={styles.boxContainer}
          contentContainerStyle={{ paddingRight: 32 }}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <LiveMatch item={item} deviceId={deviceId} navigation={navigation} />;
          }}
        />
      </View>
      {articles.length ? (
        <View style={[cxs.px18, cxs.mt10, styles.container]}>
          <FlatList
            listKey="articles"
            data={articles}
            extraData={articles.length.toString()}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => {
              return <VerticalListItem {...item} onPress={openNewsDetails} />;
            }}
          />
          <LongButton
            onPress={onSeeMoreNewsPress}
            tittle={i18next.t("ListMoreNews")}
            textStyle={styles.buttonTextStyle}
            style={[cxs.mx10, styles.button]}
          />
        </View>
      ) : null}

      {standing ? (
        <View>
          <Text style={[cxs.px30, cxs.py25, styles.weight700]}>{i18next.t("TournamentList")}</Text>
          <View style={[styles.container]}>
            <View style={[cxs.px12]}>
              <Standing standing={standing} navigation={navigation} />
            </View>
            <View style={[cxs.px28]}>
              <LongButton
                onPress={onSeeFullStandingPress}
                tittle={i18next.t("ShowFullTable")}
                textStyle={styles.buttonTextStyle}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      ) : null}
      <View>
        <Text style={[cxs.px30, cxs.py25, styles.weight700]}>{i18next.t("TopPlayers")}</Text>
        <View style={styles.container}>
          <FlatList
            listKey="top-players"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Object.entries(players)}
            renderItem={({ item }) => {
              const key = item[0];
              const title = PLAYERS_RATING_MAP[key].title;
              const players = item[1];
              const topPlayer = item[1][0];

              if (!topPlayer || !topPlayer[key]) {
                return null;
              }

              return (
                <View style={styles.scoreItemContainer}>
                  <View style={[cxs.h70, { backgroundColor: Colors.gray, borderRadius: 20 }]}>
                    <Text style={[cxs.px30, cxs.py20, { fontWeight: "700" }]}>{title}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() =>
                      navigation.navigate("playerScore", {
                        PlayerId: topPlayer?.player_id,
                      })
                    }
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: topPlayer?.image_path,
                      }}
                    />
                  </TouchableOpacity>

                  <View style={[cxs.h60, { backgroundColor: Colors.white }]} />
                  <FlatList
                    data={players}
                    renderItem={({ item: player, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("playerScore", {
                              PlayerId: player?.player_id,
                            })
                          }
                          style={[
                            cxs.row,
                            cxs.justifyBetween,
                            cxs.mx10,
                            cxs.mb7,
                            cxs.p10,
                            cxs.alignCenter,
                            { backgroundColor: Colors.gray, borderRadius: 10 },
                          ]}
                        >
                          <View style={[cxs.row, cxs.alignCenter]}>
                            <View style={[cxs.p5, cxs.mr10, { backgroundColor: Colors.primary }]}>
                              <Text style={[{ color: Colors.white, fontWeight: "700" }]}>
                                {"0" + (index + 1)}
                              </Text>
                            </View>
                            <Text style={styles.weight700}>{player.fullname}</Text>
                          </View>
                          <Text style={styles.weight700}>
                            {player[PLAYERS_RATING_MAP[key].field] &&
                              player[PLAYERS_RATING_MAP[key].field]}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OverviewDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingRight: 40,
    paddingVertical: 11,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#F4F4F4",
    marginTop: 17,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: Colors.buttonText,
  },
  scoreItemContainer: {
    flex: 1,
    width: 340,
    backgroundColor: Colors.white,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.gray,
    margin: 10,
    padding: 5,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 5,
    top: 25,
    alignSelf: "center",
  },
  image: {
    width: 75,
    height: 85,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: Colors.white,
  },
  weight700: {
    fontWeight: "700",
  },
});
