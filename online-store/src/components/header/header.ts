import { IComponent } from 'types';

export class Header implements IComponent {
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
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}
