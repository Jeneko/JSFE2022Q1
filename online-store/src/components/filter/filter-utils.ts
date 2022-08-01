import { FilterFields, Camera, Manufacturer, Color, Sort } from 'types';

export class FilterState {
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

  loadFilterState(): void {
    const state = localStorage.getItem('filterState');
    if (state) {
      this.state = JSON.parse(state, (key, value) =>
        (['manufacturer', 'color', 'camera'].includes(key)) ? new Set(value) : value
      );
    }
  }

  saveFilterState(): void {
    const json = JSON.stringify(this.state, (_key, value) =>
      value = (value instanceof Set) ? [...value] : value);
    localStorage.setItem('filterState', json);
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

  applyFilterState(form: HTMLElement): void {
    // Manufacturers
    form.querySelectorAll('[name="manufacturer[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const manufacturer of this.state.manufacturer) {
      (form.querySelector(`[value="${manufacturer}"]`) as HTMLInputElement).checked = true;
    }

    // Cameras
    form.querySelectorAll('[name="camera[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const camera of this.state.camera) {
      (form.querySelector(`[value="${camera}"]`) as HTMLInputElement).checked = true;
    }

    // Colors
    form.querySelectorAll('[name="color[]"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    for (const color of this.state.color) {
      (form.querySelector(`[value="${color}"]`) as HTMLInputElement).checked = true;
    }

    // Name
    (form.querySelector(`[name="name"]`) as HTMLInputElement).value = this.state.name;

    // Popular
    (form.querySelector(`[name="popular-only"]`) as HTMLInputElement).checked = this.state.popularOnly;

    // Qty
    (form.querySelector(`[name="qty-min"]`) as HTMLInputElement).value = String(this.state.qty[0]);
    (form.querySelector(`[name="qty-max"]`) as HTMLInputElement).value = String(this.state.qty[1]);

    // Year
    (form.querySelector(`[name="year-min"]`) as HTMLInputElement).value = String(this.state.year[0]);
    (form.querySelector(`[name="year-max"]`) as HTMLInputElement).value = String(this.state.year[1]);

    // Sort
    (form.querySelector(`[name="sort"]`) as HTMLInputElement).value = this.state.sort;
  }
}
