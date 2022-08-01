import { IComponent } from 'types';
import { footerHTML } from './footer-html';

export class Footer implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('footer');
    this.element.className = "footer";
    this.element.innerHTML = footerHTML;
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}
