import {getRandomInteger, getRandomNumber, getElementFromArray, generateSentenceFromString, getFormatTime, generateRandomArray, generateRandomDate} from "../util";
import {ratingMinValue, ratingMaxValue, filmCreateMinYear, filmCreateMaxYear, filmMinDuration, filmMaxDuration, commentsMinCount, commentsMaxCount, EMOJIS} from "../const.js";

const NAMES_MIN_COUNT = 2;
const NAMES_MAX_COUNT = 4;

const GENRES_MIN_COUNT = 1;
const GENRES_MAX_COUNT = 4;

const COMMENT_MIN_COUNT = 1;
const COMMENT_MAX_COUNT = 5;

const DATE_OF_FIRST_COMMENT = `2010, 2, 1`;

const filmTitles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const filmPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const descriptionArray = descriptionString.split(`. `);

const filmGenres = [`Western`, `Musical`, `Drama`, `Comedy`, `Cartoon`, `Horror`, `Film-Noir`, `Mystery`];

// Дополнительные данные для попапа

const filmOriginTitles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const namesOfDirectors = [
  `Steven Spielberg`,
  `Martin Scorsese `,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Orson Welles`,
  `Francis Ford Coppola`,
  `Ridley Scott`,
];

const namesOfWriters = [
  `David O. Russell`,
  `James Cameron`,
  `Aaron Sorkin`,
  `John Ridley`,
  `Quentin Tarantino`,
  `Steven Spielberg`,
];

const namesOfActors = [
  `Robert De Niro`,
  `Jack Nicholson`,
  `Meryl Streep`,
  `Tom Hanks`,
  `Leonardo DiCaprio`,
  `Kate Winslet`,
  `Jodie Foster`,
  `Charles Chaplin`,
];

const names = [
  `John Smith`,
  `Lise Kane`,
  `Michel Mur`,
  `Genry Right`,
  `Mary Black`,
  `Tim Bert`,
];

const countries = [`Canada`, `China`, `UK`, `Russia`, `Australia`, `USA`];
const ageLimits = [`0+`, `6+`, `12+`, `14+`, `16+`, `18+`];

const randomDate = generateRandomDate(new Date(DATE_OF_FIRST_COMMENT), new Date());

const generateFilmComment = () => {
  const emoji = getElementFromArray(EMOJIS);
  const comment = generateSentenceFromString(descriptionString);
  const date = generateRandomDate(new Date(DATE_OF_FIRST_COMMENT), new Date());;
  const minuteFormat = date.getMinutes() < 10 ? `0` : `` + date.getMinutes();
  const commentDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${minuteFormat}`;
  const author = getElementFromArray(names);

  return {
    comment,
    emoji,
    commentDate,
    author,
  };
};

export const generateFilmCard = () => {
  const filmTitle = getElementFromArray(filmTitles);
  const filmPoster = getElementFromArray(filmPosters);
  const description = generateRandomArray(descriptionArray, 1, 5);
  const rating = getRandomNumber(ratingMinValue, ratingMaxValue).toFixed(1);
  const filmCreateYear = getRandomInteger(filmCreateMinYear, filmCreateMaxYear);

  const filmDurationInSecond = getRandomInteger(filmMinDuration, filmMaxDuration);
  const filmDuration = getFormatTime(filmDurationInSecond);
  const genres = generateRandomArray(filmGenres, GENRES_MIN_COUNT, GENRES_MAX_COUNT);
  const commentsCount = getRandomInteger(commentsMinCount, commentsMaxCount);

  const filmOriginTitle = getElementFromArray(filmOriginTitles);
  const director = getElementFromArray(namesOfDirectors);
  const writers = generateRandomArray(namesOfWriters, NAMES_MIN_COUNT, NAMES_MAX_COUNT).join(`, `);
  const actors = generateRandomArray(namesOfActors, NAMES_MIN_COUNT, NAMES_MAX_COUNT).join(`, `);
  const date = randomDate;
  const country = getElementFromArray(countries);
  const ageLimit = getElementFromArray(ageLimits);
  const comments = new Array(getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT)).fill().map(generateFilmComment);


  return {
    filmTitle,
    filmPoster,
    description,
    rating,
    filmCreateYear,
    filmDuration,
    genres,
    commentsCount,

    filmOriginTitle,
    director,
    writers,
    actors,
    date,
    country,
    ageLimit,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isEmoji: Boolean(getRandomInteger(0, 1)),
    comments,
  };
};
