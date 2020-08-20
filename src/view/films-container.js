import {createElement} from "../util.js";

const createFilmsContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsContainerTemplate();
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
