import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsPresenter from "./film-details.js";

export default class FilmCard {
  constructor(filmsContainer, filmDetailsContainer) {
    this._filmsContainer = filmsContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    // this._filmDetailsPresenter = {};

    this._filmCardComponent = null;
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);
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

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(this._filmDetailsContainer);
    filmDetailsPresenter.init(film);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
