import { IProduct, ProductData } from 'types';

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
      <ul class="product__properties">
        <li class="product__property">Количество: <span class="product__qty">${data.qty}</span></li>
        <li class="product__property">Год выхода: <span class="product__year">${data.year}</span></li>
        <li class="product__property">Производитель: <span class="product__manufacturer">${data.manufacturer}</span></li>
        <li class="product__property">Цвет: <span class="product__color">${data.color}</span></li>
        <li class="product__property">Количество камер: <span class="product__camera">${data.camera}</span></li>
        <li class="product__property">Популярный: <span class="product__qty">${data.popular ? 'Да' : 'Нет'}</span></li>
      </ul>
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
