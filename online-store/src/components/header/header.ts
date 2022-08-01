import { IHeader } from 'types';
import { headerHTML } from './header-html';

export class Header implements IHeader {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('header');
    this.element.className = 'header';
    this.element.innerHTML = headerHTML;
    this.updateCartQty();
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }

  updateCartQty(): void {
    const favourites = localStorage.getItem('favourites');
    const favIdArr = favourites ? JSON.parse(favourites) : [];
    (this.element.querySelector('.header__cart-qty') as HTMLElement).textContent = String(favIdArr.length);
  }
}
