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
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _filmCardClickHandler(evt) {
    if (evt.target.classList.contains(`film-card__poster`)
      || evt.target.classList.contains(`film-card__title`)
      || evt.target.classList.contains(`film-card__comments`)) {
      evt.preventDefault();
      this._callback.filmCardClick();
    }
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this.getElement()
        .addEventListener(`click`, this._filmCardClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
        .querySelector(`.film-card__controls-item--add-to-watchlist`)
        .addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
        .querySelector(`.film-card__controls-item--mark-as-watched`)
        .addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
