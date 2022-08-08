import * as state from 'utils/state';
import { PageName, PageMenuMapper } from 'types/index';
import './page-menu.css';

export default function getPageMenu(): HTMLElement {
  const currentPage = state.getState().page;
  const pageMenu = document.createElement('div');
  pageMenu.className = 'page-menu';

  const pageMenuMapper: PageMenuMapper = {
    [PageName.garage]: `
      <button class="btn-pages" data-page="garage" disabled>Garage</button>
      <button class="btn-pages" data-page="winners">Winners</button>
    `,
    [PageName.winners]: `
    <button class="btn-pages" data-page="garage">Garage</button>
    <button class="btn-pages" data-page="winners" disabled>Winners</button>
    `,
  };

  pageMenu.innerHTML = pageMenuMapper[currentPage];

  pageMenu.onclick = (e: Event) => {
    const target = e.target as HTMLButtonElement;

    if (target.dataset.page) {
      state.updateState('page', target.dataset.page);
      pageMenu.dispatchEvent(new Event('switchPage', { bubbles: true }));
      pageMenu.replaceWith(getPageMenu());
    }
  };

  return pageMenu;
}
