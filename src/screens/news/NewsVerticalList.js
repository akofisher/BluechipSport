import { Separator, Spinner } from "components/common";
import { VerticalListItem } from "components/news";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { processGetArticlesResponse } from "screens/news/utils";
import { CancelSource, IsCancel } from "services";
import { cxs } from "styles";

const keyExtractor = (item) => item.id;

export const NewsVerticalList = React.memo((props) => {
  const {
    getAPI,
    listKey,
    openDetails,
    isFullSizeItem,
    isVideoItem,
    apiParams = {},
    refreshing = false,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [articles, setArticles] = useState([]);

  const listRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const source = CancelSource();

  useEffect(() => {
    setIsLoading(true);
    getAPI({ cancelToken: source.token, ...apiParams })
      .then((res) => {
        setArticles(processGetArticlesResponse(res?.data?.data));
      })
      .catch((error) => {
        IsCancel(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return source.cancel;
  }, []);

  useEffect(() => {
    if (refreshing) {
      setArticles([]);
      setCurrentPage(1);
      getAPI({ cancelToken: source.token, ...apiParams })
        .then((mainResponse) => {
          setArticles(processGetArticlesResponse(mainResponse.data.data));
        })
        .catch((error) => {
          IsCancel(error);
        });
    }
  }, [refreshing]);

  const fetchMoreOnScroll = () => {
    if (currentPage < 25 && !refreshing) {
      setIsLoadingMore(true);
      getAPI({
        cancelToken: source.token,
        params: { page: currentPage + 1 },
        ...apiParams,
      })
        .then((response) => {
          setCurrentPage(+response.data.current_page);
          setArticles([...articles, ...processGetArticlesResponse(response.data.data)]);
        })
        .catch((error) => {
          IsCancel(error);
        })
        .finally(() => {
          setIsLoadingMore(false);
        });
    }
  };

  // not working on nested flat list views.
  // listRef?.current?.scrollToIndex({ index, animated: false });

  const renderListFooterComponent = useCallback(
    () => (isLoadingMore || isLoading ? <Spinner style={[cxs.flex, cxs.py20]} /> : null),
    [isLoadingMore, isLoading],
  );

  const renderItem = useCallback(({ item, index }) => {
    return (
      <VerticalListItem
        {...item}
        index={index}
        listKey={listKey}
        isFullSize={isFullSizeItem}
        onPress={openDetails}
      />
    );
  }, []);

  return (
    <FlatList
      ref={listRef}
      listKey={listKey}
      style={styles.list}
      onEndReached={fetchMoreOnScroll}
      onEndReachedThreshold={Platform.select({
        ios: 0,
        android: 1,
      })}
      maxToRenderPerBatch={isFullSizeItem ? 5 : 10}
      initialNumToRender={isFullSizeItem ? 5 : 10}
      windowSize={isFullSizeItem ? 6 : 10}
      data={articles}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListFooterComponent={renderListFooterComponent}
      removeClippedSubviews
    />
  );
});

const styles = StyleSheet.create({
  list: { backgroundColor: "#E3E3E3", flex: 1 },
});
