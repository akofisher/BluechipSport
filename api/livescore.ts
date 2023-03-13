import apiCall from '.';

export function getCricket(time: string) {
  return apiCall.get(
    `https://cricket.bluechipsport.io/api/fixtures/date/${time}`,
  );
}

export function getFootball(time: string) {
  return apiCall.get(
    `https://api.bluechipsport.io/api/matches?byleague=1&league=0&date=${time}`,
  );
}

export function getMatchDetails(id: string) {
  return apiCall.get(
    `https://cricket.bluechipsport.io/api/fixtures/${id}/summary`,
  );
}
