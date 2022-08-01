const TITLE = 'Список товаров';
const NO_PRODUCTS_FOUND = 'Извините, совпадений не обнаружено';

export const productListHTML = `
<h2>${TITLE}</h2>
<div class="product-list"></div>
`;

export const emptyProductListHTML = `<h3 class="product-list__no-product">${NO_PRODUCTS_FOUND}</h3>`;
