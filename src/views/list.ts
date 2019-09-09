import { View, IRemovable } from "../utils/view";
import { Observable } from "rxjs";

export interface IViewModel {
	list: Observable<string[]>;
}

export class List extends View<IViewModel> {
	constructor(viewModel: IViewModel) {
		super(viewModel);
	}

	init(host: HTMLElement): IRemovable {
		const div = document.createElement('div');
		host.appendChild(div);
		this._viewModel.list.subscribe(values => {
			console.log('values input count : ', values.length);
			this.clean(div);
			for (const value of values) {
				div.appendChild(this.createChild(value));
			}
		});
		return {
			remove() {
				// TODO
			}
		};
	}

	private createChild(value: string): HTMLElement {
		const p = document.createElement('p');
		p.textContent = value;
		return p;
	}

	private clean(div: HTMLDivElement): void {
		while (div.lastChild) {
			div.removeChild(div.lastChild);
		}
	}
}
