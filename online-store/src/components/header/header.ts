import { IHeader } from 'types';
import { getFavouritesIds } from 'components/utils/local-storage';
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
    const favIdArr = getFavouritesIds();
    (this.element.querySelector('.header__cart-qty') as HTMLElement).textContent = String(favIdArr.length);
  }
}
