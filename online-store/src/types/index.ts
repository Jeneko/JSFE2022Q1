import type { API as INoUiApi } from 'nouislider/dist/nouislider';

export type Sort = 'name-asc' | 'name-desc' | 'year-asc' | 'year-desc' | 'year-asc' | 'qty-asc' | 'qty-desc';
export type Manufacturer = 'Apple' | 'Samsung' | 'Xiaomi';
export type Color = 'красный' | 'белый' | 'черный';
export type Camera = 1 | 2 | 3;

export interface IApp {
  element: HTMLElement;
  start(): void;
  getStore(): Promise<ProductData[]>;
}

export interface IRangeSlider {
  api: INoUiApi;
}

export interface IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
}

export interface IProductList {
  element: HTMLElement;
  render(root: HTMLElement, store: ProductData[], filter?: IFilter): void;
}

export interface IProduct extends IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
}

export interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  qty: number;
  year: number;
  manufacturer: Manufacturer;
  color: Color;
  camera: Camera;
  popular: boolean;
}

export interface IFilter extends IComponent {
  slider: IRangeSlider[];
  state: FilterFields;
  loadFilterState(): void;
  saveFilterState(): void;
  applyFilterState(): void;
  resetFilterState(): void;
  resetFilterSliders(): void;
  clearSavedData(): void;
  updateFilterState(input: EventTarget): void;
  filter(productDataArr: ProductData[]): ProductData[];
}

export interface FilterFields {
  name: string;
  qty: [number, number];
  year: [number, number];
  manufacturer: Set<Manufacturer>;
  color: Set<Color>;
  camera: Set<Camera>;
  popularOnly: boolean;
  sort: Sort;
}
