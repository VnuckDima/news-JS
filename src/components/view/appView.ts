import News from './news/news';
import Sources from './sources/sources';
import { IArticlesResponse, ISourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor(news?: News, sources?: Sources) {
        this.news = news || new News();
        this.sources = sources || new Sources();
    }

    public drawNews(data: IArticlesResponse): void {
        const values = data?.articles ? Array.from(data.articles) : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesResponse): void {
        const values = data?.sources ? Array.from(data.sources) : [];
        this.sources.draw(values);
    }
}

export default AppView;
