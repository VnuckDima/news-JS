import './sources.css';
import { ISource } from '../../../types';

class Sources {
    public draw(data: ReadonlyArray<ISource>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector('.source__item-name');
            if (name) {
                name.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement | null;
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
