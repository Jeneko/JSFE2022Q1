import { IComponent, IProductData } from 'types';
import { Filter } from 'components/filter/filter';
import { ProductList } from 'components/product-list/product-list';
import { catalogHTML } from './catalog-html';

export class Catalog implements IComponent {
  element: HTMLElement;

  constructor(store: IProductData[]) {
    this.element = document.createElement('main');
    this.element.className = 'catalog';
    this.element.innerHTML = catalogHTML;

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
