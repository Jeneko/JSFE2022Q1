import { filterByData } from './filter-by-data';
import { filterByRange } from './filter-by-range';
import { filterByName } from './filter-by-name';
import { filterSorting } from './filter-sorting';

const TITLE = 'Фильтрация и&nbsp;сортировка';
const RESET_FILTER = 'Сброс фильтров';
const RESET_SETTINGS = 'Сброс настроек';

export const filterHTML = `
  <h2>${TITLE}</h2>
  <form class="filter__form" name="product-filter-form">
    <section class="filter-by-data">${filterByData}</section>
    <section class="filter-by-range">${filterByRange}</section>
    <section class="filter-by-name">${filterByName}</section>
    <section class="filter-sorting">${filterSorting}</section>
    <div class="filter__buttons">
      <button type="reset" class="btn-default filter__reset">${RESET_FILTER}</button>
      <button type="button" class="btn-primary filter__clear">${RESET_SETTINGS}</button>
    </div>
  </form>
`;
