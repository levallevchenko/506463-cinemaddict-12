export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN
      : container.prepend(element);
      break;
    case RenderPosition.BEFOREEND
      : container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getElementFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const generateSentenceFromString = (string) => {
  const sentencesArray = string.split(`. `);
  const sentence = getElementFromArray(sentencesArray);

  return sentence;
};

export const getFormatTime = (seconds) => {
  const hours = `${Math.floor(seconds / 3600)}h`;
  const minutes = `${Math.floor(seconds / 60) % 60}m`;
  const formatTime = hours.slice(0, 1) === `0` ? `${minutes}` : `${hours} ${minutes}`;

  return formatTime;
};

export const generateTemplate = (array, template) => {
  return array.map((element) => template(element)).join(``);
};

export const generateRandomArray = (array, minCount, maxCount) => {
  const count = getRandomInteger(minCount, maxCount);
  const randomArray = new Array(count).fill().map(() => getElementFromArray(array));

  return randomArray;
};

export const generateRandomDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const checkActiveElement = (active, activeClass) => active
  ? activeClass
  : ``;

export const onEscPress = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    action();
    document.removeEventListener(`keydown`, onEscPress);
  }
};

