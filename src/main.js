import {render} from "./util.js";
import {createUserRatingTemplate} from "./view/user-rating.js";
import {createFilterItemTemplate} from "./view/filter.js";
import {createFilmsSortTemplate} from "./view/films-sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createTopRatedFilmsTemplate} from "./view/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-films.js";
import {createStatisticsTemplate} from "./view/films-count.js";
import {generateFilm} from "./mock/film.js";
import {generateFilmsFilter} from "./mock/filter.js";

const FILM_COUNT = 12;
const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilmsFilter(films);

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createFilterItemTemplate(filters), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsBlockElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBlockElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsBlockElement, createTopRatedFilmsTemplate(), `beforeend`);
render(filmsBlockElement, createMostCommentedFilmsTemplate(), `beforeend`);

const filmsExtraListElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);

filmsExtraListElement.forEach((filmsExtraBlockElement) => {
  const filmsExtraContainerElement = filmsExtraBlockElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmsExtraContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const filmsStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(filmsStatisticsElement, createStatisticsTemplate(), `beforeend`);

render(filmsBlockElement, createFilmDetailsTemplate(films[0]), `beforeend`);

// Прячет попап
const filmsDetailsElement = filmsBlockElement.querySelector(`.film-details`);
filmsDetailsElement.classList.add(`hidden`);
