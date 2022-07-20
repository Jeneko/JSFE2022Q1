export const filterByName = `
  <section>
    <h3 class="filter__section-heading">Фильтр по&nbsp;названию</h3>
    <div class="filter__name">
      <label class="filter__label-name">Название содержит</label>
      <div class="filter__input-wrapper">
        <input class="filter__input filter__input-name" name="name" type="text" placeholder="Введите текст" autofocus autocomplete="off">
        <button class="btn-input filter__clear-name" title="Очистить поле">
          <svg class="icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-cross" d="M4 4L18 18M4 18L18 4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
`;
