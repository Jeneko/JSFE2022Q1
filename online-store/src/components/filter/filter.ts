import { IFilter, IProductData } from 'types';
import { RangeSlider } from 'components/range-slider/range-slider';
import { FilterState } from './filter-utils';
import { filterByData } from './filter-by-data';
import { filterByRange } from './filter-by-range';
import { filterByName } from './filter-by-name';
import { filterSorting } from './filter-sorting';

export class Filter extends FilterState implements IFilter {
  element: HTMLElement;
  slider: RangeSlider[] = [];

  constructor() {
    super();
    this.element = document.createElement('section');
    this.element.className = 'filter';
    this.element.innerHTML = `
      <h2>Фильтрация и&nbsp;сортировка</h2>
      <form class="filter__form" name="product-filter-form">
        <section class="filter-by-data"></section>
        <section class="filter-by-range"></section>
        <section class="filter-by-name"></section>
        <section class="filter-sorting"></section>
        <div class="filter__buttons">
          <button type="reset" class="btn-default filter__reset">Сброс фильтров</button>
          <button type="button" class="btn-primary filter__clear">Сброс настроек</button>
        </div>
      </form>
    `;

    // Fill Filter Sections with HTML
    (this.element.querySelector('.filter-by-data') as HTMLElement).innerHTML = filterByData;
    (this.element.querySelector('.filter-by-range') as HTMLElement).innerHTML = filterByRange;
    (this.element.querySelector('.filter-by-name') as HTMLElement).innerHTML = filterByName;
    (this.element.querySelector('.filter-sorting') as HTMLElement).innerHTML = filterSorting;

    this.loadFilterState();
    this.applyFilterState(this.element.querySelector('.filter__form') as HTMLElement);

    // Init QTY Slider
    const qtySlider = new RangeSlider(
      (this.element.querySelector('.filter__qty') as HTMLElement),
      (this.element.querySelector('input[name="qty-min"]') as HTMLInputElement),
      (this.element.querySelector('input[name="qty-max"]') as HTMLInputElement),
      this.state.qty,
      [1, 12],
      { min: 1, max: 12 }
    );

    // Init Year Slider
    const yearSlider = new RangeSlider(
      (this.element.querySelector('.filter__year') as HTMLElement),
      (this.element.querySelector('input[name="year-min"]') as HTMLInputElement),
      (this.element.querySelector('input[name="year-max"]') as HTMLInputElement),
      this.state.year,
      [2000, 2022],
      { min: 2000, max: 2022 }
    );

    this.slider.push(qtySlider, yearSlider);

    // On filter fields update
    const filterForm = this.element.querySelector('.filter__form') as HTMLFormElement;
    filterForm.addEventListener('input', (e) => {
      this.updateFilterState(e.target as EventTarget);
      this.saveFilterState();
      this.element.dispatchEvent(new Event('filterUpdate', { bubbles: true }));
    });

    // On filter reset
    filterForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.resetFilterState();
      this.resetFilterSliders();
      this.applyFilterState(this.element.querySelector('.filter__form') as HTMLElement);
      this.element.dispatchEvent(new Event('filterUpdate', { bubbles: true }));
    });

    // On filter clear
    (filterForm.querySelector('.filter__clear') as HTMLElement).addEventListener('click', () => {
      this.clearSavedData();
    });

    // On clear input name
    (filterForm.querySelector('.filter__clear-name') as HTMLElement).addEventListener('click', (e) => {
      e.preventDefault();
      (this.element.querySelector('input[name="name"]') as HTMLInputElement).value = '';
      this.updateFilterState(this.element.querySelector('input[name="name"]') as EventTarget);
      this.saveFilterState();
      this.element.dispatchEvent(new Event('filterUpdate', { bubbles: true }));
    });
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }

  resetFilterSliders(): void {
    this.slider.forEach(slider => {
      slider.api.reset();
    });
  }

  clearSavedData(): void {
    localStorage.clear();
    location.reload();
  }

  sort(productDataArr: IProductData[]): IProductData[] {
    return productDataArr.sort((a, b) => {
      switch (this.state.sort) {
        case 'name-asc':
          return a.name < b.name ? -1 : 1;
        case 'name-desc':
          return a.name > b.name ? -1 : 1;
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'qty-asc':
          return a.qty - b.qty;
        case 'qty-desc':
          return b.qty - a.qty;
        default:
          return -1;
      }
    });
  }

  filter(productDataArr: IProductData[]): IProductData[] {
    return productDataArr.filter(productData => {
      // Manufacturer
      if (this.state.manufacturer.size && !this.state.manufacturer.has(productData.manufacturer)) {
        return false;
      }
      // Camera
      if (this.state.camera.size && !this.state.camera.has(productData.camera)) {
        return false;
      }
      // Color
      if (this.state.color.size && !this.state.color.has(productData.color)) {
        return false;
      }
      // Popular Only
      if (this.state.popularOnly && !productData.popular) {
        return false;
      }
      // QTY
      if (this.state.qty[0] > productData.qty || productData.qty > this.state.qty[1]) {
        return false;
      }
      // Year
      if (this.state.year[0] > productData.year || productData.year > this.state.year[1]) {
        return false;
      }
      // Name
      if (!productData.name.toLowerCase().includes(this.state.name.toLowerCase().trim())) {
        return false;
      }
      return true;
    });
  }
}
