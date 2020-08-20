import {render, RenderPosition, onEscPress} from "./util.js";
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
const siteMainElement = document.querySelector(`.main`);

const renderFilm = (filmsContainerElement, filmsBlockElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const showFilmDetails = () => {
    filmsBlockElement.append(filmDetailsComponent.getElement());
  };

  const closeFilmDetails = () => {
    filmDetailsComponent.getElement().remove();
  };

  const onDetailsScreenEscPress = (evt) => onEscPress(evt, closeFilmDetails);

  // Открывает попап
  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    showFilmDetails();
    document.addEventListener(`keydown`, onDetailsScreenEscPress);
  });

  // Закрывает попап
  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closeFilmDetails();
    document.removeEventListener(`keydown`, onDetailsScreenEscPress);
  });

  render(filmsContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmsBlockComponent = new FilmsBlockView();
const filmsListComponent = new FilmsListView();
const filmsContainerComponent = new FilmsContainerView();

render(siteHeaderElement, new UserRatingView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, filmsBlockComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsBlockComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsListComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmsContainerComponent.getElement(), filmsBlockComponent.getElement(), films[i]);
}

render(filmsBlockComponent.getElement(), new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
render(filmsBlockComponent.getElement(), new MostCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonElement = new ShowMoreButtonView().getElement();
  render(filmsListComponent.getElement(), showMoreButtonElement, RenderPosition.BEFOREEND);

  showMoreButtonElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsContainerComponent.getElement(), filmsBlockComponent.getElement(), film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonElement.remove();
    }
  });
}

const filmsExtraListElement = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);

filmsExtraListElement.forEach((filmsExtraBlockElement) => {
  const filmsExtraContainerElement = filmsExtraBlockElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderFilm(filmsExtraContainerElement, filmsBlockComponent.getElement(), films[i]);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const filmCountElement = siteFooterElement.querySelector(`.footer__statistics`);

render(filmCountElement, new FilmCountView().getElement(), RenderPosition.BEFOREEND);
