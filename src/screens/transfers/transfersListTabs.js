import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { TabBar, TabView as TabsViewLib } from "react-native-tab-view";
import { TransferItem } from "screens/transfers/TransferItem";
import { API } from "services";
import { Colors } from "styles";
import { Text } from "components/common";

import { Dropdown } from "./Dropdown";

export const TransferListTabs = React.memo((props) => {
  const TABS = {
    MAIN: i18next.t("Footballers"),
    LATEST: i18next.t("Leagues"),
  };
  const SORT_OPTIONS = {
    ALL: i18next.t("Latest"),
    TOP: i18next.t("TOP"),
  };

  const [index, setIndex] = React.useState(0);
  const [componentRoutes] = React.useState(Object.values(TABS).map((key) => ({ key, title: key })));

  const [seasons, setSeasons] = React.useState([]);
  const [seasonTransfers, setSeasonTransfers] = React.useState([]);
  const [currentSeason, setCurrentSeason] = useState("");

  const [leagues, setLeagues] = React.useState([]);
  const [currentLeague, setCurrentLeague] = useState({});
  const [teams, setTeams] = React.useState({});
  const [currentTeam, setCurrentTeam] = React.useState({});

  const [leagueTransfers, setLeagueTransfers] = React.useState([]);

  const [activeSortOrder, setActiveSortOrder] = useState(SORT_OPTIONS.ALL);

  const filteredTransfers =
    activeSortOrder === SORT_OPTIONS.ALL
      ? seasonTransfers
      : seasonTransfers.filter((transfer) => transfer.top_transfer_order === 1);

  React.useEffect(() => {
    API.getTransferSeasons().then(({ data }) => {
      setSeasons(data.data);
      setCurrentSeason(data.data[0]);
    });

    API.getTransferLeagues().then((data) => {
      setLeagues(data.data);
      setCurrentLeague(data.data[0]);
    });
  }, []);

  useEffect(() => {
    if (currentSeason) {
      API.getSeasonTransfers({
        kwds: { id: currentSeason.id },
      }).then(({ data }) => {
        setSeasonTransfers(data.data);
      });
    }
  }, [currentSeason]);

  useEffect(() => {
    if (currentLeague) {
      API.getLeagueTeams({
        kwds: { id: currentLeague.league_id },
      }).then(({ data }) => {
        setTeams(data.data);
        setCurrentTeam(null);
      });
    }
  }, [currentLeague]);

  useEffect(() => {
    if (currentTeam && currentTeam) {
      API.getLeagueTeamTransfers({
        kwds: { league_id: currentLeague.league_id, team_id: currentTeam?.team_id },
      }).then(({ data }) => {
        setLeagueTransfers(data.data);
      });

      return;
    }

    if (currentLeague) {
      API.getLeagueTransfers({
        kwds: { league_id: currentLeague.league_id },
      }).then(({ data }) => {
        setLeagueTransfers(data.data);
      });
    }
  }, [currentLeague, currentTeam]);

  const renderTabBar = (tabProps) => (
    <TabBar
      {...tabProps}
      renderLabel={({ route, focused }) => {
        const textStyle = focused
          ? { color: "black", fontWeight: "500" }
          : { color: Colors.textDefault };
        return <Text style={textStyle}>{route.title}</Text>;
      }}
      indicatorStyle={{ backgroundColor: Colors.primary, height: 4 }}
      style={{
        borderTopWidth: 1,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: Colors.gray,
      }}
    />
  );

  const renderScene = (route) => {
    switch (route.key) {
      case TABS.MAIN:
        return (
          <View style={styles.container}>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View
                    style={[styles.row, { justifyContent: "space-between", marginVertical: 20 }]}
                  >
                    <View style={[styles.switchButton, styles.row]}>
                      <TouchableOpacity
                        onPress={() => setActiveSortOrder(SORT_OPTIONS.ALL)}
                        style={[
                          styles.filterButton,
                          activeSortOrder === SORT_OPTIONS.ALL && styles.filterButtonActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            activeSortOrder === SORT_OPTIONS.ALL && styles.filterButtonTextActive,
                          ]}
                        >
                          {SORT_OPTIONS.ALL}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setActiveSortOrder(SORT_OPTIONS.TOP)}
                        style={[
                          styles.filterButton,
                          activeSortOrder === SORT_OPTIONS.TOP && styles.filterButtonActive,
                          styles.round,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            activeSortOrder === SORT_OPTIONS.TOP && styles.filterButtonTextActive,
                          ]}
                        >
                          {SORT_OPTIONS.TOP}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Dropdown
                        inputLabel={currentSeason?.name}
                        value={currentSeason?.id}
                        onValueChange={(value) => {
                          const season = seasons.find((item) => item.id === value);
                          setCurrentSeason(season);
                        }}
                        items={seasons.map((season) => ({ label: season.name, value: season.id }))}
                      />
                    </View>
                  </View>
                );
              }}
              data={filteredTransfers}
              renderItem={({ item }) => (
                <TransferItem
                  playerImage={item.player.image_path}
                  playerName={item.player.common_name}
                  playerNationality={item.player.nationality}
                  transferPrice={item.transfer_price}
                  fromId={item.from_team.id}
                  fromName={item.from_team.name}
                  fromLogo={item.from_team.logo_path}
                  toId={item.to_team.id}
                  toName={item.to_team.name}
                  toLogo={item.to_team.logo_path}
                />
              )}
            />
          </View>
        );
      case TABS.LATEST:
        return (
          <View style={styles.container}>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ marginVertical: 20 }}>
                    <View style={{ marginBottom: 12 }}>
                      <FastImage source={{ uri: currentLeague?.icon }} />
                      <Dropdown
                        inputLabel={currentLeague?.name}
                        inputIcon={currentLeague?.icon}
                        viewContainerStyle={{ alignItems: "flex-start" }}
                        value={currentLeague?.league_id}
                        onValueChange={(value) => {
                          const league = leagues.find((item) => item.league_id === value);
                          setCurrentLeague(league);
                        }}
                        items={leagues.map((league) => ({
                          label: league.name,
                          value: league.league_id,
                        }))}
                      />
                    </View>
                    <Dropdown
                      inputLabel={currentTeam?.name || "Select team"}
                      inputIcon={currentTeam?.logo_path}
                      viewContainerStyle={{ alignItems: "flex-start" }}
                      value={currentTeam?.team_id}
                      onValueChange={(value) => {
                        const team = teams.find((item) => item.team_id === value);
                        setCurrentTeam(team);
                      }}
                      items={teams.map((team) => ({ label: team.name, value: team.team_id }))}
                    />
                  </View>
                );
              }}
              data={leagueTransfers}
              renderItem={({ item }) => (
                <TransferItem
                  playerImage={item.player.image_path}
                  playerName={item.player.common_name}
                  playerNationality={item.player.nationality}
                  transferPrice={item.transfer_price}
                  fromId={item.from_team.id}
                  fromName={item.from_team.name}
                  fromLogo={item.from_team.logo_path}
                  toId={item.to_team.id}
                  toName={item.to_team.name}
                  toLogo={item.to_team.logo_path}
                />
              )}
            />
          </View>
        );
    }
  };

  return (
    <>
      <TabsViewLib
        style={{ flex: 0 }}
        swipeEnabled={false}
        navigationState={{ index, routes: componentRoutes }}
        renderTabBar={renderTabBar}
        renderScene={() => null}
        onIndexChange={setIndex}
      />
      {renderScene(componentRoutes[index])}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal: 24,
  },
  switchButton: {
    padding: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
  },
  filterButton: {
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  filterButtonActive: {
    backgroundColor: "#E53C48",
  },
  filterButtonTextActive: {
    color: "white",
  },
});
