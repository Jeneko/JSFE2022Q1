import { IComponent, ProductData } from 'types';
import { Filter } from 'components/filter/filter';
import { ProductList } from 'components/product-list/product-list';

export class Catalog implements IComponent {
  element: HTMLElement;

  constructor(store: ProductData[]) {
    this.element = document.createElement('main');
    this.element.className = 'catalog';
    this.element.innerHTML = `
      <h1 class="catalog__header">Каталог: <b>мобильные телефоны</b></h1>
      <div class="catalog__content">
        <section class="catalog__filter"></section>
        <section class="catalog__products"></section>
      </div>
    `;

    // Filter
    const filter = new Filter();
    filter.render(this.element.querySelector('.catalog__filter') as HTMLElement);

    // Product List
    const productList = new ProductList();
    productList.render(this.element.querySelector('.catalog__products') as HTMLElement, store, filter);
    this.element.addEventListener('filterUpdate', () => {
      productList.render(this.element.querySelector('.catalog__products') as HTMLElement, store, filter);
    });
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}
