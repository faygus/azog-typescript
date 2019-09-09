import { IViewModel } from "../views/if";
import { BehaviorSubject, Observable } from "rxjs";

export class MockViewModel implements IViewModel {
	private _condition = new BehaviorSubject<boolean>(true);

	constructor() {
		setInterval(() => {
			this._condition.next(!this._condition.value);
		}, 500);
	}

	get condition(): Observable<boolean> {
		return this._condition.asObservable();
	}
}
