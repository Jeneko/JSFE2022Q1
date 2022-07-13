import { IApp } from 'types';
import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';

export default class App implements IApp {
  element: HTMLElement;

  constructor(mountPointId: string) {
    this.element = (document.getElementById(mountPointId) as HTMLElement);
    this.element.innerHTML = `
      <header class="header"></header>
      <main class="catalog--loading">Загрузка...</main>
      <footer class="footer"></footer>
    `;
  }

  start() {
    // Header
    const header = new Header();
    header.render(this.element.querySelector('.header') as HTMLElement);

    // Footer
    const footer = new Footer();
    footer.render(this.element.querySelector('.footer') as HTMLElement);
  }
}
