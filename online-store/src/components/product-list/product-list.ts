import { IComponent } from 'types';

export class ProductList implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.className = 'products';
    this.element.innerHTML = `
      <h2>Список товаров</h2>
      <div class="product-list"></div>
    `;
  }

  render(root: HTMLElement): void {
    const container = this.element.querySelector('.product-list') as HTMLElement;
    container.innerHTML = '<Карточка товара 1> <Карточка товара 2> <Карточка товара 3>';

    root.replaceWith(this.element);
  }
}
