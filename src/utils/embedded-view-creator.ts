import { IViewType, createView } from "./view-creator";
import { View } from "./view";
import { IType } from "./type";

export function createEmbededView<
	ViewModelType,
	ViewType extends View<ViewModelType>,
	ParentViewModelType,
	ParentViewType
>(
	viewClass: IViewType<ViewModelType, ViewType>,
	host: HTMLElement,
	viewModelCreatorClass: IType<BaseViewModelCreator<ViewModelType, ParentViewModelType, ParentViewType>>,
	parentViewModel: ParentViewModelType,
	parentView: ParentViewType
) {
	const creator = new viewModelCreatorClass();
	const vm = creator.create();
	createView(viewClass, vm, host);
	creator.init(parentViewModel, parentView);
}

export abstract class BaseViewModelCreator<ViewModelType, ParentViewModelType, ParentViewType> {

	abstract create(): ViewModelType;
	abstract init(parentViewModel: ParentViewModelType, parentView: ParentViewType): void;
}

export abstract class Toto {

}
