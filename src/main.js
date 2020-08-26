import {render, RenderPosition, escPressHandler} from "./util.js";
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

  const detailsScreenEscPressHandler = (evt) => escPressHandler(evt, closeFilmDetails);

  if (filmDetailsComponent.getElement()) {
    document.addEventListener(`keydown`, detailsScreenEscPressHandler);
  } else {
    document.removeEventListener(`keydown`, detailsScreenEscPressHandler);
  }

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    closeFilmDetails();
    document.removeEventListener(`keydown`, detailsScreenEscPressHandler);
  });
};

const renderFilm = (filmsContainer, film) => {
  const filmCardComponent = new FilmCardView(film);

  // Открывает попап
  filmCardComponent.setFilmPosterClickHandler(() => {
    renderFilmDetails(film);
  });

  filmCardComponent.setFilmTitleClickHandler(() => {
    renderFilmDetails(film);
  });

  filmCardComponent.setFilmCommentsClickHandler(() => {
    renderFilmDetails(film);
  });

  render(filmsContainer, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsBlock = (filmsBlockContainer, blockFilms) => {
  render(filmsBlockContainer, filmsBlockComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(blockFilms.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsContainerElement, blockFilms[i]);
  }

  if (blockFilms.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.setShowMoreClickHandler(() => {
      blockFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsContainerElement, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= blockFilms.length) {
        showMoreButtonComponent.getElement().remove();
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

renderFilmsBlock(siteMainElement, films);

const filmCountElement = document.querySelector(`.footer__statistics`);
render(filmCountElement, new FilmCountView().getElement(), RenderPosition.BEFOREEND);
