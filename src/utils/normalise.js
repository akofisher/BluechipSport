export const getFormattedPlayerRating = (player) => {
  if (!player) {
    return null;
  }
  const stats = player.stats;

  if (!stats) {
    return null;
  }
  return stats.rating && Number(stats.rating) ? Number(stats.rating).toFixed(2) : null;
};
