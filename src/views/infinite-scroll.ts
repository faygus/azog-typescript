import { BehaviorSubject, Observable } from "rxjs";
import { View, IRemovable } from "../utils/view";
import { List } from "./list";
import { IViewModel as IListViewModel } from "./list";
import { BaseViewModelCreator, createEmbededView } from "../utils/embedded-view-creator";

export interface IViewModel {
	list: Observable<string[]>;
}

export class InfiniteScroll extends View<IViewModel> {

	constructor(viewModel: IViewModel) {
		super(viewModel);
	}

	init(host: HTMLElement): IRemovable {
		const height = 100;
		const div = document.createElement('div');
		div.style.height = `${height}px`;
		div.style.overflowY = 'scroll';
		div.style.width = '200px';
		div.style.background = 'red';
		host.appendChild(div);
		const view: IScrollView = {
			get scrollHeight() {
				return div.scrollHeight;
			},
			get height() {
				return height;
			},
			get scrollTop() {
				return div.scrollTop;
			},
			onScroll(handler) {
				div.onscroll = handler;
			}
		};
		this.createEmbededView(List, div, view, MyViewModelCreator);
		return {
			remove() {
				// TODO
			}
		};
	}
}

interface IScrollView {
	scrollHeight: number;
	scrollTop: number;
	height: number;
	onScroll(handler: () => void): void;
}

class MyViewModelCreator extends BaseViewModelCreator<IListViewModel, IViewModel, IScrollView> {

	private _list$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

	create() {
		const res: IListViewModel = {
			list: this._list$.asObservable()
		};
		return res;
	}

	init(parentViewModel: IViewModel, view: IScrollView) {
		let _list: string[] = [];
		let _itemsLoadedCount = 0;
		let _itemsVisibleCount = 0;

		parentViewModel.list.subscribe(values => {
			_list = values;
			for (const value of values) {
				if (view.scrollHeight <= view.height) {
					_itemsVisibleCount++;
				}
				if (view.scrollHeight > 2 * view.height) {
					return;
				}
				_itemsLoadedCount++;
				this._list$.next([...this._list$.value, value]);
			}
		});

		view.onScroll(() => {
			const numberOfPagesScrolled = Math.floor(view.scrollTop / view.height);
			const times = _itemsVisibleCount * (numberOfPagesScrolled + 2);
			if (times > _itemsLoadedCount) {
				this._list$.next(_list.slice(0, times));
				_itemsLoadedCount = times;
			}
		});
	}
}
