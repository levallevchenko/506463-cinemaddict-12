import AbstractView from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const render = (container, child, place) => {

  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN
      : container.prepend(child);
      break;
    case RenderPosition.BEFOREEND
      : container.append(child);
      break;
  }
};

export const generateTemplate = (array, template) => {
  return array.map((element) => template(element)).join(``);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
