import {render} from "./util.js";
import {createUserRatingTemplate} from "./view/user-rating.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilmsSortTemplate} from "./view/films-sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createTopRatedFilmsTemplate} from "./view/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-films.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {generateFilmCard} from "./mock/film-card.js";

const FILM_COUNT = 12;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilmCard);

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsBlockElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBlockElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
}

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(filmsBlockElement, createFilmDetailsTemplate(), `beforeend`);

const filmsDetailsElement = filmsBlockElement.querySelector(`.film-details`);
filmsDetailsElement.style.display = `none`;

render(filmsBlockElement, createTopRatedFilmsTemplate(), `beforeend`);
render(filmsBlockElement, createMostCommentedFilmsTemplate(), `beforeend`);

const filmsExtraListElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);

filmsExtraListElement.forEach((filmsExtraBlockElement) => {
  const filmsExtraContainerElement = filmsExtraBlockElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmsExtraContainerElement, createFilmCardTemplate(), `beforeend`);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const filmsStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(filmsStatisticsElement, createStatisticsTemplate(), `beforeend`);
