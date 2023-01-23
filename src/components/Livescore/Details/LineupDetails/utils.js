export const getPlayerScoreBackground = (score) => {
  const number = Number(score);

  if (number <= 5) {
    return "#FF000F";
  }

  if (number <= 6) {
    return "#FF6500";
  }

  if (number <= 6.5) {
    return "#FFB000";
  }

  if (number <= 7) {
    return "#B4C700";
  }

  if (number <= 8.5) {
    return "#00AF00";
  }

  if (number <= 10) {
    return "#00AF00";
  }

  return "white";
};
