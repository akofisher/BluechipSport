import { KeyboardShiftlessView, Text, SearchBox, Button, Spinner } from "components/common";
import { Header, Footer, Pager } from "components/welcome";
import { SubscriptionList, SubscriptionListItem } from "components/welcome/subscribe";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { IsCancel, CancelSource, API } from "services";
import { useSubscribe } from "stores";
import { cxs } from "styles";

const SubscribePlayersScreen = ({ navigation }) => {
  const { updateSubscriptions } = useSubscribe();
  const [state, setState] = useState({
    isLoading: true,
    data: [],
  });
  const [search, setSearch] = useState("");
  let source = CancelSource();

  const onSearch = () => {
    source.cancel && source.cancel("cancelled");
    setState({
      isLoading: true,
      data: [],
    });
    source = CancelSource();
    const params = search ? { search } : {};
    API.getLivescorePlayersShort({ cancelToken: source.token, params })
      .then((response) => {
        setState({
          isLoading: false,
          data: response.data.data,
        });
      })
      .catch((error) => {
        IsCancel(error);
      });
  };

  useEffect(() => {
    onSearch();
    return source.cancel;
  }, [search]);

  return (
    <KeyboardShiftlessView>
      <Header>
        <Text style={cxs.welcomeTextLead}>{i18next.t("ChooseFavAthlete")}</Text>
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
        <SubscriptionList
          data={state.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionListItem
              id={item.id}
              name={item.fullname}
              imageUrl={item.image_path}
              itemType="players"
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
            navigation.navigate("Login");
          }}
        />
        <Pager active={2} />
      </Footer>
    </KeyboardShiftlessView>
  );
};

export default SubscribePlayersScreen;
