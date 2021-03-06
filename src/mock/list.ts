import { IViewModel } from "../views/list";
import { BehaviorSubject, Observable } from "rxjs";

export class MockViewModel implements IViewModel {
	private _list = new BehaviorSubject<string[]>(['hey man', 'hey girl']);

	constructor() {
		setTimeout(() => {
			this._list.next(['hahahah', 'hey hey', 'hello :)']);
		}, 1000);
	}

	get list(): Observable<string[]> {
		return this._list.asObservable();
	}
}
