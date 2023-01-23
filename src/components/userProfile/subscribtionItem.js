import XButton from "assets/icons/xButton.png";
import i18next from "i18next";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { CancelSource, API } from "services";
import { useGlobalState, hideUserInfo } from "stores";
import { Text } from "components/common";

const Item = ({ item, onPress, onPress2, isFav }) => {
  const [subs, setSubs] = useState(isFav);

  const { Refresh, myRefresh } = useGlobalState();
  // const [refresh, setRefresh] = useState(true);
  const source = CancelSource();

  const { HideUserInfo, userInfoOnInput } = hideUserInfo();
  const unSubscribeTeam = (ID, type) => {
    type === "team" &&
      API.subscribePostTeam({ cancelToken: source.token, kwds: { teamID: ID } })
        .then(({ data }) => {
          Refresh(!myRefresh);
          // setRefresh(!refresh);
          setSubs(true);
        })
        .catch((error) => {
          console.warn(error);
        });
    type === "player" &&
      API.subscribePlayer({ cancelToken: source.token, kwds: { PlayerId: ID } })
        .then(({ data }) => {
          Refresh(!myRefresh);
          // setRefresh(!refresh);
          setSubs(true);
        })
        .catch((error) => {
          console.warn(error);
        });
  };

  return (
    <View style={Styles.box}>
      <View style={Styles.logoContainer}>
        <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: item?.image }} />
      </View>
      <Text style={Styles.text}>{item.name}</Text>
      {!subs ? (
        <TouchableOpacity
          style={[Styles.subsButton, { backgroundColor: "#E53C48" }]}
          onPress={() => {
            unSubscribeTeam(item.id, item.type);
          }}
        >
          <Text style={[Styles.btnText, { color: "#ffffff" }]}>{i18next.t("Subscribe")}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={Styles.subsButton} onPress={onPress2}>
          <Text style={Styles.btnText}>{i18next.t("Subscribed")}</Text>
          <View style={Styles.xBtn}>
            <Image source={XButton} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Item;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
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
