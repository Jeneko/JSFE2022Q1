import { IProduct, ProductData } from 'types';
import "./in-cart.svg";

const MAX_FAV_QTY = 5;

export class Product implements IProduct {
  element: HTMLElement;

  constructor(data: ProductData) {
    const favouritesIds = this.getFavouritesIds();

    this.element = document.createElement('article');
    this.element.className = 'product';

    if (favouritesIds.includes(data.id)) {
      this.element.classList.add('product--favourites');
    }

    this.element.dataset.id = String(data.id);
    this.element.innerHTML = `
      <h3 class="product__name">${data.name}</h3>
      <img class="product__image" src="${data.imageUrl}" alt="${data.name}">
      <table class="product__properties">
        <tr class="product__property">
          <td class="product__property-key">Количество</td>
          <td class="product__property-value product__qty">${data.qty}</td>
        </tr>
        <tr class="product__property">
          <td class="product__property-key">Год выхода</td>
          <td class="product__property-value product__year">${data.year}</td>
        </tr>
        <tr class="product__property">
          <td class="product__property-key">Производитель</td>
          <td class="product__property-value product__manufacturer">${data.manufacturer}</td>
        </tr>
        <tr class="product__property">
          <td class="product__property-key">Цвет</td>
          <td class="product__property-value product__color">${data.color}</td>
        </tr>
        <tr class="product__property">
          <td class="product__property-key">Камер (шт.)</td>
          <td class="product__property-value product__camera">${data.camera}</td>
        </tr>
        <tr class="product__property">
          <td class="product__property-key">Популярный</td>
          <td class="product__property-value product__qty">${data.popular ? 'Да' : 'Нет'}</td>
        </tr>
      </table>
    `;

    // Manage favourites
    this.element.addEventListener('click', () => {
      if (this.element.dataset.id) {
        this.toggleFavourites(Number(this.element.dataset.id));
        this.element.dispatchEvent(new Event('favouritesUpdate', { bubbles: true }));
      }
    });
  }

  render(root: HTMLElement): void {
    root.append(this.element);
  }

  getFavouritesIds(): number[] {
    const favourites = localStorage.getItem('favourites');
    const favouritesIds = favourites ? JSON.parse(favourites) : [];
    return favouritesIds;
  }

  canAddToFavourites(): boolean {
    const favouritesIds = this.getFavouritesIds();
    return favouritesIds.length < MAX_FAV_QTY;
  }

  toggleFavourites(id: number): void {
    let favouritesIds = this.getFavouritesIds();

    if (favouritesIds.includes(id)) {
      favouritesIds = favouritesIds.filter((el: number) => el !== id);
    } else {
      if (!this.canAddToFavourites()) {
        alert(`Извините, все слоты заполнены. Максимум ${MAX_FAV_QTY} товаров!`);
        return;
      }
      favouritesIds.push(id);
    }

    this.element.classList.toggle('product--favourites');
    localStorage.setItem('favourites', JSON.stringify(favouritesIds));
  }
}
