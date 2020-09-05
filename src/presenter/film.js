import {render, RenderPosition} from "../utils/render.js";
import FilmCardView from "../view/film-card.js";
import FilmListView from "../view/film-list.js";
import FilmDetailsPresenter from "./film-details.js";

export default class FilmCard {
  constructor(filmsContainer, filmDetailsContainer) {
    this._filmsContainer = filmsContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    this._filmDetailsPresenter = {};

    this._filmCardComponent = null;
  }

  init(film) {
    this._film = film;
    this._filmCardComponent = new FilmCardView(film);
    this._filmListComponent = new FilmListView();
    this._filmCardComponent.setFilmCardClickHandler(() => this._renderFilmDetails(film));
    render(this._filmsContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails(film) {
    const filmDetailsPresenter = new FilmDetailsPresenter(this._filmDetailsContainer);
    filmDetailsPresenter.init(film);
  }
}
