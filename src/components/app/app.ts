import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App<T extends AppController = AppController, V extends AppView = AppView> {
    private readonly controller: T;
    private readonly view: V;

    constructor(controller?: T, view?: V) {
        this.controller = controller || (new AppController() as T);
        this.view = view || (new AppView() as V);
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
