import {createElement} from "../util.js";
import AbstractView from "./abstract.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsList extends AbstractView {
  _getTemplate() {
    return createFilmsBlockTemplate();
  }
}
