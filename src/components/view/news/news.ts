import './news.css';
import { IArticle } from '../../../types';

class News {
    public draw(data: ReadonlyArray<IArticle>): void {
        const news = data.length >= 10 ? data.filter((_item: IArticle, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item: IArticle, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');
            if (newsItem && idx % 2) {
                newsItem.classList.add('alt');
            }

            const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (photo) {
                photo.style.backgroundImage = 'url(' + (item.urlToImage || './img/news_placeholder.jpg') + ')';
            }

            const author = newsClone.querySelector('.news__meta-author');
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector('.news__meta-date');
            if (date && item.publishedAt) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const title = newsClone.querySelector('.news__description-title');
            if (title) {
                title.textContent = item.title;
            }

            const sourceName = newsClone.querySelector('.news__description-source');
            if (sourceName) {
                sourceName.textContent = item.source.name;
            }

            const content = newsClone.querySelector('.news__description-content');
            if (content) {
                content.textContent = item.description || '';
            }

            const readMore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement | null;
            if (readMore) {
                readMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
