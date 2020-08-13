import {getElementFromArray} from "../util";

export const createFilmCardTemplate = (film) => {

  const {filmPoster, filmTitle, rating, filmCreateYear, filmDuration, genres, description, commentsCount, isWatchlist, isWatched, isFavorite} = film;

  const shortDescription = description.toString().length > 140 ? `${description.slice(0, 139)} …` : description;

  const genre = getElementFromArray(genres);

  const checkActiveElement = (active) => active
    ? `film-card__controls-item--active`
    : ``;
  console.log(checkActiveElement(isWatchlist));
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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${checkActiveElement(isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${checkActiveElement(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${checkActiveElement(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};
