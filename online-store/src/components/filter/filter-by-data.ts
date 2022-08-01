import { Camera, Color, Manufacturer } from "types";

const TITLE = 'Фильтры по&nbsp;значению';
const LEGEND_MANUFACTURER = 'Производитель';
const LEGEND_COLOR = 'Цвет корпуса';
const LEGEND_CAMERA = 'Количество камер';
const POPULAR_ONLY = 'Только популярные';
const COLOR_WHITE = 'Белый';
const COLOR_YELLOW = 'Желтый';
const COLOR_RED = 'Красный';
const COLOR_BLACK = 'Черный';

export const filterByData = `
  <section>
    <h3 class="filter__section-heading">${TITLE}</h3>
    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>${LEGEND_MANUFACTURER}</legend>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="${Manufacturer.samsung}">
        <div class="checkbox-icon checkbox-icon--samsung"></div>
        ${Manufacturer.samsung}
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="${Manufacturer.apple}">
        <div class="checkbox-icon checkbox-icon--apple"></div>
        ${Manufacturer.apple}
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="${Manufacturer.xiaomi}">
        <div class="checkbox-icon checkbox-icon--xiaomi"></div>
        ${Manufacturer.xiaomi}
      </label>
    </fieldset>

    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>${LEGEND_COLOR}</legend>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="${Color.white}">
        <div class="checkbox-color checkbox-color--white"></div>
        ${COLOR_WHITE}
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="${Color.yellow}">
        <div class="checkbox-color checkbox-color--yellow"></div>
        ${COLOR_YELLOW}
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="${Color.red}">
        <div class="checkbox-color checkbox-color--red"></div>
        ${COLOR_RED}
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="${Color.black}">
        <div class="checkbox-color checkbox-color--black"></div>
        ${COLOR_BLACK}
      </label>
    </fieldset>

    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>${LEGEND_CAMERA}</legend>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="${Camera.three}">
        <div class="checkbox-icon checkbox-icon--camera3"></div>
        ${Camera.three}
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="${Camera.two}">
        <div class="checkbox-icon checkbox-icon--camera2"></div>
        ${Camera.two}
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="${Camera.one}">
        <div class="checkbox-icon checkbox-icon--camera1"></div>
        ${Camera.one}
      </label>
    </fieldset>

    <div class="filter__select">
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="popular-only" type="checkbox">
        <div class="checkbox-box"></div>
        ${POPULAR_ONLY}
      </label>
    </div>
  </section>
`;
