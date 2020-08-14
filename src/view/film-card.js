import {MAX_DESCRIPTION_LENGTH} from "../const.js";
import {getElementFromArray, checkActiveElement} from "../util";

export const createFilmCardTemplate = (film) => {

  const {filmPoster, filmTitle, rating, filmCreateYear, filmDuration, genres, description, commentsCount, isWatchlist, isWatched, isFavorite} = film;

  const shortDescription = description.toString().length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)} …` : description;

  const genre = getElementFromArray(genres);

  const activeClass = `film-card__controls-item--active`;

  const isWatchlistClass = checkActiveElement(isWatchlist, activeClass);
  const isWatchedClass = checkActiveElement(isWatched, activeClass);
  const isFavoriteClass = checkActiveElement(isFavorite, activeClass);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmTitle}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmCreateYear}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${filmPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};
