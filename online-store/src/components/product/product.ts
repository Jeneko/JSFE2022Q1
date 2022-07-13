import { IComponent } from 'types';

export class Product implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('article');
    this.element.className = 'product';

    this.element.innerHTML = `
      <h3 class="product__name">IPhone 13</h3>
      <img class="product__image" src="images/products/apple-iphone-13.jpg" alt="IPhone 13">
      <ul class="product__properties">
        <li class="product__property">Количество: <span class="product__qty">10</span></li>
        <li class="product__property">Год выхода: <span class="product__year">2016</span></li>
        <li class="product__property">Производитель: <span class="product__manufacturer">Apple</span></li>
        <li class="product__property">Цвет: <span class="product__color">Красный</span></li>
        <li class="product__property">Количество камер: <span class="product__camera">3</span></li>
        <li class="product__property">Популярный: <span class="product__qty">Нет</span></li>
      </ul>
    `;
  }

  render(root: HTMLElement): void {
    root.append(this.element);
  }
}
