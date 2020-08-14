export const generateFilmsFilter = (films) => {
  return {
    watchlist: films.filter((film) => film.isWatchlist).length,
    history: films.filter((film) => film.isWatched).length,
    favorites: films.filter((film) => film.isFavorite).length,
  };
};
