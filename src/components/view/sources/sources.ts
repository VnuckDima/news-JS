import './sources.css';
import { ISource } from '../../../types';

class Sources {
    draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector('.source__item-name');
            if (name) {
                name.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
