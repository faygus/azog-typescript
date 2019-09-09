import { Observable } from "rxjs";
import { IRemovable, View, ViewWithContent } from "../utils/view";
import { createView, IViewType } from "../utils/view-creator";

export interface IViewModel<T> {
	list: Observable<T[]>;
}

export interface IContent<T> {
	childView: IViewType<T, View<T>>;
	layout: ILayout;
}

export interface ILayout {
	init(host: HTMLElement): ILayoutInitialized;
}

export interface ILayoutInitialized {
	createChild(): HTMLElement;
}

export class For<T> extends ViewWithContent<IViewModel<T>, IContent<T>> {

	init(host: HTMLElement): IRemovable {
		const layout = this._content.layout.init(host);
		this._viewModel.list.subscribe(values => {
			while (host.lastChild) {
				host.lastChild.remove();
			}
			for (const value of values) {
				const div = layout.createChild();
				createView(this._content.childView, value, div);
			}
		});
		return {
			remove() {
				// TODO
			}
		};
	}
}
