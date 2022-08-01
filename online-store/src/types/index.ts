import type { API as INoUiApi } from 'nouislider/dist/nouislider';

export type SortMapper = Record<Sort, (a: IProductData, b: IProductData) => number>;

export enum Manufacturer {
  apple = 'Apple',
  samsung = 'Samsung',
  xiaomi = 'Xiaomi',
}

export enum Color {
  red = 'красный',
  white = 'белый',
  black = 'черный',
  yellow = 'желтый',
}

export enum Camera {
  one = 1,
  two,
  three,
}

export enum Sort {
  nameAsc  = 'name-asc',
  nameDesc = 'name-desc',
  yearAsc  = 'year-asc',
  yearDesc = 'year-desc',
  qtyAsc   = 'qty-asc',
  qtyDesc  = 'qty-desc',
}

export interface IApp {
  element: HTMLElement;
  start(): void;
  getStore(): Promise<IProductData[]>;
}

export interface IRangeSlider {
  api: INoUiApi;
}

export interface IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
}

export interface IHeader extends IComponent {
  updateCartQty(): void;
}

export interface IProductList {
  element: HTMLElement;
  render(root: HTMLElement, store: IProductData[], filter?: IFilter): void;
}

export interface IProduct extends IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
  getFavouritesIds(): number[];
  canAddToFavourites(): boolean;
  toggleFavourites(id: number): void;
}

export interface IProductData {
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
  applyFilterState(form: HTMLElement): void;
  resetFilterState(): void;
  resetFilterSliders(): void;
  clearSavedData(): void;
  updateFilterState(input: EventTarget): void;
  sort(productDataArr: IProductData[]): IProductData[];
  filter(productDataArr: IProductData[]): IProductData[];
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
