import XButton from "assets/icons/xButton.png";
import { SearchBox } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { IsCancel, CancelSource, API } from "services";
import { useGlobalState, hideUserInfo, userSubscribtionState } from "stores";

import Item from "./subscribtionItem";

const UserSubscriptions = () => {
  const { Refresh, myRefresh } = useGlobalState();
  const { SubsState, mySubs } = userSubscribtionState();
  const { HideUserInfo, userInfoOnInput } = hideUserInfo();

  const [state, setState] = useState({
    isLoading: true,
    subsData: "",
    searchData: "",
  });
  const [search, setSearch] = useState("");
  let source = CancelSource();

  const onSearch = () => {
    source.cancel && source.cancel("cancelled");
    setState({
      isLoading: true,
      subsData: "",
      searchData: "",
    });
    source = CancelSource();

    API.all([
      API.subscriptionsSearch({
        cancelToken: source.token,
        kwds: { search: search ? search : {} },
      }),
      API.getMySubscriptions({ cancelToken: source.token }),
    ])
      .then((responses) => {
        const [subsSearchResponse, mySubsResponse] = responses;
        setState({
          isLoading: false,
          searchData: subsSearchResponse.data.slice(0, 10),
          subsData: mySubsResponse.data,
        });
      })
      .catch((error) => {
        IsCancel(error);
      });
    return source.cancel;
  };

  const subscribeTeam = (ID, type) => {
    type === "team" &&
      API.subscribePostTeam({ cancelToken: source.token, kwds: { teamID: ID } })
        .then(({ data }) => {
          Refresh(!myRefresh);
          setState({
            subsData: state?.subsData.filter((f) => f.id !== ID),
          });
        })
        .catch((error) => {
          console.warn(error);
        });
    type === "player" &&
      API.subscribePlayer({ cancelToken: source.token, kwds: { PlayerId: ID } })
        .then(({ data }) => {
          Refresh(!myRefresh);
          setState({
            subsData: state?.subsData.filter((f) => f.id !== ID),
          });
        })
        .catch((error) => {
          console.warn(error);
        });
  };

  useEffect(() => {
    onSearch();
    return source.cancel;
  }, [search, mySubs]);

  return (
    <View style={Styles.container}>
      <SearchBox
        placeholder={i18next.t("FindTagAndSubscribe")}
        style={Styles.searchInput}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
        }}
        onClear={() => {
          setSearch("");
        }}
        onFocus={() => {
          HideUserInfo(false);
        }}
        onBlur={() => {
          HideUserInfo(true);
        }}
      />
      <View style={Styles.tagsContainer}>
        {state?.searchData?.length ? (
          <FlatList
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            numColumns={2}
            style={{ height: "100%" }}
            data={state?.searchData}
            extraData={state?.searchData}
            keyExtractor={(item, index) => {
              item.id.toString();
            }}
            renderItem={(item) => (
              <Item
                isFav={item.item.is_subscribed}
                item={item.item}
                onPress2={() => {
                  subscribeTeam(item.item.id, item.item.type);
                }}
              />
            )}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            numColumns={2}
            style={{ height: "100%" }}
            data={state?.subsData}
            extraData={state?.subsData}
            keyExtractor={(item, index) => {
              item.id.toString();
            }}
            renderItem={(item) => (
              <Item
                item={item.item}
                isFav={item.item.is_subscribed}
                onPress2={() => {
                  subscribeTeam(item.item.id, item.item.type);
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default UserSubscriptions;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  searchInput: {
    height: 49,
    backgroundColor: "#ffffff",
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 20,
    alignItems: "center",
    paddingLeft: 17,
    marginBottom: 22,
  },
  tagsContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    height: 150,
    width: "47%",
    backgroundColor: "#ffffff",
    marginBottom: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  logoContainer: {
    marginTop: 23,
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  text: {
    fontSize: 13,
    color: "#000000",
    marginTop: 12,
    marginBottom: 6,
  },
  subsButton: {
    backgroundColor: "#F5F5F5",
    height: 40,
    width: "100%",
    borderRadius: 24,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  btnText: {
    color: "#585858",
    fontSize: 12,
    marginHorizontal: 10,
  },
  xBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
