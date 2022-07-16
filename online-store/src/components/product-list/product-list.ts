import { IProductList, IFilter, ProductData } from 'types';
import { Product } from 'components/product/product';

export class ProductList implements IProductList {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.className = 'catalog__products';
    this.element.innerHTML = `
      <h2>Список товаров</h2>
      <div class="product-list"></div>
    `;
  }

  render(root: HTMLElement, store: ProductData[], filter?: IFilter): void {
    const container = this.element.querySelector('.product-list') as HTMLElement;
    container.innerHTML = '';

    let curProductData = [...store];

    if (filter) {
      curProductData = filter.filter(curProductData);
      curProductData = filter.sort(curProductData);
    }

    const allProducts = new DocumentFragment();

    curProductData.forEach((productData: ProductData) => {
      const curProduct = new Product(productData);
      allProducts.append(curProduct.element);
    });

    if (allProducts.children.length) {
      container.append(allProducts);
    } else {
      container.insertAdjacentHTML('beforeend', '<h3 class="product-list__no-product">Извините, совпадений не обнаружено</h3>');
    }

    root.replaceWith(this.element);
  }
}
