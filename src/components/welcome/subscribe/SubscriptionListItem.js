import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import { Text } from "components/common";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { TouchableOpacity as TouchableGesture } from "react-native-gesture-handler";
import { CancelSource, API } from "services";
import { useGlobalState, useSubscribe, userSubscribtionState } from "stores";
import { Colors } from "styles";
import { RuntimeConsts } from "utils";
import FastImage from "react-native-fast-image";

MaterialIcons.loadFont();

const SubscriptionListItem = ({ id, name, imageUrl, itemType, dark = false, userTeams }) => {
  const Touchable = Platform.select({
    ios: TouchableOpacity,
    android: TouchableGesture,
  });

  const { subscriptions, updateItem } = useSubscribe();
  const source = CancelSource();

  const selected = !!subscriptions[itemType].find((item) => item.id == id);
  const userSelected = userTeams?.find((item) => item.id == id);
  const { Refresh, myRefresh } = useGlobalState();
  const { SubsState, mySubs } = userSubscribtionState();

  const subscribe = (id, itemType) => {
    itemType === "players" &&
      API.subscribePlayer({ cancelToken: source.token, kwds: { PlayerId: id } })
        .then(() => {
          Refresh(!myRefresh);
          SubsState(!mySubs);
        })
        .catch((error) => {
          console.warn(error);
        });

    itemType === "teams" &&
      API.subscribePostTeam({ cancelToken: source.token, kwds: { teamID: id } })
        .then(() => {
          Refresh(!myRefresh);
          SubsState(!mySubs);
        })
        .catch((error) => {
          console.warn(error);
        });
  };

  const updateSubscription = () => {
    RuntimeConsts.token != null
      ? subscribe(id, itemType)
      : updateItem(itemType, id, imageUrl, !selected);
  };

  return (
    <View style={styles.wrapper}>
      {RuntimeConsts.token != null ? (
        <Touchable
          style={[
            styles.card,
            {
              borderColor: userSelected ? Colors.primary : "transparent",
              backgroundColor: dark ? "#F9F9F9" : "#fff",
            },
          ]}
          onPress={updateSubscription}
        >
          {userSelected && (
            <MaterialIcons name="stars" size={24} color={Colors.primary} style={styles.star} />
          )}
          <FastImage style={styles.image} source={{ uri: imageUrl }} />
        </Touchable>
      ) : (
        <Touchable
          style={[
            styles.card,
            {
              borderColor: selected ? Colors.primary : "transparent",
              backgroundColor: dark ? "#F9F9F9" : "#fff",
            },
          ]}
          onPress={updateSubscription}
        >
          {selected && (
            <MaterialIcons name="stars" size={24} color={Colors.primary} style={styles.star} />
          )}
          <FastImage style={styles.image} source={{ uri: imageUrl }} />
        </Touchable>
      )}
      <Text numberOfLines={1} style={styles.title}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 15,
  },
  star: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  image: {
    width: 45,
    height: 45,
  },
  title: {
    marginVertical: 5,
    fontSize: 11,
    textAlign: "center",
    color: Colors.textDefault,
  },
  selected: {
    borderColor: Colors.primary,
  },
});

export default SubscriptionListItem;
