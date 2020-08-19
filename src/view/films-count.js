import {getRandomInteger} from "../util";

const FILMS_MIN_COUNT = 100500;
const FILMS_MAX_COUNT = 1000500;
const FILMS_COUNT = getRandomInteger(FILMS_MIN_COUNT, FILMS_MAX_COUNT);

const filmsCountFormat = FILMS_COUNT.toLocaleString(`ru-RU`);

export const createStatisticsTemplate = () => {
  return (
    `<p>${filmsCountFormat} movies inside</p>`
  );
};
