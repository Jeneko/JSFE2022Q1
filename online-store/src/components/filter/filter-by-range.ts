const TITLE = 'Фильтры по&nbsp;диапазону';
const LEGEND_QTY = 'Количество на складе';
const LEGEND_YEAR = 'Год выхода на рынок';
const FROM = 'От';
const TO = 'До';

export const filterByRange = `
  <section>
    <h3 class="filter__section-heading">${TITLE}</h3>
    <fieldset class="filter__fieldset">
      <legend>${LEGEND_QTY}</legend>
      <div class="filter__range-wrapper">
        <label class="filter__range-label">
          <input class="filter__range-input" type="text" name="qty-min" min="1" max="12" value="1" disabled>
          ${FROM}
        </label>
        <div class="filter__range filter__qty no-ui-slider"></div>
        <label class="filter__range-label">
          <input class="filter__range-input" type="text" name="qty-max" min="1" max="12" value="12" disabled>
          ${TO}
        </label>
      </div>
    </fieldset>
    <fieldset class="filter__fieldset">
      <legend>${LEGEND_YEAR}</legend>
      <div class="filter__range-wrapper">
        <label class="filter__range-label">
          <input class="filter__range-input" type="text" name="year-min" min="2000" max="2022" value="2000" disabled>
          ${FROM}
        </label>
        <div class="filter__range filter__year no-ui-slider"></div>
        <label class="filter__range-label">
          <input class="filter__range-input" type="text" name="year-max" min="2000" max="2022" value="2022" disabled>
          ${TO}
        </label>
      </div>
    </fieldset>
  </section>
`;
