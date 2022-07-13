import { FilterFields, IFilter, ProductData, Camera, Manufacturer, Color, Sort } from 'types';
import { RangeSlider } from 'components/range-slider/range-slider';
import { filterByData } from './filter-by-data';
import { filterByRange } from './filter-by-range';
import { filterByName } from './filter-by-name';
import { filterSorting } from './filter-sorting';

export class Filter implements IFilter {
  element: HTMLElement;
  slider: RangeSlider[] = [];
  state: FilterFields = {
    name: '',
    qty: [1, 12],
    year: [2000, 2022],
    manufacturer: new Set(),
    color: new Set(),
    camera: new Set(),
    popularOnly: false,
    sort: 'name-asc',
  };

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

    this.loadFilterState();
    this.applyFilterState();

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
      this.applyFilterState();
      this.resetFilterSliders();
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
    root.append(this.element);
  }

  loadFilterState(): void {
    const state = localStorage.getItem('filterState');
    if (state) {
      this.state = JSON.parse(state, (key, value) =>
        (['manufacturer', 'color', 'camera'].includes(key)) ? new Set(value) : value
      );
    }
  }

  saveFilterState(): void {
    const json = JSON.stringify(this.state, (key, value) =>
      value = (value instanceof Set) ? [...value] : value);
    localStorage.setItem('filterState', json);
  }

  applyFilterState(): void {
    // Manufacturers
    this.element.querySelectorAll('[name="manufacturer[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const manufacturer of this.state.manufacturer) {
      (this.element.querySelector(`[value="${manufacturer}"]`) as HTMLInputElement).checked = true;
    }

    // Cameras
    this.element.querySelectorAll('[name="camera[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const camera of this.state.camera) {
      (this.element.querySelector(`[value="${camera}"]`) as HTMLInputElement).checked = true;
    }

    // Colors
    this.element.querySelectorAll('[name="color[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const color of this.state.color) {
      (this.element.querySelector(`[value="${color}"]`) as HTMLInputElement).checked = true;
    }

    // Name
    (this.element.querySelector(`[name="name"]`) as HTMLInputElement).value = this.state.name;

    // Popular
    (this.element.querySelector(`[name="popular-only"]`) as HTMLInputElement).checked = this.state.popularOnly;

    // Qty
    (this.element.querySelector(`[name="qty-min"]`) as HTMLInputElement).value = String(this.state.qty[0]);
    (this.element.querySelector(`[name="qty-max"]`) as HTMLInputElement).value = String(this.state.qty[1]);

    // Year
    (this.element.querySelector(`[name="year-min"]`) as HTMLInputElement).value = String(this.state.year[0]);
    (this.element.querySelector(`[name="year-max"]`) as HTMLInputElement).value = String(this.state.year[1]);

    // Sort
    (this.element.querySelector(`[name="sort"]`) as HTMLInputElement).value = this.state.sort;
  }

  resetFilterState(): void {
    Object.assign(this.state, {
      name: '',
      qty: [1, 12],
      year: [2000, 2022],
      manufacturer: new Set(),
      color: new Set(),
      camera: new Set(),
      popularOnly: false,
    });
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

  updateFilterState(input: EventTarget): void {
    const inputName = (input as HTMLInputElement).name;
    const inputValue = (input as HTMLInputElement).value;
    const inputChecked = (input as HTMLInputElement).checked;

    // Manufacturer
    if (inputName === 'manufacturer[]') {
      if (inputChecked) {
        this.state.manufacturer.add(inputValue as Manufacturer);
      } else {
        this.state.manufacturer.delete(inputValue as Manufacturer);
      }
    }

    // Camera
    if (inputName === 'camera[]') {
      if (inputChecked) {
        this.state.camera.add(Number(inputValue) as Camera);
      } else {
        this.state.camera.delete(Number(inputValue) as Camera);
      }
    }

    // Color
    if (inputName === 'color[]') {
      if (inputChecked) {
        this.state.color.add(inputValue as Color);
      } else {
        this.state.color.delete(inputValue as Color);
      }
    }

    // Popular
    if (inputName === 'popular-only') {
      if (inputChecked) {
        this.state.popularOnly = true;
      } else {
        this.state.popularOnly = false;
      }
    }

    // QTY
    if (inputName === 'qty-min') {
      this.state.qty[0] = Number(inputValue);
    }
    if (inputName === 'qty-max') {
      this.state.qty[1] = Number(inputValue);
    }

    // Year
    if (inputName === 'year-min') {
      this.state.year[0] = Number(inputValue);
    }
    if (inputName === 'year-max') {
      this.state.year[1] = Number(inputValue);
    }

    // Name
    if (inputName == 'name') {
      this.state.name = inputValue;
    }

    // Sort
    if (inputName == 'sort') {
      this.state.sort = inputValue as Sort;
    }
  }

  filter(productDataArr: ProductData[]): ProductData[] {
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
      if (!productData.name.toLowerCase().includes(this.state.name.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
}
