import { NewsResponse, IAppController, Query } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data: NewsResponse) => void) {
        super.getResp({ endpoint: 'sources' } as Query, callback);
    }

    getNews(e: Event, callback: (data: NewsResponse) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
