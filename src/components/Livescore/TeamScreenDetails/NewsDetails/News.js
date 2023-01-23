import { useNavigation } from "@react-navigation/native";
import { Separator, Spinner } from "components/common";
import { VerticalListItem } from "components/news";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { processGetArticlesResponse } from "screens/news/utils";
import { IsCancel, CancelSource, API } from "services";
import { cxs } from "styles";

export default function News({ id, screenName }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainArticles, setMainArticles] = useState([]);

  const source = CancelSource();
  const navigation = useNavigation();

  useEffect(() => {
    API.getTeamNews({
      cancelToken: source.token,
      kwds: { teamID: id },
      params: {
        page: 1,
        per_page: 7,
      },
    })
      .then((response) => {
        setMainArticles(processGetArticlesResponse(response.data.data));
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        IsCancel(error);
      });

    return source.cancel;
  }, [id]);

  const fetchOnScroll = () => {
    if (currentPage < 4) {
      setIsLoadingMore(true);
      API.getTeamNews({
        cancelToken: source.token,
        kwds: { teamID: id },
        params: {
          page: currentPage + 1,
          per_page: 7,
        },
      })
        .then((response) => {
          setCurrentPage(+response.data.current_page);
          setMainArticles([...mainArticles, ...processGetArticlesResponse(response.data.data)]);
          setIsLoadingMore(false);
        })
        .catch((error) => {
          IsCancel(error);
        });
    }
  };

  return (
    <View style={([cxs.flex], { backgroundColor: "white" })}>
      <FlatList
        contentContainerStyle={{ backgroundColor: "#E3E3E3" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={fetchOnScroll}
        onEndReachedThreshold={0.5}
        data={mainArticles}
        extraData={mainArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <VerticalListItem
                {...item}
                isTeamNews
                isFullSize
                onPress={() => {
                  if (item.linkedMatchScore) {
                    navigation.navigate("liveScoreDetails", {
                      item: {
                        match_id: item.matchId,
                        league_id: item.linkedMatchScore.league_id,
                        visitorteam_logo_path: item.linkedMatchScore.visitorteam.logo,
                        visitorteam_name: item.linkedMatchScore.visitorteam.name,
                        visitorteam_score: item.linkedMatchScore.visitorteam.score,
                        localteam_logo_path: item.linkedMatchScore.localteam.logo,
                        localteam_name: item.linkedMatchScore.localteam.name,
                        localteam_score: item.linkedMatchScore.localteam.score,
                        time_status: "FT",
                      },
                    });
                    return;
                  }
                  if (screenName === "teamScore") {
                    navigation.push("NewsDetails", {
                      title: item.title,
                      articleId: item.id,
                    });
                  } else {
                    navigation.navigate("NewsDetails", {
                      title: item.title,
                      articleId: item.id,
                      mainVideoUrl: item?.mainVideoUrl,
                    });
                  }
                }}
              />
            </View>
          );
        }}
        ListEmptyComponent={
          isLoading ? (
            <Spinner style={[cxs.flex, cxs.py20]} />
          ) : (
            <View style={{ backgroundColor: "#E5E5E5" }}>
              <Text style={{ textAlign: "center", marginTop: 40 }}>
                {i18next.t("NoNewsAvailable")}
              </Text>
            </View>
          )
        }
        ListFooterComponent={() =>
          isLoadingMore ? <Spinner style={[cxs.flex, cxs.py20]} /> : null
        }
      />
    </View>
  );
}
