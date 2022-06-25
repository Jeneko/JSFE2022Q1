import { NewsResponse } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
        );
        (document.querySelector('.filter') as HTMLElement).addEventListener('click', (e) => {
            e.preventDefault();
            if ((e.target as HTMLElement).tagName === 'A') {
                const letter = <string>(e.target as HTMLElement).dataset.letter;
                this.view.filterSource(letter);
            }
        });
        this.controller.getSources((data: NewsResponse) => {
            this.view.drawSources(data);
            this.view.drawFilter();
            this.view.filterSource('A');
        });
    }
}

export default App;
