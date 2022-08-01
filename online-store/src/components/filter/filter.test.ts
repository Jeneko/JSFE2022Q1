import { Filter } from './filter';
import { IProductData } from 'types';

// =====================
//     TEST SORTING
// =====================

describe('Test Filter Sorting', () => {

  const mockData: IProductData[] = [
    { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
    { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
    { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
    { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
  ];

  it('Sort direction: from Z to A', () => {

    const filter = new Filter();
    filter.state.sort = 'name-desc';

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from A to Z', () => {

    const filter = new Filter();
    filter.state.sort = 'name-asc';

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from OLDER to NEWER', () => {

    const filter = new Filter();
    filter.state.sort = 'year-asc';

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from NEWER to OLDER', () => {

    const filter = new Filter();
    filter.state.sort = 'year-desc';

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from LESS to MORE', () => {

    const filter = new Filter();
    filter.state.sort = 'qty-asc';

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });

  it('Sort direction: from MORE to LESS', () => {

    const filter = new Filter();
    filter.state.sort = 'qty-desc';

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: "Apple", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Apple", imageUrl: "", qty: 3, year: 2013, color: "черный", camera: 1, popular: false },
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "черный", camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 1, popular: false },
    ];

    expect(filter.sort(mockData)).toEqual(expectedResult);
  });
});

// =====================
//    TEST FILTERING
// =====================

describe('Test Filter Filtering', () => {

  const mockData: IProductData[] = [
    { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
    { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 3, popular: true },
    { id: 4, name: 'Delta', manufacturer: "Samsung", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 2, popular: false },
    { id: 3, name: 'Cappa', manufacturer: "Xiaomi", imageUrl: "", qty: 3, year: 2013, color: "белый", camera: 3, popular: false },
    { id: 5, name: 'Eifel', manufacturer: "Xiaomi", imageUrl: "", qty: 4, year: 2015, color: "красный", camera: 1, popular: false },
    { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
  ];

  it('Filter by: Manufacturer', () => {

    const filter = new Filter();
    filter.state.manufacturer = new Set(['Apple', 'Samsung']);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 3, popular: true },
      { id: 4, name: 'Delta', manufacturer: "Samsung", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 2, popular: false },
      { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Camera', () => {

    const filter = new Filter();
    filter.state.camera = new Set([1, 3]);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 3, popular: true },
      { id: 3, name: 'Cappa', manufacturer: "Xiaomi", imageUrl: "", qty: 3, year: 2013, color: "белый", camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: "Xiaomi", imageUrl: "", qty: 4, year: 2015, color: "красный", camera: 1, popular: false },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Color', () => {

    const filter = new Filter();
    filter.state.color = new Set(['красный', 'белый']);

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Xiaomi", imageUrl: "", qty: 3, year: 2013, color: "белый", camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: "Xiaomi", imageUrl: "", qty: 4, year: 2015, color: "красный", camera: 1, popular: false },
      { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Popular only', () => {

    const filter = new Filter();
    filter.state.popularOnly = true;

    const expectedResult: IProductData[] = [
      { id: 1, name: 'Apple', manufacturer: "Apple", imageUrl: "", qty: 1, year: 2011, color: "черный", camera: 3, popular: true },
      { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: QTY', () => {

    const filter = new Filter();
    filter.state.qty = [2, 3];

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Xiaomi", imageUrl: "", qty: 3, year: 2013, color: "белый", camera: 3, popular: false },
      { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Year', () => {

    const filter = new Filter();
    filter.state.year = [2013, 2015];

    const expectedResult: IProductData[] = [
      { id: 4, name: 'Delta', manufacturer: "Samsung", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 2, popular: false },
      { id: 3, name: 'Cappa', manufacturer: "Xiaomi", imageUrl: "", qty: 3, year: 2013, color: "белый", camera: 3, popular: false },
      { id: 5, name: 'Eifel', manufacturer: "Xiaomi", imageUrl: "", qty: 4, year: 2015, color: "красный", camera: 1, popular: false },
    ];

    expect(filter.filter(mockData)).toEqual(expectedResult);
  });

  it('Filter by: Name', () => {

    const filter = new Filter();
    filter.state.name = '   eL ';

    const expectedResult: IProductData[] = [
      { id: 2, name: 'Babel', manufacturer: "Apple", imageUrl: "", qty: 2, year: 2012, color: "белый", camera: 1, popular: false },
      { id: 4, name: 'Delta', manufacturer: "Samsung", imageUrl: "", qty: 4, year: 2014, color: "черный", camera: 2, popular: false },
      { id: 5, name: 'Eifel', manufacturer: "Xiaomi", imageUrl: "", qty: 4, year: 2015, color: "красный", camera: 1, popular: false },
      { id: 6, name: 'Fidel', manufacturer: "Samsung", imageUrl: "", qty: 3, year: 2016, color: "красный", camera: 2, popular: true },
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
