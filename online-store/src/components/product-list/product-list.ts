import { IComponent } from 'types';
import { Product } from 'components/product/product';

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
    const allProducts = new DocumentFragment();

    for(let i = 0; i < 3; i++) {
      const curProduct = new Product();
      allProducts.append(curProduct.element);
    }

    container.append(allProducts);
    root.replaceWith(this.element);
  }
}
