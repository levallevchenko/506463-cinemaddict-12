import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsPresenter from "./film-details.js";

export default class FilmCard {
  constructor(filmsContainer, filmDetailsContainer, changeData) {
    this._filmsContainer = filmsContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmCardComponent.setFilmCardClickHandler(() => this._renderFilmDetails(film));

    if (prevFilmCardComponent === null) {
      render(this._filmsContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(this._filmDetailsContainer);
    filmDetailsPresenter.init(film);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
