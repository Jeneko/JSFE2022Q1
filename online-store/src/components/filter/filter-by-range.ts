export const filterByRange = `
  <section>
    <h3>Фильтры по диапазону</h3>
    <fieldset>
      <legend>Количество на складе</legend>
      <div class="filter__range-wrapper">
        <label>
          От
          <input type="text" name="qty-min" min="1" max="12" value="1" disabled>
        </label>
        <div class="filter__range filter__qty no-ui-slider"></div>
        <label>
          <input type="text" name="qty-max" min="1" max="12" value="12" disabled>
          До
        </label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Год выхода на рынок</legend>
      <div class="filter__range-wrapper">
        <label>
          От
          <input type="text" name="year-min" min="2000" max="2022" value="2000" disabled>
        </label>
        <div class="filter__range filter__year no-ui-slider"></div>
        <label>
          <input type="text" name="year-max" min="2000" max="2022" value="2022" disabled>
          До
        </label>
      </div>
    </fieldset>
  </section>
`;
