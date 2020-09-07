import {FILM_COUNT} from "../view/film-count.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByDate, sortByRating} from "../utils/project.js";
import {SortType} from "../const.js";
import SortView from "../view/films-sort.js";
import NoFilmsView from "../view/no-films.js";
import FilmListView from "../view/film-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import TopRatedFilmsView from "../view/top-rated-films.js";
import MostCommentedFilmsView from "../view/most-commented-films.js";
import FilmCardPresenter from "./film.js";

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};

    this._filmListComponent = new FilmListView();
    this._sortComponent = new SortView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._MostCommentedFilmsComponent = new MostCommentedFilmsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsList = this._filmListComponent.getElement().querySelector(`.films-list`);
    this._filmsContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();


    render(this._filmListContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    this._renderAllFilms();
  }

  _sortFilmCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilmCards(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._filmListContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._filmListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film, container, detailsContainer) {
    const filmCardPresenter = new FilmCardPresenter(container, detailsContainer);
    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._filmsContainer, this._filmListComponent, this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setShowMoreClickHandler(() => {
      this._handleShowMoreButtonClick();
    });
  }

  _renderFilms(container, detailsContainer, from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film, container, detailsContainer));
  }

  _renderExtraFilms() {
    render(this._filmListComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._MostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    this._filmsExtraContainers = this._filmListComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);
    this._renderFilms(this._filmsExtraContainers[0], this._filmListComponent, 0, FILM_EXTRA_COUNT);
    this._renderFilms(this._filmsExtraContainers[1], this._filmListComponent, 0, FILM_EXTRA_COUNT);
  }

  _clearFilmList() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderFilmList() {
    this._renderSort();

    if (FILM_COUNT === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilms(this._filmsContainer, this._filmListComponent, 0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderAllFilms() {
    this._renderFilmList();
    this._renderExtraFilms();
  }
}
