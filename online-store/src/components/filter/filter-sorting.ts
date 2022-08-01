const TITLE = 'Сортировка товара';
const LABEL_SORT = 'Сортировать';
const LABEL_SORT_BY_NAME = 'По названию';
const LABEL_SORT_BY_YEAR = 'По году';
const LABEL_SORT_BY_QTY = 'По количеству на складе';
const OPTION_NAME_ASC = 'От А до Я';
const OPTION_NAME_DESC = 'От Я до А';
const OPTION_YEAR_ASC = 'Сначала старые';
const OPTION_YEAR_DESC = 'Сначала новые';
const OPTION_QTY_ASC = 'Сначала те, которых мало';
const OPTION_QTY_DESC = 'Сначала те, которых много';

export const filterSorting = `
  <section>
    <h3 class="filter__section-heading">${TITLE}</h3>
    <label>${LABEL_SORT}</label>
    <select name="sort">
      <optgroup label="${LABEL_SORT_BY_NAME}">
        <option value="name-asc">${OPTION_NAME_ASC}</option>
        <option value="name-desc">${OPTION_NAME_DESC}</option>
      </optgroup>
      <optgroup label="${LABEL_SORT_BY_YEAR}">
        <option value="year-desc">${OPTION_YEAR_DESC}</option>
        <option value="year-asc">${OPTION_YEAR_ASC}</option>
      </optgroup>
      <optgroup label="${LABEL_SORT_BY_QTY}">
        <option value="qty-desc">${OPTION_QTY_DESC}</option>
        <option value="qty-asc">${OPTION_QTY_ASC}</option>
      </optgroup>
    </select>
  </section>
`;
