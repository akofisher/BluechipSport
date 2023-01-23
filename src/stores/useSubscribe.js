import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "aniuta";
import { useState } from "react";

const useSubscribe = createStore({
  name: "Subscriptions",
  Store: () => {
    const initialState = { teams: [], leagues: [], players: [] };
    const [subscriptions, setSubscriptions] = useState({ ...initialState });

    const checkSubscriptions = async () => {
      const storedSubscriptions = await AsyncStorage.getItem("@subscriptions");
      storedSubscriptions && setSubscriptions({ ...JSON.parse(storedSubscriptions) });
    };

    const _addItem = (key, id, imageUrl) => {
      const tempSubscriptions = { ...subscriptions };
      tempSubscriptions[key].push({ id, imageUrl });
      setSubscriptions({ ...tempSubscriptions });
    };

    const _removeItem = (key, id) => {
      const tempSubscriptions = { ...subscriptions };
      tempSubscriptions[key] = tempSubscriptions[key].filter((item) => item.id !== id);
      setSubscriptions({ ...tempSubscriptions });
    };

    const updateItem = (key, id, imageUrl, isSelected) =>
      isSelected ? _addItem(key, id, imageUrl) : _removeItem(key, id);

    const updateSubscriptions = async () => {
      await AsyncStorage.setItem("@subscriptions", JSON.stringify(subscriptions));
    };

    const removeSubscriptions = async () => {
      await AsyncStorage.removeItem("@subscriptions");
      setSubscriptions({ ...initialState });
    };

    return {
      subscriptions,
      checkSubscriptions,
      updateSubscriptions,
      removeSubscriptions,
      updateItem,
    };
  },
});

export default useSubscribe;
