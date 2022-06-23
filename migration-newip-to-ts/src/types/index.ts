// Draw Data
export interface IDrawData<T> {
  draw(data: T): void;
}

// Article Data
export interface INewsArticle {
  readonly source: INewsSource;
  readonly author: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly urlToImage: string;
  readonly publishedAt: string;
  readonly content: string;
}

// Source Data
export interface INewsSource {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly category: string;
  readonly language: string;
  readonly country: string;
}
