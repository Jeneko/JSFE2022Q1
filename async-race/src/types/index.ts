export type State = {
  page: PageName;
  garagePagination: number;
  garageQtyOnPage: number;
  garageTotalCount: number;
  winnersPagination: number;
  winnersQtyOnPage: number;
  winnersTotalCount: number;
  winnersSort: Sort;
  winnersOrder: Order;
};

export enum PageName {
  garage = 'garage',
  winners = 'winners',
}

export enum Sort {
  wins = 'wins',
  time = 'time',
}

export enum Order {
  asc = 'ASC',
  desc = 'DESC',
}
