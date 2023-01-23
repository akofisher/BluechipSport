import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Spinner, Button, SearchBox } from "components/common";
import { Footer } from "components/welcome";
import { SubscriptionListItem } from "components/welcome/subscribe";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { IsCancel, CancelSource, API } from "services";
import { useSubscribe } from "stores";
import { cxs } from "styles";

const SubscribeModal = ({ onSubmit, userTeams }) => {
  const { updateSubscriptions } = useSubscribe();
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    isLoading: true,
    teams: [],
  });
  let source = CancelSource();

  const onSearch = () => {
    source.cancel && source.cancel("cancelled");
    setState({
      isLoading: true,
      teams: [],
    });
    source = CancelSource();
    const params = search ? { search } : {};
    API.getSubscriptionsSearch({ cancelToken: source.token, params })
      .then((response) => {
        const data = [
          ...response.data.teams.map((team) => ({
            ...team,
            id: team.team_id,
            type: "teams",
          })),
          ...response.data.leagues.map((league) => ({
            ...league,
            id: league.league_id,
            logo_path: league.icon,
            type: "leagues",
          })),
          ...response.data.players.map((player) => ({
            ...player,
            id: player?.player_id,
            logo_path: player.image_path,
            type: "players",
            name: player.fullname,
          })),
        ];
        setState({
          isLoading: false,
          teams: data,
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
    <View style={cxs.flex}>
      <View style={cxs.px25}>
        <SearchBox
          placeholder={i18next.t("SearchDesiredTeam")}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          onClear={() => {
            setSearch("");
          }}
        />
      </View>
      {state.isLoading ? (
        <Spinner style={cxs.flex} />
      ) : (
        <View style={cxs.flex}>
          <BottomSheetFlatList
            data={state.teams}
            extraData={state.teams}
            numColumns={3}
            contentContainerStyle={cxs.py20}
            ItemSeparatorComponent={() => <View style={cxs.m5} />}
            keyExtractor={(item) => item.id + item.name}
            renderItem={({ item }) => (
              <SubscriptionListItem
                dark
                id={item?.id?.toString()}
                name={item.name}
                imageUrl={item.logo_path}
                itemType={item.type}
                userTeams={userTeams}
              />
            )}
          />
        </View>
      )}
      <Footer>
        <Button
          big
          title={i18next.t("AddHighlights")}
          style={cxs.mb20}
          onPress={() => {
            updateSubscriptions();
            onSubmit();
          }}
        />
      </Footer>
    </View>
  );
};

export default SubscribeModal;
