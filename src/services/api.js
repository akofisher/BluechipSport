import axios from "axios";
import { RuntimeConsts, FormatTemplate } from "utils";

import ENDPOINTS from "./endpoints";
import i18next from "i18next";

/*
   Usage example:
   import { CancelSource, API } from 'services';

   const source = CancelSource();

   API.getNewsArticles({
      cancelToken: source.token,
      kwds: object key-value pair to replace value in uri, (ex: {id: articleId, author: authorId}) (optional),
      ...any axios config object
   })
   .then((response) => console.log(response.data))
   .catch ((error) => console.warn(error));

   canceling >>> source.cancel();

   in case you need to run multiple requests:
   >>> API.all([ API.getNews(), API.getTeams()])
      .then((responses) => console.log(responses))
      .catch ((error) => console.warn(error));
*/

export const CancelSource = axios.CancelToken.source;
export const IsCancel = axios.isCancel;

const makeRequest = async ({ uri, kwds, ...rest }) => {
  const headers = !RuntimeConsts.token
    ? {
        locale: i18next.language,
      }
    : {
        Authorization: `Bearer ${RuntimeConsts.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        locale: i18next.language,
      };
  return await axios({
    url: kwds ? FormatTemplate(uri, kwds) : uri,
    headers,
    ...rest,
  });
};

const API = new Proxy(ENDPOINTS, {
  get: (target, prop) => (args) => {
    if (prop === "all") return Promise.all([...args]);
    if (target.hasOwnProperty(prop)) {
      return makeRequest({ ...target[prop], ...args });
    } else {
      throw new Error(`Invalid key "${prop}"! Please make sure key exists in endpoints.js file`);
    }
  },
});

export default API;
