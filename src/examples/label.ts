import { IViewModel, Label } from "../views/label";
import { MockViewModel } from "../mock/label";
import { ViewFunction } from "../utils/view-function";

export const label: ViewFunction = (host) => {
	const vm: IViewModel = new MockViewModel();
	const label = new Label(vm);
	return label.init(host);
};
