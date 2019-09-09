import { createView } from "../../utils/view-creator";
import { IContent, IViewModel, Layers } from "../../views/layers";
import { background } from "../background";
import { label } from "../label";

export function run(): void {

	const root = document.getElementById('root');
	if (!root) {
		throw new Error('root element null');
	}

	const vm: IViewModel = {};
	const content: IContent = {
		mainLayer: {
			zIndex: 1,
			component: label
		},
		layers: [
			{
				zIndex: 2,
				component: background
			}
		]
	};
	createView(Layers, vm, root, content);
}
