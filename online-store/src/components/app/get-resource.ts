import { IProductData } from "types";

export async function getResource(): Promise<IProductData[]> {
  const url = 'data/productList.json';
  const response = await fetch(url);
  const json = await response.json();
  return json.products as IProductData[];
}
