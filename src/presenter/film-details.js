import {escPressHandler} from "../utils/project.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import FilmDetailsView from "../view/film-details.js";
import CommentsView from "../view/comments.js";

export default class FilmDetails {
  constructor(filmDetailsContainer) {
    this._filmDetailsContainer = filmDetailsContainer;

    this._filmDetailsComponent = null;

    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);

    this._handleEscButtonPress = this._handleEscButtonPress.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentsComponent = new CommentsView(film);

    this._openFilmDetails();
  }

  _openFilmDetails() {
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    document.addEventListener(`keydown`, this._handleEscButtonPress);

    render(this._filmDetailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    render(this._filmDetailsComponent, this._commentsComponent, RenderPosition.BEFOREEND);
  }

  _closeFilmDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._handleEscButtonPress);
  }

  _handleEscButtonPress(evt) {
    escPressHandler(evt, this._closeFilmDetails);
  }

  _handleCloseButtonClick() {
    this._closeFilmDetails();
  }
}
