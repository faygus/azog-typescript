import { View, IRemovable } from "../utils/view";
import { Observable } from "rxjs";

export interface IViewModel {
	text: Observable<string>;
}

export class Label extends View<IViewModel> {
	constructor(viewModel: IViewModel) {
		super(viewModel);
	}

	init(host: HTMLElement): IRemovable {
		const p = document.createElement('p');
		const subscription = this._viewModel.text.subscribe(text => {
			p.textContent = text;
		});
		host.appendChild(p);
		return {
			remove() {
				if (subscription) {
					subscription.unsubscribe();
				}
				p.remove();
			}
		};
	}
}
