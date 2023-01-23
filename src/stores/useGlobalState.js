import { Provider, createStore } from "aniuta";
import { useState } from "react";

const useGlobalState = createStore({
  name: "globalState",
  Store: () => {
    // const [count, setCount] = useState(0);
    const [myRefresh, setMyRefresh] = useState(false);
    const Refresh = (val) => {
      setMyRefresh(val);
    };

    return { Refresh, myRefresh };
  },
});

export default useGlobalState;
