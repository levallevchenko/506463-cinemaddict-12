import {createElement} from "../util.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsBlockTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
