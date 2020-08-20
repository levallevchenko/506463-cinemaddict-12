import {render, RenderPosition} from "./util.js";
import UserRatingView from "./view/user-rating.js";
import FilterView from "./view/filter.js";
import SortView from "./view/films-sort.js";
import FilmsBlockView from "./view/films-block.js";
import FilmsListView from "./view/films-list.js";
import FilmsContainerView from "./view/films-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmDetailsView from "./view/film-details.js";
import TopRatedFilmsView from "./view/top-rated-films.js";
import MostCommentedFilmsView from "./view/most-commented-films.js";
import FilmCountView from "./view/films-count.js";
import {generateFilm} from "./mock/film.js";
import {generateFilmsFilter} from "./mock/filter.js";

const FILM_COUNT = 12;
const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilmsFilter(films);

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new UserRatingView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const FilmsBlockComponent = new FilmsBlockView();
const filmsListComponent = new FilmsListView();
const FilmsContainerComponent = new FilmsContainerView();

render(siteMainElement, FilmsBlockComponent.getElement(), RenderPosition.BEFOREEND);
render(FilmsBlockComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsListComponent.getElement(), FilmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(FilmsContainerComponent.getElement(), new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonElement = new ShowMoreButtonView().getElement();
  render(filmsListComponent.getElement(), showMoreButtonElement, RenderPosition.BEFOREEND);

  showMoreButtonElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(FilmsContainerComponent.getElement(), new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonElement.remove();
    }
  });
}

render(FilmsBlockComponent.getElement(), new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
render(FilmsBlockComponent.getElement(), new MostCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);

const filmsExtraListElement = FilmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);

filmsExtraListElement.forEach((filmsExtraBlockElement) => {
  const filmsExtraContainerElement = filmsExtraBlockElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmsExtraContainerElement, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const filmsStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(filmsStatisticsElement, new FilmCountView().getElement(), RenderPosition.BEFOREEND);

render(FilmsBlockComponent.getElement(), new FilmDetailsView(films[0]).getElement(), RenderPosition.BEFOREEND);

// Прячет попап
// const filmsDetailsElement = FilmsBlockComponent.getElement().querySelector(`.film-details`);
// filmsDetailsElement.classList.add(`hidden`);
