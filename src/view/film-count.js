import {getRandomInteger} from "../utils/common.js";
import AbstractView from "./abstract.js";


export const FILM_COUNT = 12;
const FILM_MIN_COUNT = 100500;
const FILM_MAX_COUNT = 1000500;

const ALL_FILM_COUNT = (FILM_COUNT === 0)
  ? 0
  : getRandomInteger(FILM_MIN_COUNT, FILM_MAX_COUNT);

const filmsCountFormat = ALL_FILM_COUNT.toLocaleString(`ru-RU`);

const createFilmCountTemplate = () => {
  return (
    `<p>${filmsCountFormat} movies inside</p>`
  );
};

export default class UserRating extends AbstractView {
  _getTemplate() {
    return createFilmCountTemplate();
  }
}

