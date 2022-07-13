import { IProductList, ProductData } from 'types';
import { Product } from 'components/product/product';

export class ProductList implements IProductList {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.className = 'products';
    this.element.innerHTML = `
      <h2>Список товаров</h2>
      <div class="product-list"></div>
    `;
  }

  render(root: HTMLElement, store: ProductData[]): void {
    const container = this.element.querySelector('.product-list') as HTMLElement;
    const allProducts = new DocumentFragment();

    store.forEach((productData: ProductData) => {
      const curProduct = new Product(productData);
      allProducts.append(curProduct.element);
    });

    container.append(allProducts);
    root.replaceWith(this.element);
  }
}
