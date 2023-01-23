import { createStore } from "aniuta";
import { useState } from "react";

const useFavoriteMatch = createStore({
  name: "fav",
  Store: () => {
    const initialState = [];
    const [matchid, setMatchId] = useState([...initialState]);

    const addItem = (id) => {
      setMatchId([...matchid, id]);
    };

    const removeItem = (id) => {
      const tempMatchid = matchid.filter((item) => item.id !== id);
      setMatchId([...tempMatchid]);
    };

    return {
      matchid,
      addItem,
      removeItem,
    };
  },
});

export default useFavoriteMatch;
