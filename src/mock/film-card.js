import {getRandomInteger, getElementFromArray, generateSentenceFromString, getFormatTime} from "../util";
import {ratingMinValue, ratingMaxValue, filmCreateMinYear, filmCreateMaxYear, filmMinDuration, filmMaxDuration} from "../const.js";

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

export const generateFilmCard = () => {
  const filmTitle = getElementFromArray(filmTitles);
  const filmPoster = getElementFromArray(filmPosters);
  const description = generateSentenceFromString(descriptionString);
  const rating = getRandomInteger(ratingMinValue, ratingMaxValue);
  const filmCreateYear = getRandomInteger(filmCreateMinYear, filmCreateMaxYear);

  const filmDurationInSecond = getRandomInteger(filmMinDuration, filmMaxDuration);
  const filmDuration = getFormatTime(filmDurationInSecond);

  return {
    filmTitle,
    filmPoster,
    description,
    rating,
    filmCreateYear,
    filmDuration,
  };
};
