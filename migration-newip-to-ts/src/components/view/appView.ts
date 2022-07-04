import { IAppView, NewsResponse } from 'types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements IAppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: NewsResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    drawFilter() {
        this.sources.drawFilter();
    }

    filterSource(letter: string) {
        this.sources.filter(letter);
    }
}

export default AppView;
