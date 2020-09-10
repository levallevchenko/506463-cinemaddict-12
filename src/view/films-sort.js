import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createFilmsSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return createFilmsSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);

    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    sortButtons.forEach((button) => button.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

