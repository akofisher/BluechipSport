import apiCall from '.';

export function getMatchInfo(id: number) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/live-matches/info/${id}`,
  );
}

export function getMatchOverview(id: number) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/live-matches/overview/${id}`,
  );
}

export function getMatchPlayers(id: number) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/live-matches/players/${id}`,
  );
}

export function getPlayerStats(id: number) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/live-matches/player-stats/${id}`,
  );
}

export function getMatchStatistics(id: number) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/live-matches/statistics/${id}`,
  );
}
