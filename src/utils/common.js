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

export const generateRandomArray = (array, minCount, maxCount) => {
  const count = getRandomInteger(minCount, maxCount);
  const randomArray = new Array(count).fill().map(() => getElementFromArray(array));

  return randomArray;
};

export const generateRandomDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// обновляет массив, заменяя обновлённый элемент
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
