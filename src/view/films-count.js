import {getRandomInteger} from "../utils/common.js";
import AbstractView from "./abstract.js";


const FILMS_MIN_COUNT = 100500;
const FILMS_MAX_COUNT = 1000500;
const FILMS_COUNT = getRandomInteger(FILMS_MIN_COUNT, FILMS_MAX_COUNT);

const filmsCountFormat = FILMS_COUNT.toLocaleString(`ru-RU`);

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

