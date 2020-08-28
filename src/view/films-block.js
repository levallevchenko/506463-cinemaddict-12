import {createElement} from "../util.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">

        </div>

      </section>
    </section>`
  );
};

export default class FilmsBlock {
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
