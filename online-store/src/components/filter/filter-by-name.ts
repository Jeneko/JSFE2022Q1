const TITLE = 'Фильтр по&nbsp;названию';
const LABEL = 'Название содержит';
const PLACEHOLDER = 'Введите текст';
const TITLE_CLEAR = 'Очистить поле';

export const filterByName = `
  <section>
    <h3 class="filter__section-heading">${TITLE}</h3>
    <div class="filter__name">
      <label class="filter__label-name">${LABEL}</label>
      <div class="filter__input-wrapper">
        <input class="filter__input filter__input-name" name="name" type="text" placeholder="${PLACEHOLDER}" autofocus autocomplete="off">
        <button class="btn-input filter__clear-name" title="${TITLE_CLEAR}">
          <svg class="icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-cross" d="M4 4L18 18M4 18L18 4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
`;
