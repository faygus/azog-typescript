import { Observable } from "rxjs";
import { IRemovable, ViewWithContent } from "../utils/view";
import { ViewFunction } from "../utils/view-function";

export interface IViewModel {
	condition: Observable<boolean>;
}

export class If extends ViewWithContent<IViewModel, ViewFunction> {

	init(host: HTMLElement): IRemovable {
		let ref: IRemovable | undefined;
		const subscription = this._viewModel.condition.subscribe(value => {
			if (value) {
				ref = this._content(host);
			} else {
				if (ref) {
					ref.remove();
					ref = undefined;
				}
			}
		});
		return {
			remove() {
				if (subscription) {
					subscription.unsubscribe();
				}
				if (ref) {
					ref.remove();
					ref = undefined;
				}
			}
		};
	}
}
