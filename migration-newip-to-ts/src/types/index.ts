import News from '../components/view/news/news';
import Sources from '../components/view/sources/sources';

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
