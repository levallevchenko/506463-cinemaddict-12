import {escPressHandler} from "../utils/project.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsBlockView from "../view/films-block.js";
import FilmDetailsView from "../view/film-details.js";
import CommentsView from "../view/comments.js";

export default class FilmDetails {
  constructor(filmDetailsContainer) {
    this._filmDetailsContainer = filmDetailsContainer;

    this._filmDetailsComponent = null;

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmsBlockComponent = new FilmsBlockView();
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentsViewComponent = new CommentsView(film);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    render(this._filmDetailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    render(this._filmDetailsComponent, this._commentsViewComponent, RenderPosition.BEFOREEND);
  }

  _closeFilmDetails() {
    this._filmDetailsContainer.removeChild(this._filmDetailsComponent);
    this._filmDetailsComponent.removeChild(this._commentsViewComponent);
  }

  _detailsScreenEscPressHandler(evt) {
    escPressHandler(evt, this._closeFilmDetails);
  }

  _openingListenerHandler() {
    if (this._filmDetailsComponent) {
      document.addEventListener(`keydown`, this._detailsScreenEscPressHandler);
    } else {
      document.removeEventListener(`keydown`, this._detailsScreenEscPressHandler);
    }
  }

  _handleCloseButtonClick() {
    this._closeFilmDetails();
    document.removeEventListener(`keydown`, this._detailsScreenEscPressHandler);
  }
}
