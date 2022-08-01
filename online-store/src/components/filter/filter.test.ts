import { Filter } from './filter';
import { Sort, Color, Manufacturer } from 'types';
import * as MockData from './filter.mocks';

// =====================
//     TEST SORTING
// =====================

describe('Test Filter Sorting', () => {
  it('Sort direction: from Z to A', () => {
    const filter = new Filter();
    filter.state.sort = Sort.nameDesc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultA);
  });

  it('Sort direction: from A to Z', () => {
    const filter = new Filter();
    filter.state.sort = Sort.nameAsc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultB);
  });

  it('Sort direction: from OLDER to NEWER', () => {
    const filter = new Filter();
    filter.state.sort = Sort.yearAsc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultC);
  });

  it('Sort direction: from NEWER to OLDER', () => {
    const filter = new Filter();
    filter.state.sort = Sort.yearDesc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultD);
  });

  it('Sort direction: from LESS to MORE', () => {
    const filter = new Filter();
    filter.state.sort = Sort.qtyAsc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultE);
  });

  it('Sort direction: from MORE to LESS', () => {
    const filter = new Filter();
    filter.state.sort = Sort.qtyDesc;
    expect(filter.sort(MockData.sortingData)).toEqual(MockData.sortingResultF);
  });
});

// =====================
//    TEST FILTERING
// =====================

describe('Test Filter Filtering', () => {
  it('Filter by: Manufacturer', () => {
    const filter = new Filter();
    filter.state.manufacturer = new Set([Manufacturer.apple, Manufacturer.samsung]);
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultA);
  });

  it('Filter by: Camera', () => {
    const filter = new Filter();
    filter.state.camera = new Set([1, 3]);
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultB);
  });

  it('Filter by: Color', () => {
    const filter = new Filter();
    filter.state.color = new Set([Color.red, Color.white]);
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultC);
  });

  it('Filter by: Popular only', () => {
    const filter = new Filter();
    filter.state.popularOnly = true;
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultD);
  });

  it('Filter by: QTY', () => {
    const filter = new Filter();
    filter.state.qty = [2, 3];
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultE);
  });

  it('Filter by: Year', () => {
    const filter = new Filter();
    filter.state.year = [2013, 2015];
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultF);
  });

  it('Filter by: Name', () => {
    const filter = new Filter();
    filter.state.name = '   eL ';
    expect(filter.filter(MockData.filteringData)).toEqual(MockData.filteringResultG);
  });

  it('Filter by wrong years range should return 0 matches', () => {
    const filter = new Filter();
    filter.state.year = [2213, 2215];
    expect(filter.filter(MockData.filteringData)).toHaveLength(0);
  });

  it('Filter by wrong name should return 0 matches', () => {
    const filter = new Filter();
    filter.state.name = 'RSSchool';
    expect(filter.filter(MockData.filteringData)).toHaveLength(0);
  });
});
