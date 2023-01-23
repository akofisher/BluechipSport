//prod, dev
const forcedEnv = "";

let BASE_URL = "https://v2.api.goal.ge/";
let ENV = "DEV";

let { releaseChannel } = {};

if (forcedEnv && __DEV__) releaseChannel = forcedEnv;

if (releaseChannel) {
  if (releaseChannel.indexOf("prod") !== -1 || releaseChannel === "default") {
    BASE_URL = "https://api.goal.ge/";
    ENV = "PROD";
  }
}

export { BASE_URL, ENV };
