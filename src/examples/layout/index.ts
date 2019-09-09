import { createView } from "../../utils/view-creator";
import { IContent, IViewModel, Layout } from "../../views/layout";
import { label } from "../label";
import { background } from "../background";

export function run(): void {

	const root = document.getElementById('root');
	if (!root) {
		throw new Error('root element null');
	}
	const vm: IViewModel = {};
	const content: IContent = [
		{
			component: label
		},
		{
			component: background
		}
	]
	createView(Layout, vm, root, content);
}
