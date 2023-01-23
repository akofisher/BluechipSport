import { Provider, createStore } from "aniuta";
import { useState } from "react";

const userSubscribtionState = createStore({
  name: "subsState",
  Store: () => {
    const [mySubs, setMysubs] = useState(false);
    const SubsState = (val) => {
      setMysubs(val);
    };

    return { SubsState, mySubs };
  },
});

export default userSubscribtionState;
