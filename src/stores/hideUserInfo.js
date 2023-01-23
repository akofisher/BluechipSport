import { Provider, createStore } from "aniuta";
import { useState } from "react";

const hideUserInfo = createStore({
  name: "CounterStore",
  Store: () => {
    const [userInfoOnInput, setUserInfoOnInput] = useState(true);

    const HideUserInfo = (val) => {
      setUserInfoOnInput(val);
    };

    return { HideUserInfo, userInfoOnInput };
  },
});

export default hideUserInfo;
