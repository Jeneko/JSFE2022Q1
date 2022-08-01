import { IProductList, IFilter, IProductData } from 'types';
import { Product } from 'components/product/product';
import { productListHTML, emptyProductListHTML } from './product-list-html';

export class ProductList implements IProductList {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.className = 'catalog__products';
    this.element.innerHTML = productListHTML;
  }

  render(root: HTMLElement, store: IProductData[], filter?: IFilter): void {
    const container = this.element.querySelector('.product-list') as HTMLElement;
    container.innerHTML = '';

    let curProductData = [...store];

    if (filter) {
      curProductData = filter.filter(curProductData);
      curProductData = filter.sort(curProductData);
    }

    const allProducts = new DocumentFragment();

    curProductData.forEach((productData: IProductData) => {
      const curProduct = new Product(productData);
      allProducts.append(curProduct.element);
    });

    if (allProducts.children.length) {
      container.append(allProducts);
    } else {
      container.insertAdjacentHTML('beforeend', emptyProductListHTML);
    }

    root.replaceWith(this.element);
  }
}
