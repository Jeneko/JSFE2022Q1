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
        this.controller.getSources((data: NewsResponse) => this.view.drawSources(data));
    }
}

export default App;
