import { IComponent, ProductData } from 'types';
import { Filter } from 'components/filter/filter';
import { ProductList } from 'components/product-list/product-list';

export class Catalog implements IComponent {
  element: HTMLElement;

  constructor(store: ProductData[]) {
    this.element = document.createElement('main');
    this.element.className = 'catalog';
    this.element.innerHTML = `
      <h1>Мобильные телефоны Online Store</h1>
      <section class="filter"></section>
      <section class="products"></section>
    `;

    // Filter
    const filter = new Filter();
    filter.render(this.element.querySelector('.filter') as HTMLElement);

    // Product List
    const productList = new ProductList();
    productList.render(this.element.querySelector('.products') as HTMLElement, store, filter);
    this.element.addEventListener('filterUpdate', () => {
      productList.render(this.element.querySelector('.products') as HTMLElement, store, filter);
    });
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}
