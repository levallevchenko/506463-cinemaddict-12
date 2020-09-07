export const getFormatTime = (seconds) => {
  const hours = `${Math.floor(seconds / 3600)}h`;
  const minutes = `${Math.floor(seconds / 60) % 60}m`;
  const formatTime = hours.slice(0, 1) === `0` ? `${minutes}` : `${hours} ${minutes}`;

  return formatTime;
};

export const checkActiveElement = (active, activeClass) => active
  ? activeClass
  : ``;

export const escPressHandler = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    action();
  }
};

const getWeightForNoDataFilm = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNoDataFilm(filmA.date, filmB.date);

  if (weight !== null) {
    return weight;
  }

  return filmB.date.getTime() - filmA.date.getTime();
};

export const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNoDataFilm(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};

