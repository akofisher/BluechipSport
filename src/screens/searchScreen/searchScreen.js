import Xbutton from "assets/icons/xxButton.png";
import { SearchBox, Spinner, Text } from "components/common";
import { Header } from "components/header";
import { LeaguesItem, NewsItems, PlayersItem, TagsItem } from "components/searchComponent/index";
import i18next from "i18next";
import React, { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { CancelSource, API } from "services";
import { cxs } from "styles";

const SearchScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    isLoading: true,
    articles: "",
    leagues: "",
    players: "",
    tags: "",
  });
  const [q, setSearch] = useState("");
  let source = CancelSource();

  const onSearch = () => {
    source.cancel && source.cancel("cancelled");
    setState({
      isLoading: true,
      articles: "",
      leagues: "",
      players: "",
      tags: "",
    });
    source = CancelSource();
    const params = q ? { q, per_page: 3 } : {};

    API.getSearch({ params })
      .then(({ data }) => {
        setState({
          isLoading: false,
          articles: data.articles,
          leagues: data.leagues,
          players: data.players,
          tags: data.teams,
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    onSearch();
    return source.cancel;
  }, [q]);

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: "ArrowRight",
    }),
    [navigation.goBack],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header leftAction={headerLeftAction}>
        <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 15 }}>
          <SearchBox
            dark
            placeholder={i18next.t("Search")}
            style={cxs.mt20}
            value={q}
            onChangeText={(text) => {
              setSearch(text);
            }}
            onClear={() => {
              setSearch("");
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setSearch("");
          }}
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
            padding: 10,
          }}
        >
          <Image style={{ width: "100%", height: "100%" }} source={Xbutton} />
        </TouchableOpacity>
      </Header>
      {state.isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <ScrollView style={{ backgroundColor: "#E5E5E5" }} keyboardShouldPersistTaps="handled">
          <>
            {state.articles?.data?.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    marginVertical: 15,
                    marginLeft: 25,
                    color: "#888888",
                  }}
                >
                  {i18next.t("News")}
                </Text>
                <FlatList
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  keyboardShouldPersistTaps="handled"
                  bounces
                  data={state.articles.data}
                  extraData={state.articles.data}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <NewsItems
                      item={item}
                      navigation={navigation}
                      bus={state.articles.data}
                      index={index}
                      screenName={route.name}
                    />
                  )}
                />
              </>
            )}
            {state.leagues?.length !== 0 && (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    marginVertical: 15,
                    marginLeft: 25,
                    color: "#888888",
                  }}
                >
                  {i18next.t("Leagues")}
                </Text>
                <FlatList
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  keyboardShouldPersistTaps="handled"
                  bounces
                  data={state.leagues}
                  extraData={state.leagues}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <LeaguesItem
                      item={item}
                      navigation={navigation}
                      bus={state.leagues}
                      index={index}
                      screenName={route.name}
                    />
                  )}
                />
              </>
            )}

            {state.players?.length !== 0 && (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    marginVertical: 15,
                    marginLeft: 25,
                    color: "#888888",
                  }}
                >
                  {i18next.t("Sportsman")}
                </Text>
                <FlatList
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  bounces
                  keyboardShouldPersistTaps="handled"
                  data={state.players}
                  extraData={state.players}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <PlayersItem
                      item={item}
                      navigation={navigation}
                      bus={state.players}
                      index={index}
                    />
                  )}
                />
              </>
            )}

            {state?.tags?.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    marginVertical: 15,
                    marginLeft: 25,
                    color: "#888888",
                  }}
                >
                  {i18next.t("Teams")}
                </Text>
                <FlatList
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  keyboardShouldPersistTaps="handled"
                  bounces
                  data={state.tags}
                  extraData={state.tags}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <TagsItem item={item} navigation={navigation} index={index} bus={state.tags} />
                  )}
                />
              </>
            )}
          </>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
