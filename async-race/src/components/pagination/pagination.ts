import * as state from 'utils/state';
import { PageName } from 'types/index';
import './pagination.css';

function handleEvents(elem: HTMLElement):void {
  elem.onclick = (e: Event) => {
    const curState = state.getState();
    const curPage = curState.page;
    const target = e.target as HTMLButtonElement;

    // Pagination Prev
    if (target.classList.contains('btn-pagination-prev')) {
      state.updateState(`${curPage}Pagination`, curState[`${curPage}Pagination`] -= 1);
      elem.dispatchEvent(new Event(`${curPage}UpdatePagination`, { bubbles: true }));
    }
    // Pagination Next
    if (target.classList.contains('btn-pagination-next')) {
      state.updateState(`${curPage}Pagination`, curState[`${curPage}Pagination`] += 1);
      elem.dispatchEvent(new Event(`${curPage}UpdatePagination`, { bubbles: true }));
    }
  };
}

export default function getPagination(total: number, pageName: PageName): HTMLElement {
  const curState = state.getState();
  const elem = document.createElement('div');
  elem.className = `pagination ${pageName}-pagination`;

  const curPage = curState[`${pageName}Pagination`];
  const curQtyOnPage = curState[`${pageName}QtyOnPage`];

  elem.append(getPaginationButton('Prev', 'btn-pagination-prev', curPage <= 1));
  elem.append(getPaginationButton('Next', 'btn-pagination-next', curPage >= total / curQtyOnPage));

  handleEvents(elem);

  return elem;
}

function getPaginationButton(text: string, className: string, disabled: boolean): HTMLButtonElement {
  const paginationButton = document.createElement('button');
  paginationButton.innerText = text;
  paginationButton.className = `btn-pagination ${className}`;
  paginationButton.disabled = disabled;

  return paginationButton;
}
