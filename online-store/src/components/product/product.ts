import { IProduct, ProductData } from 'types';

export class Product implements IProduct {
  element: HTMLElement;

  constructor(data: ProductData) {
    this.element = document.createElement('article');
    this.element.className = 'product';

    this.element.dataset.id = String(data.id);
    this.element.innerHTML = `
      <h3 class="product__name">${data.name}</h3>
      <img class="product__image" src="${data.imageUrl}" alt="${data.name}">
      <ul class="product__properties">
        <li class="product__property">Количество: <span class="product__qty">${data.qty}</span></li>
        <li class="product__property">Год выхода: <span class="product__year">${data.year}</span></li>
        <li class="product__property">Производитель: <span class="product__manufacturer">${data.manufacturer}</span></li>
        <li class="product__property">Цвет: <span class="product__color">${data.color}</span></li>
        <li class="product__property">Количество камер: <span class="product__camera">${data.camera}</span></li>
        <li class="product__property">Популярный: <span class="product__qty">${data.popular ? 'Да' : 'Нет'}</span></li>
      </ul>
    `;
  }

  render(root: HTMLElement): void {
    root.append(this.element);
  }
}
