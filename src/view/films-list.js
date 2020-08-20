import {createElement} from "../util.js";

const createFilmsListTemplate = () => {
  return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          </section>`;
};

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsListTemplate();
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
