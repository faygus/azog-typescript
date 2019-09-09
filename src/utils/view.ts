import { IViewType, createView } from "./view-creator";
import { IType } from "./type";
import { BaseViewModelCreator } from "./embedded-view-creator";

export abstract class View<T> {

	constructor(protected _viewModel: T) {

	}

	abstract init(host: HTMLElement): IRemovable;

	protected createEmbededView<ViewType extends View<ViewModelType>, ViewModelType, ParentViewInterface>(
		viewClass: IViewType<ViewModelType, ViewType>,
		host: HTMLElement,
		parentViewInterface: ParentViewInterface,
		viewModelCreatorClass: IType<BaseViewModelCreator<ViewModelType, T, ParentViewInterface>>
	) {
		const vmCreator = new viewModelCreatorClass();
		const vm = vmCreator.create();
		createView(viewClass, vm, host);
		vmCreator.init(this._viewModel, parentViewInterface);
	}
}

export abstract class ViewWithContent<T, U> extends View<T> {

	constructor(viewModel: T, protected _content: U) {
		super(viewModel);
	}
}

export interface IRemovable {
	remove(): void;
}
