import AbstractView from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
  }

  _getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _showMoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setShowMoreClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._showMoreClickHandler);
  }
}
