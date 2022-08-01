import { IProduct, IProductData } from 'types';
import { getFavouritesIds } from 'components/utils/local-storage';
import { getProductHTML } from './product-html';
import "./in-cart.svg";

const MAX_FAV_QTY = 20;

export class Product implements IProduct {
  element: HTMLElement;

  constructor(data: IProductData) {
    const favouritesIds = getFavouritesIds();

    this.element = document.createElement('article');
    this.element.className = 'product';

    if (favouritesIds.includes(data.id)) {
      this.element.classList.add('product--favourites');
    }

    this.element.dataset.id = String(data.id);
    this.element.innerHTML = getProductHTML(data);

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

  canAddToFavourites(): boolean {
    const favouritesIds = getFavouritesIds();
    return favouritesIds.length < MAX_FAV_QTY;
  }

  toggleFavourites(id: number): void {
    let favouritesIds = getFavouritesIds();

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
