export type Manufacturer = 'Apple' | 'Samsung' | 'Xiaomi';
export type Color = 'красный' | 'белый' | 'черный';
export type Camera = 1 | 2 | 3;

export interface IApp {
  element: HTMLElement;
  start(): void;
  getStore(): Promise<ProductData[]>;
}

export interface IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
}

export interface IProductList {
  element: HTMLElement;
  render(root: HTMLElement, store: ProductData[]): void;
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
