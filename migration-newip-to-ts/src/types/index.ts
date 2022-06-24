import News from '../components/view/news/news';
import Sources from '../components/view/sources/sources';

export enum StatusCodes {
    unauthorized = 401,
    notFound = 404,
}

// App Controller
export interface IAppController {
    getSources(cb: (data?: object) => void): void;
    getNews(e: Event, cb: (data?: object) => void): void;
}

// Resource Loader
export interface ILoader {
    readonly baseLink: string;
    readonly options: UrlOptions;

    getResp(query: Query, cb: () => void): void;
    errorHandler(res: Response): Response;
    makeUrl(options: UrlOptions, endpoint: string): string;
    load(method: string, endpoint: string, cb: (data?: object) => void, options: UrlOptions): void; // TODO: refine cb data type
}

// URL Options
export type UrlOptions = {
    readonly [idx: string]: string;
};

// Query object
export type Query = {
    endpoint: string;
    options: UrlOptions;
};

// App View
export interface IAppView {
    readonly news: News;
    readonly sources: Sources;

    drawNews(data: NewsResponse): void;
    drawSources(data: NewsResponse): void;
}

// Draw Data
export interface IDrawData<T> {
    draw(data: T): void;
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
