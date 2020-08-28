import {render, RenderPosition} from "./utils/render.js";
import FilmsBlockView from "./view/films-block.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import TopRatedFilmsView from "./view/top-rated-films.js";
import MostCommentedFilmsView from "./view/most-commented-films.js";
import {generateFilm} from "./mock/film.js";

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBlock {
  constructor(filmsBlockContainer) {
    this._filmsBlockContainer = filmsBlockContainer;

    this._filmsBlockComponent = new FilmsBlockView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._MostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._filmsListElement = this._filmsBlockComponent.getElement().querySelector(`.films-list`);
    this._filmsContainerElement = this._filmsListElement.querySelector(`.films-list__container`);
  }

  init(films) {
    this._films = films.slice();

    render(this._filmsBlockContainer, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBlock();
  }

  _renderFilm(film) {

  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderShowMoreButton() {

  }

  _renderTopRatedFilms() {
    render(this._filmsBlockComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilms() {
    render(this._filmsBlockComponent, this._MostCommentedFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsBlock() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
