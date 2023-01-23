import { Provider, createStore } from "aniuta";
import { useState } from "react";

const newsCommentId = createStore({
  name: "CommentID",
  Store: () => {
    const [newsCommentID, setNewsCommentID] = useState("");

    const CommentID = (val) => {
      setNewsCommentID(val);
    };

    return { CommentID, newsCommentID };
  },
});

export default newsCommentId;
