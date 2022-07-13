import { IComponent } from 'types';

export class Catalog implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('main');
    this.element.className = 'catalog';
    this.element.innerHTML = `
      <h1>Мобильные телефоны Online Store</h1>
      <section class="filter"></section>
      <section class="products"></section>
    `;
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}
