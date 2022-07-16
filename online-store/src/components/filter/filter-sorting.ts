export const filterSorting = `
  <section>
    <h3 class="filter__section-heading">Сортировка товара</h3>
    <label>Сортировать</label>
    <select name="sort">
      <optgroup label="По названию">
        <option value="name-asc">От А до Я</option>
        <option value="name-desc">От Я до А</option>
      </optgroup>
      <optgroup label="По году">
        <option value="year-desc">Сначала новые</option>
        <option value="year-asc">Сначала старые</option>
      </optgroup>
      <optgroup label="По количеству на складе">
        <option value="qty-desc">Сначала те, которых много</option>
        <option value="qty-asc">Сначала те, которых мало</option>
      </optgroup>
    </select>
  </section>
`;
