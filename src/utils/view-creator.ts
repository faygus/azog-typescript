import { View, ViewWithContent } from "./view";

export interface IViewType<ViewModelType, ViewType extends View<ViewModelType>> {
	new(viewModel: ViewModelType): ViewType;
}

export interface IViewWithContentType<
	ViewModelType,
	ViewType extends ViewWithContent<ViewModelType, ViewContentType>,
	ViewContentType> {
	new(viewModel: ViewModelType, content: ViewContentType): ViewType;
}

export function createView<
	ViewModelType,
	ViewContentType,
	ViewType extends ViewWithContent<ViewModelType, ViewContentType>
>(
	viewClass: IViewWithContentType<ViewModelType, ViewType, ViewContentType>,
	viewModel: ViewModelType,
	host: HTMLElement,
	content: ViewContentType
): ViewType;
export function createView<
	ViewModelType,
	ViewType extends View<ViewModelType>
>(
	viewClass: IViewType<ViewModelType, ViewType>,
	viewModel: ViewModelType,
	host: HTMLElement
): ViewType;
export function createView(
	viewClass: any,
	viewModel: any,
	host: any,
	content?: any
): any {
	const res = new viewClass(viewModel, content);
	res.init(host);
	return res;
}
