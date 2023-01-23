import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { XSvg } from "assets/svgs/AllSvgs";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { CancelSource, API } from "services";
import { useSubscribe, useGlobalState, userSubscribtionState } from "stores";
import cxs from "styles/styles";
import { RuntimeConsts } from "utils";
import { Text } from "components/common";

export default function TeamLogoNameSubscribe({
  clubName,
  id,
  itemType,
  set,
  setState,
  leagueIcon,
  teamLogo,
  subTeam,
  isSubscribed,
}) {
  const { subscriptions, updateSubscriptions, updateItem } = useSubscribe();
  const [clubInfo, setClubInfo] = useState();
  const [clubIcon, setClubIcom] = useState();
  const [selected, setSelected] = useState();

  const source = CancelSource();

  const { Refresh, myRefresh } = useGlobalState();
  const { SubsState, mySubs } = userSubscribtionState();

  const subscribeTeam = (ID) => {
    API.subscribePostTeam({ cancelToken: source.token, kwds: { teamID: ID } })
      .then(({ data }) => {
        setSelected(data.subscribed);
        Refresh(!myRefresh);
        SubsState(!mySubs);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const updateSubscribtion = () => {
    if (RuntimeConsts.token != null) {
      subscribeTeam(id);
    } else {
      updateItem(itemType, id, clubIcon ? clubIcon : leagueIcon, !set);
      updateSubscriptions();
    }
  };

  const isTeamSubscribedHandler = (id, key, subscriptions) => {
    for (let i = 0; i < subscriptions[key]?.length; i++) {
      if (subscriptions[key][i]?.id === id) {
        setState(true);
        return;
      }
    }
    setState(false);
  };

  useEffect(() => {
    setSelected(isSubscribed);

    API.getClubNameLogo({ kwds: { itemType: itemType + "/info", id } })
      .then(({ data }) => {
        setClubInfo(data);

        setClubIcom(data.logo_path);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  useEffect(() => {
    RuntimeConsts.token == null && isTeamSubscribedHandler(id, itemType, subscriptions);
  }, [subscriptions, id, myRefresh]);

  return (
    <View style={Styles.container}>
      <View style={[cxs.row, cxs.alignCenter]}>
        <View style={Styles.imgTeamNameCont}>
          <FastImage
            style={Styles.image}
            source={{
              uri: teamLogo ? teamLogo : leagueIcon || clubIcon,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={Styles.name}>{clubName ? clubName : clubInfo?.name}</Text>
      </View>

      {RuntimeConsts.token ? (
        <TouchableOpacity
          style={[
            Styles.subscribeCont,
            { backgroundColor: !selected ? "#E53C48" : "#F5F5F5" },
            { paddingRight: !selected ? 20 : 5 },
            {
              paddingVertical: !selected ? 14 : 6,
            },
          ]}
          onPress={updateSubscribtion}
        >
          <Text style={[Styles.text, { color: selected ? "#585858" : "white" }]}>
            {!selected ? i18next.t("Subscribe") : i18next.t("Subscribed")}
          </Text>

          {selected && (
            <View style={Styles.svgCont}>
              <XSvg />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            Styles.subscribeCont,
            { backgroundColor: !set ? "#E53C48" : "#F5F5F5" },
            { paddingRight: !set ? 20 : 5 },
            {
              paddingVertical: !set ? 14 : 6,
            },
          ]}
          onPress={updateSubscribtion}
        >
          <Text style={[Styles.text, { color: set ? "#585858" : "white" }]}>
            {!set ? i18next.t("Subscribe") : i18next.t("Subscribed")}
          </Text>

          {set && (
            <View style={Styles.svgCont}>
              <XSvg />
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    paddingLeft: 10,
    fontSize: 13,
    marginVertical: 10,
    fontWeight: "700",
  },
  subscribeCont: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingLeft: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  imgTeamNameCont: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#585858",
    fontSize: 12,
    fontWeight: "bold",
  },
  svgCont: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 13,
  },
});
