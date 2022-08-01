import { IProductData } from "types";

export function getProductHTML(data: IProductData) {
  return `
    <h3 class="product__name">${data.name}</h3>
    <img class="product__image" src="${data.imageUrl}" alt="${data.name}">
    <table class="product__properties">
      <tr class="product__property">
        <td class="product__property-key">Количество</td>
        <td class="product__property-value product__qty">${data.qty}</td>
      </tr>
      <tr class="product__property">
        <td class="product__property-key">Год выхода</td>
        <td class="product__property-value product__year">${data.year}</td>
      </tr>
      <tr class="product__property">
        <td class="product__property-key">Производитель</td>
        <td class="product__property-value product__manufacturer">${data.manufacturer}</td>
      </tr>
      <tr class="product__property">
        <td class="product__property-key">Цвет</td>
        <td class="product__property-value product__color">${data.color}</td>
      </tr>
      <tr class="product__property">
        <td class="product__property-key">Камер (шт.)</td>
        <td class="product__property-value product__camera">${data.camera}</td>
      </tr>
      <tr class="product__property">
        <td class="product__property-key">Популярный</td>
        <td class="product__property-value product__qty">${data.popular ? 'Да' : 'Нет'}</td>
      </tr>
    </table>
  `;
}
