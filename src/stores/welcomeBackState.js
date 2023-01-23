import { Provider, createStore } from "aniuta";
import { useState } from "react";

const welcomeBackState = createStore({
  name: "welcomeBack",
  Store: () => {
    // const [count, setCount] = useState(0);
    const [welcome, setWelcome] = useState(true);
    const WelcomeBack = (val) => {
      setWelcome(val);
      console.warn("welc-->", val);
    };

    return { WelcomeBack, welcome };
  },
});

export default welcomeBackState;
