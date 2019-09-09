import { IViewModel } from "../views/label";
import { BehaviorSubject, Observable } from "rxjs";

const list = [
	'hey girl',
	'hey boy',
	'hey miss'
];

export class MockViewModel implements IViewModel {
	private _text = new BehaviorSubject<string>('hey man');

	constructor() {
		let index = 0;
		setInterval(() => {
			this._text.next(list[index]);
			index = (index + 1) % list.length;
		}, 1000);
	}

	get text(): Observable<string> {
		return this._text.asObservable();
	}
}
