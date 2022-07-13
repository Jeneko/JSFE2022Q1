import { IHeader } from 'types';

export class Header implements IHeader {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('header');
    this.element.className = 'header';
    this.element.innerHTML = `
      <a class="logo" href="#" title="На главную">Online Store</a>
      <div class="cart">
        Товаров в корзине: <span class="cart__qty">0</span>
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
    (this.element.querySelector('.cart__qty') as HTMLElement).textContent = String(favIdArr.length);
  }
}
