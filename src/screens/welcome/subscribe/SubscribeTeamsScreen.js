import { KeyboardShiftlessView, Text, SearchBox, Button, Spinner } from "components/common";
import { Header, Footer, Pager } from "components/welcome";
import { SubscriptionList, SubscriptionListItem } from "components/welcome/subscribe";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { IsCancel, CancelSource, API } from "services";
import { useSubscribe } from "stores";
import { cxs } from "styles";

const SubscribeTeamsScreen = ({ navigation }) => {
  const { checkSubscriptions, updateSubscriptions } = useSubscribe();
  const [state, setState] = useState({
    isLoading: true,
    leagues: [],
    teams: [],
  });
  const [search, setSearch] = useState("");
  let source = CancelSource();

  const onSearch = () => {
    source.cancel && source.cancel("cancelled");
    setState({
      isLoading: true,
      leagues: [],
      teams: [],
    });
    source = CancelSource();
    const params = search ? { search } : {};
    API.all([
      API.getTopLeagues({ cancelToken: source.token, params }),
      API.getTeamsShort({ cancelToken: source.token, params }),
    ])
      .then((responses) => {
        const [leaguesResponse, teamsResponse] = responses;
        setState({
          isLoading: false,
          leagues: leaguesResponse.data.data.slice(0, 6),
          teams: teamsResponse.data.data.slice(0, 24),
        });
      })
      .catch((error) => {
        IsCancel(error);
      });
  };

  useEffect(() => {
    checkSubscriptions();
    return source.cancel;
  }, []);

  useEffect(() => {
    onSearch();
    return source.cancel;
  }, [search]);

  return (
    <KeyboardShiftlessView>
      <Header>
        <Text style={cxs.welcomeTextLead}>{i18next.t("ChooseFavTeam")}</Text>
        <Text style={cxs.welcomeTextSecondary}>{i18next.t("YouWillReceiveNews")}</Text>
        <SearchBox
          dark
          placeholder={i18next.t("Search")}
          style={cxs.mt20}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          onClear={() => {
            setSearch("");
          }}
        />
      </Header>
      {state.isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={cxs.py20}
          ListHeaderComponent={() => (
            <SubscriptionList
              data={state.leagues}
              style={cxs.pb10}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SubscriptionListItem
                  id={item.id}
                  name={item.name}
                  itemType="leagues"
                  imageUrl={item.image_path}
                />
              )}
            />
          )}
          ListFooterComponent={() => (
            <SubscriptionList
              data={state.teams}
              keyExtractor={(item) => item.team_id}
              renderItem={({ item }) => (
                <SubscriptionListItem
                  id={item.id}
                  name={item.name}
                  imageUrl={item.logo_path}
                  itemType="teams"
                />
              )}
            />
          )}
        />
      )}
      <Footer style={{ paddingBottom: 40 }}>
        <Button
          big
          title={i18next.t("Next2")}
          onPress={() => {
            updateSubscriptions();
            navigation.navigate("Players");
          }}
        />
        <Pager active={1} />
      </Footer>
    </KeyboardShiftlessView>
  );
};

export default SubscribeTeamsScreen;
