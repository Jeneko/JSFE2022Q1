import { Filter } from './filter';
import { IProductData, Sort, Color, Manufacturer } from 'types';

// =====================
//     TEST SORTING
// =====================

describe('Test Filter Sorting', () => {

  const mockData: IProductData[] = [
    { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
    { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
    { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
    { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
  ];

  it('Sort direction: from Z to A', () => {

    const filter = new Filter();
    filter.state.sort = Sort.nameDesc;

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from A to Z', () => {

    const filter = new Filter();
    filter.state.sort = Sort.nameAsc;

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from OLDER to NEWER', () => {

    const filter = new Filter();
    filter.state.sort = Sort.yearAsc;

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from NEWER to OLDER', () => {

    const filter = new Filter();
    filter.state.sort = Sort.yearDesc;

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from LESS to MORE', () => {

    const filter = new Filter();
    filter.state.sort = Sort.qtyAsc;

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from MORE to LESS', () => {

    const filter = new Filter();
    filter.state.sort = Sort.qtyDesc;

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: Manufacturer.apple, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.apple, imageUrl: "", qty: 3, year: 2013, color: Color.black, camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.black, camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });
});

// =====================
//    TEST FILTERING
// =====================

describe('Test Filter Filtering', () => {

  const mockData: IProductData[] = [
    { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
    { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
    { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
    { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
    { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
    { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
  ];

  it('Filter by: Manufacturer', () => {

    const filter = new Filter();
    filter.state.manufacturer = new Set([Manufacturer.apple, Manufacturer.samsung]);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
      { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
      { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Camera', () => {

    const filter = new Filter();
    filter.state.camera = new Set([1, 3]);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Color', () => {

    const filter = new Filter();
    filter.state.color = new Set([Color.red, Color.white]);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
      { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Popular only', () => {

    const filter = new Filter();
    filter.state.popularOnly = true;

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: Manufacturer.apple, imageUrl: "", qty: 1, year: 2011, color: Color.black, camera: 3, popular: true },
      { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: QTY', () => {

    const filter = new Filter();
    filter.state.qty = [2, 3];

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
      { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Year', () => {

    const filter = new Filter();
    filter.state.year = [2013, 2015];

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
      { id: 3, name: 'Cappa', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 3, year: 2013, color: Color.white, camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Name', () => {

    const filter = new Filter();
    filter.state.name = '   eL ';

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: Manufacturer.apple, imageUrl: "", qty: 2, year: 2012, color: Color.white, camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 4, year: 2014, color: Color.black, camera: 2, popular: false },
      { id: 5, name: 'Eifel', manufacturer: Manufacturer.xiaomi, imageUrl: "", qty: 4, year: 2015, color: Color.red, camera: 1, popular: false },
      { id: 6, name: 'Fidel', manufacturer: Manufacturer.samsung, imageUrl: "", qty: 3, year: 2016, color: Color.red, camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by wrong years range should return 0 matches', () => {

    const filter = new Filter();
    filter.state.year = [2213, 2215];

    expect(filter.filter(mockData)).toHaveLength(0);
  });

  it('Filter by wrong name should return 0 matches', () => {

    const filter = new Filter();
    filter.state.name = 'RSSchool';

    expect(filter.filter(mockData)).toHaveLength(0);
  });
});
