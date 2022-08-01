import { IProductData, Color, Manufacturer } from 'types';

// =====================
//   MOCK DATA SORTING
// =====================

export const sortingData: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
];

export const sortingResultA: IProductData[] = [
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
];

export const sortingResultB: IProductData[] = [
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
];

export const sortingResultC: IProductData[] = [
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
];

export const sortingResultD: IProductData[] = [
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
];

export const sortingResultE: IProductData[] = [
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
];

export const sortingResultF: IProductData[] = [
  { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
];

// =====================
//  MOCK DATA FILTERING
// =====================

export const filteringData: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
  { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];

export const filteringResultA: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];

export const filteringResultB: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
  { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
];

export const filteringResultC: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
  { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];

export const filteringResultD: IProductData[] = [
  { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];

export const filteringResultE: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];

export const filteringResultF: IProductData[] = [
  { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
  { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
  { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
];

export const filteringResultG: IProductData[] = [
  { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
  { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
  { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
  { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
];
