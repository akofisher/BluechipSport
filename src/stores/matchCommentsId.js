import { Provider, createStore } from "aniuta";
import { useState } from "react";

const matchCommentsId = createStore({
  name: "MatchId",
  Store: () => {
    const [matchCommentID, setMatchCommentId] = useState("");

    const MatchID = (val) => {
      setMatchCommentId(val);
    };

    return { MatchID, matchCommentID };
  },
});

export default matchCommentsId;
