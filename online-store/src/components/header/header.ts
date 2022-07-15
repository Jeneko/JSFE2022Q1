import { IHeader } from 'types';

export class Header implements IHeader {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('header');
    this.element.className = 'header';
    this.element.innerHTML = `
      <a class="header__logo" href="#" title="На главную">Online<span>Store</span></a>
      <div class="header__cart" title="Избранное">
        <span class="header__cart-qty">0</span>
      </div>
    `;
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
