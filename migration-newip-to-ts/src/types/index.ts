import News from '../components/view/news/news';
import Sources from '../components/view/sources/sources';

// Endpoints
export type Endpoints = 'sources' | 'everything' | 'top-headlines' | 'top-headlines/sources';

// Status Codes
export enum StatusCodes {
    unauthorized = 401,
    notFound = 404,
}

// App Controller
export interface IAppController {
    getSources(cb: (data?: NewsResponse) => void): void;
    getNews(e: Event, cb: (data?: NewsResponse) => void): void;
}

// Resource Loader
export interface ILoader {
    readonly baseLink: string;
    readonly options: UrlOptions;

    getResp(query: Query, cb: () => void): void;
    errorHandler(res: Response): Response;
    makeUrl(options: UrlOptions, endpoint: Endpoints): string;
    load(method: string, endpoint: Endpoints, cb: (data?: NewsResponse) => void, options: UrlOptions): void;
}

// URL Options
export type UrlOptions = {
    apiKey?: string;
    sources?: string;
};

// Query object
export type Query = {
    endpoint: Endpoints;
    options: UrlOptions;
};

// App View
export interface IAppView {
    readonly news: News;
    readonly sources: Sources;

    drawNews(data: NewsResponse): void;
    drawSources(data: Pick<NewsResponse, 'status' | 'code' | 'message' | 'totalResults' | 'sources'>): void;
    drawFilter(): void;
    filterSource(letter: string): void;
}

// Draw Data
export interface IDrawData<T> {
    draw(data: T): void;
}

// Filter
export interface IFilter {
    filter(letter: string): void;
    drawFilter(): void;
}

// Response Data
export type NewsResponse = {
    readonly status: 'ok' | 'error';
    readonly code?: string;
    readonly message?: string;
    readonly totalResults?: number;
    readonly articles?: INewsArticle[];
    readonly sources?: INewsSource[];
};

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
