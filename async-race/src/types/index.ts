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

export type PageMenuMapper = Record<PageName, string>;

export enum Endpoints {
  garage = 'garage',
  winners = 'winners',
  engine = 'engine',
}

export enum ResponseStatus {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500,
}

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

export enum EngineStatus {
  started = 'started',
  stopped = 'stopped',
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnersCars {
  winnersCarsList: (Winner & Car)[];
  totalCount: number;
}

export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface Cars {
  carsList: Car[];
  totalCount: number;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}
