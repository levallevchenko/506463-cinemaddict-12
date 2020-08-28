import {getRandomInteger, createElement} from "../util";

const FILMS_MIN_COUNT = 100500;
const FILMS_MAX_COUNT = 1000500;
const FILMS_COUNT = getRandomInteger(FILMS_MIN_COUNT, FILMS_MAX_COUNT);

const filmsCountFormat = FILMS_COUNT.toLocaleString(`ru-RU`);

const createFilmCountTemplate = () => {
  return (
    `<p>${filmsCountFormat} movies inside</p>`
  );
};

export default class UserRating {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmCountTemplate();
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

