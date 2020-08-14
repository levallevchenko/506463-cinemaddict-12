const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getElementFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateSentenceFromString = (string) => {
  const sentencesArray = string.split(`. `);
  const sentence = getElementFromArray(sentencesArray);

  return sentence;
};

const getFormatTime = (seconds) => {
  const hours = `${Math.floor(seconds / 3600)}h`;
  const minutes = `${Math.floor(seconds / 60) % 60}m`;
  const formatTime = hours.slice(0, 1) === `0` ? `${minutes}` : `${hours} ${minutes}`;

  return formatTime;
};

const generateRandomArray = (array, minCount, maxCount) => {
  const count = getRandomInteger(minCount, maxCount);
  const randomArray = new Array(count).fill().map(() => getElementFromArray(array));

  return randomArray;
};

const generateTemplate = (array, template) => {
  return array.map((element) => template(element)).join(``);
};

// Генерирует случайную дату в диапозоне
const generateRandomDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const checkActiveElement = (active, activeClass) => active
  ? activeClass
  : ``;


export {render, getRandomInteger, getRandomNumber, getElementFromArray, generateSentenceFromString, getFormatTime, generateRandomArray, generateTemplate, generateRandomDate, checkActiveElement};
