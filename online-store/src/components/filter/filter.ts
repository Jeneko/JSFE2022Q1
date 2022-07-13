import { IComponent } from 'types';
import { filterByData } from './filter-by-data';
import { filterByRange } from './filter-by-range';
import { filterByName } from './filter-by-name';
import { filterSorting } from './filter-sorting';

export class Filter implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.className = 'filter';
    this.element.innerHTML = `
      <h2>Фильтрация и сортировка</h2>
      <form class="filter__form" name="product-filter-form">
        <section class="filter-by-data"></section>
        <section class="filter-by-range"></section>
        <section class="filter-by-name"></section>
        <section class="filter-sorting"></section>
        <p>
          <button type="reset" class="filter__reset">Сброс фильтров</button>
          <button type="button" class="filter__clear">Сброс настроек</button>
        </p>
      </form>
    `;

    // Fill Filter Sections with HTML
    (this.element.querySelector('.filter-by-data') as HTMLElement).innerHTML = filterByData;
    (this.element.querySelector('.filter-by-range') as HTMLElement).innerHTML = filterByRange;
    (this.element.querySelector('.filter-by-name') as HTMLElement).innerHTML = filterByName;
    (this.element.querySelector('.filter-sorting') as HTMLElement).innerHTML = filterSorting;
  }

  render(root: HTMLElement): void {
    root.append(this.element);
  }
}
