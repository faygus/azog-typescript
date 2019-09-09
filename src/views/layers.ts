import { ViewWithContent } from "../utils/view";
import { ViewFunction } from "../utils/view-function";

export interface IViewModel {

}

export class Layers extends ViewWithContent<IViewModel, IContent> {

	init(host: HTMLElement) {
		const mainLayerComponent = this._content.mainLayer.component;
		mainLayerComponent(host);
		for (const layer of this._content.layers) {
			this.createLayer(host, layer.component);
		}
		return {
			remove() {
				// TODO
			}
		};
	}

	private createLayer(host: HTMLElement, component: ViewFunction) {
		const div = document.createElement('div');
		div.style.height = '100%';
		div.style.width = '100%';
		div.style.position = 'absolute';
		div.style.top = '0px';
		div.style.left = '0px';
		host.appendChild(div);
		component(div);
	}
}

export interface IContent {
	mainLayer: ILayer;
	layers: ILayer[];
}

interface ILayer {
	zIndex: number;
	component: ViewFunction; // TODO
	// TODO
}
