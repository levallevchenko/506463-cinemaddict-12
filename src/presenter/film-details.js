import {escPressHandler} from "../utils/project.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
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
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentsComponent = new CommentsView(film);

    if (prevFilmDetailsComponent === null) {
      this._openFilmDetails();
      return;
    }

    if (this._filmDetailsContainer.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      this._openFilmDetails();
    }

    remove(prevFilmDetailsComponent);
  }

  _openFilmDetails() {
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    document.addEventListener(`keydown`, this._handleEscButtonPress);

    render(this._filmDetailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    render(this._filmDetailsComponent, this._commentsComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    this.destroy();
  }

  _handleEscButtonPress(evt) {
    escPressHandler(evt, this._closeFilmDetails);
  }

  _handleCloseButtonClick() {
    this._closeFilmDetails();
  }
}
