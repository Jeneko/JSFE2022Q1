const TO_MAIN = 'На главную';
const FAVS = 'Избранное';

export const headerHTML = `
<a class="header__logo" href="#" title="${TO_MAIN}">Online<span>Store</span></a>
<div class="header__cart" title="${FAVS}">
  <span class="header__cart-qty">0</span>
</div>
`;
