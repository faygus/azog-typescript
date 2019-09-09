import { View, ViewWithContent } from "../utils/view";
import { ViewFunction } from "../utils/view-function";

export interface IViewModel {

}

export class Layout extends ViewWithContent<IViewModel, IContent> {

	init(host: HTMLElement) {
		host.style.display = 'flex';
		host.style.flexDirection = 'column'; // TODO
		for (const element of this._content) {
			const div = document.createElement('div');
			div.style.width = '100%'; // TODO
			div.style.marginBottom = '20px'; // TODO
			div.style.minHeight = '100px'; // TODO
			element.component(div);
			host.appendChild(div);
		}
		return {
			remove() {
				// TODO
			}
		};
	}
}

export type IContent = LayoutElement[];

interface LayoutElement {
	component: ViewFunction;
}