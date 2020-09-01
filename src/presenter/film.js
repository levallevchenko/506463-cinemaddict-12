import {render, RenderPosition} from "../utils/render.js";
import FilmView from "../view/film-card.js";
import FilmsBlockView from "../view/films-block.js";
import FilmDetailsPresenter from "./film-details.js";

export default class Film {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._filmDetailsPresenter = {};

    this._filmComponent = null;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmsBlockComponent = new FilmsBlockView();
    this._filmComponent = new FilmView(film);

    this._filmComponent.setFilmPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setFilmTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setFilmCommentsClickHandler(this._handleCommentsClick);

    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(this._filmsBlockComponent);
    filmDetailsPresenter.init(film);
  }

  _handlePosterClick(film) {
    this._renderFilmDetails(film);
  }

  _handleTitleClick(film) {
    this._renderFilmDetails(film);
  }

  _handleCommentsClick(film) {
    this._renderFilmDetails(film);
  }
}
