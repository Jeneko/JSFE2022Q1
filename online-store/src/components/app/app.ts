import { IApp, IProductData } from 'types';
import { Header } from 'components/header/header';
import { Catalog } from 'components/catalog/catalog';
import { Footer } from 'components/footer/footer';
import { getResource } from 'components/app/get-resource';
import { appHTML } from './app-html';

export default class App implements IApp {
  element: HTMLElement;

  constructor(mountPointId: string) {
    this.element = (document.getElementById(mountPointId) as HTMLElement);
    this.element.innerHTML = appHTML;
  }

  start() {
    // Header
    const header = new Header();
    header.render(this.element.querySelector('.header') as HTMLElement);
    this.element.addEventListener('favouritesUpdate', () => header.updateCartQty());

    // Catalog
    this.getStore().then(store => {
      const catalog = new Catalog(store);
      catalog.render(this.element.querySelector('.catalog') as HTMLElement);
    });

    // Footer
    const footer = new Footer();
    footer.render(this.element.querySelector('.footer') as HTMLElement);
  }

  async getStore(): Promise<IProductData[]> {
    return await getResource();
  }
}
