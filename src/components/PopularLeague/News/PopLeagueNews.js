import { useNavigation } from "@react-navigation/native";
import { Separator, Spinner } from "components/common";
import { VerticalListItem } from "components/news";
import i18next from "i18next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { processGetArticlesResponse } from "screens/news/utils";
import { IsCancel, CancelSource, API } from "services";
import { cxs } from "styles";

export default function PopLeagueNews({ id, rame }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainArticles, setMainArticles] = useState([]);

  const listRef = useRef(null);
  const scrollToIndex = useCallback(
    (index) => {
      // listRef?.current?.scrollToIndex({ index: 6, animated: true });
    },
    [listRef],
  );

  const source = CancelSource();
  const navigation = useNavigation();

  useEffect(() => {
    API.getLeaguesNews({
      cancelToken: source.token,
      kwds: { teamID: id },
      params: {
        page: 1,
        per_page: 7,
      },
    })
      .then((response) => {
        setMainArticles(processGetArticlesResponse(response.data.data));
        setisloading(false);
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
      API.getLeaguesNews({
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

  if (isloading) {
    return <Spinner style={[cxs.flex, cxs.py20, cxs.m20]} />;
  }

  return (
    <View style={([cxs.flex], { backgroundColor: "white" })}>
      <FlatList
        ref={listRef}
        style={{ backgroundColor: "#E3E3E3" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={fetchOnScroll}
        onEndReachedThreshold={0.5}
        data={mainArticles}
        extraData={mainArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <VerticalListItem
              {...item}
              index={index}
              popularLeague
              isFullSize
              scrollList={scrollToIndex}
              onPress={() => {
                if (rame) {
                  navigation.push("NewsDetails", {
                    title: item.title,
                    articleId: item.id,
                    rame: true,
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
          );
        }}
        ListEmptyComponent={
          <View style={{ backgroundColor: "#E5E5E5" }}>
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              {i18next.t("NoMatchesFound")}
            </Text>
          </View>
        }
        ListFooterComponent={() =>
          isLoadingMore ? <Spinner style={[cxs.flex, cxs.py20]} /> : null
        }
      />
    </View>
  );
}
