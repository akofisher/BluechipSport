import { useNavigation } from "@react-navigation/native";
import { Separator, Spinner } from "components/common";
import { VerticalListItem, Section } from "components/news";
import i18next from "i18next";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { processGetArticlesResponse } from "screens/news/utils";
import { API, CancelSource, IsCancel } from "services";
import { cxs } from "styles";

const keyExtractor = (item, index) => {
  return item?.id + index.toString();
};

const NewsDetialsFooter = React.memo(() => {
  const [state, setState] = useState({ isLoading: true, articles: [], currentPage: 1 });
  const navigation = useNavigation();
  const ref = useRef(null);

  const source = CancelSource();

  const fetchOnScroll = useCallback(() => {
    if (state.currentPage < 4) {
      setState((prev) => ({ ...prev, isLoading: true }));
      API.getMainArticles({
        cancelToken: source.token,
        params: { page: state.currentPage + 1 },
      })
        .then((response) => {
          setState((prev) => ({
            ...prev,
            currentPage: +response.data.current_page,
            articles: [...prev.articles, ...processGetArticlesResponse(response.data.data)],
          }));
        })
        .catch((error) => {
          IsCancel(error);
        })
        .finally(() => {
          setState((prev) => ({ ...prev, isLoading: false }));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.currentPage]);

  useEffect(() => {
    fetchOnScroll();

    return () => {
      source && source.cancel();
    };
  }, []);

  const renderItemSeparator = useCallback(() => <Separator />, []);

  const similarArticlesFooter = useCallback(
    () => (state.isLoading ? <Spinner style={[cxs.flex, cxs.py20]} /> : null),
    [state.isLoading],
  );

  return (
    <View style={st.container}>
      <Section title={i18next.t("SimilarNews")}>
        <FlatList
          ref={ref}
          onEndReached={fetchOnScroll}
          onEndReachedThreshold={0.5}
          data={state.articles}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderItemSeparator}
          renderItem={({ item }) => (
            <VerticalListItem
              {...item}
              onPress={() => {
                navigation.push("NewsDetails", {
                  title: item.title,
                  articleId: item.id,
                  mainVIdeoUrl: item?.mainVideoUrl,
                });
              }}
            />
          )}
          ListFooterComponent={similarArticlesFooter}
        />
      </Section>
    </View>
  );
});

export default NewsDetialsFooter;

const st = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
