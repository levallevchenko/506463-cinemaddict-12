import {render, RenderPosition} from "./utils/render.js";
import {FILM_COUNT} from "./view/film-count.js";
import UserRatingView from "./view/user-rating.js";
import FilterView from "./view/filter.js";
import FilmCountView from "./view/film-count.js";
import {generateFilm} from "./mock/film.js";
import {generateFilmsFilter} from "./mock/filter.js";
import FilmListPresenter from "./presenter/film-list.js";

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilmsFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const filmListPresenter = new FilmListPresenter(siteMainElement);

render(siteHeaderElement, new UserRatingView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

filmListPresenter.init(films);

const filmCountElement = document.querySelector(`.footer__statistics`);
render(filmCountElement, new FilmCountView().getElement(), RenderPosition.BEFOREEND);
