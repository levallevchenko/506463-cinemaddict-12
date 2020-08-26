import {FILM_COUNT} from "./view/film-count.js";
import {render, RenderPosition, onEscPress} from "./util.js";
import UserRatingView from "./view/user-rating.js";
import FilterView from "./view/filter.js";
import SortView from "./view/films-sort.js";
import FilmsBlockView from "./view/films-block.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmDetailsView from "./view/film-details.js";
import CommentsView from "./view/comments.js";
import TopRatedFilmsView from "./view/top-rated-films.js";
import MostCommentedFilmsView from "./view/most-commented-films.js";
import FilmCountView from "./view/film-count.js";
import NoFilmsView from "./view/no-films.js";
import {generateFilm} from "./mock/film.js";
import {generateFilmsFilter} from "./mock/filter.js";

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilmsFilter(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const filmsBlockComponent = new FilmsBlockView();
const filmsListElement = filmsBlockComponent.getElement().querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

const renderFilmDetails = (film) => {
  const filmDetailsComponent = new FilmDetailsView(film);
  render(filmsBlockComponent.getElement(), filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmDetailsComponent.getElement(), new CommentsView(film).getElement(), RenderPosition.BEFOREEND);

  const closeFilmDetails = () => {
    filmsBlockComponent.getElement().removeChild(filmDetailsComponent.getElement());
    filmDetailsComponent.getElement().removeChild(new CommentsView(film).getElement());
  };

  const onDetailsScreenEscPress = (evt) => onEscPress(evt, closeFilmDetails);

  if (filmDetailsComponent.getElement()) {
    document.addEventListener(`keydown`, onDetailsScreenEscPress);
  } else {
    document.removeEventListener(`keydown`, onDetailsScreenEscPress);
  }

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closeFilmDetails();
    document.removeEventListener(`keydown`, onDetailsScreenEscPress);
  });
};

const renderFilm = (filmsContainer, film) => {
  const filmCardElement = new FilmCardView(film).getElement();

  // Открывает попап
  filmCardElement.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  filmCardElement.querySelector(`.film-card__title`).addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  filmCardElement.querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    renderFilmDetails(film);
  });

  render(filmsContainer, filmCardElement, RenderPosition.BEFOREEND);
};

const renderFilmsBlock = (filmsBlockContainer, blockFilms) => {
  render(filmsBlockContainer, filmsBlockComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(blockFilms.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsContainerElement, blockFilms[i]);
  }

  if (blockFilms.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    const showMoreButtonElement = new ShowMoreButtonView().getElement();
    render(filmsListElement, showMoreButtonElement, RenderPosition.BEFOREEND);

    showMoreButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      blockFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsContainerElement, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= blockFilms.length) {
        showMoreButtonElement.remove();
      }
    });
  }

  render(filmsBlockComponent.getElement(), new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
  render(filmsBlockComponent.getElement(), new MostCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);

  const filmsExtraListElement = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);

  filmsExtraListElement.forEach((filmsExtraBlockElement) => {
    const filmsExtraContainerElement = filmsExtraBlockElement.querySelector(`.films-list__container`);

    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      renderFilm(filmsExtraContainerElement, blockFilms[i]);
    }
  });
};

render(siteHeaderElement, new UserRatingView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

if (FILM_COUNT === 0) {
  render(siteMainElement, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
} else {
  renderFilmsBlock(siteMainElement, films);
}

const filmCountElement = document.querySelector(`.footer__statistics`);
render(filmCountElement, new FilmCountView().getElement(), RenderPosition.BEFOREEND);
