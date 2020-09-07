import {MAX_DESCRIPTION_LENGTH} from "../const.js";
import {checkActiveElement} from "../utils/project.js";
import AbstractView from "./abstract.js";

const createFilmCardTemplate = (film) => {

  const {filmPoster, filmTitle, rating, filmCreateYear, filmDuration, genres, description, commentsCount, isWatchlist, isWatched, isFavorite} = film;

  const shortDescription = description.toString().length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)} …` : description;

  const genre = genres[0];

  const activeClass = `film-card__controls-item--active`;

  const isWatchlistActive = checkActiveElement(isWatchlist, activeClass);
  const isWatchedActive = checkActiveElement(isWatched, activeClass);
  const isFavoriteActive = checkActiveElement(isFavorite, activeClass);

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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistActive}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedActive}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteActive}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  _getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setFilmPosterClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._filmCardClickHandler);
  }

  setFilmTitleClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._filmCardClickHandler);
  }

  setFilmCommentsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._filmCardClickHandler);
  }
}
