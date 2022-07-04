import { IDrawData, INewsSource, IFilter } from '../../../types/index';
import './sources.css';

class Sources implements IDrawData<INewsSource[]>, IFilter {
    draw(data: INewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }

    filter(letter: string): void {
        const sources = document.querySelectorAll('.source__item');
        sources.forEach((source) => {
            const sourceName = (source.querySelector('.source__item-name') as HTMLElement).innerText;
            if (sourceName[0].toLowerCase() === letter.toLowerCase()) {
                source.classList.remove('hidden');
            } else {
                source.classList.add('hidden');
            }
        });

        document.querySelectorAll('.filter__letter').forEach((el) => el.classList.remove('filter__letter--active'));
        (document.querySelector(`.filter__letter[data-letter="${letter}"]`) as HTMLElement).classList.add(
            'filter__letter--active'
        );
    }

    drawFilter(): void {
        const container = document.querySelector('.filter') as HTMLElement;
        const sources = document.querySelectorAll('.source__item');
        const lettersSet = new Set();
        sources.forEach((source) => {
            const sourceName = (source.querySelector('.source__item-name') as HTMLElement).innerText;
            const curLetter = sourceName[0].toUpperCase();
            if (!lettersSet.has(curLetter)) {
                container.insertAdjacentHTML(
                    'beforeend',
                    `<a class="filter__letter" href="#" data-letter="${curLetter}">${curLetter}</a>`
                );
                lettersSet.add(curLetter);
            }
        });
    }
}

export default Sources;
