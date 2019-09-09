import { BehaviorSubject } from "rxjs";
import { View } from "../../utils/view";
import { createView } from "../../utils/view-creator";
import { For, IContent, IViewModel, ILayout } from "../../views/for";

export function run(): void {

	const root = document.getElementById('root');
	if (!root) {
		throw new Error('root element null');
	}

	const vm = (() => {
		const list$ = new BehaviorSubject<string[]>(['toto', 'tata', 'tutu']);
		setTimeout(() => {
			list$.next([
				'hello',
				'hey man',
				'hey girl',
				'how are you ?'
			]);
		}, 2000);
		const res: IViewModel<string> = {
			list: list$.asObservable()
		};
		return res;
	})();

	class Content extends View<string> {
		init(host: HTMLElement) {
			const p = document.createElement('p');
			p.textContent = this._viewModel;
			host.appendChild(p);
			return {
				remove() {
					// TODO
				}
			};
		}
	}

	class Layout implements ILayout {
		init(host: HTMLElement) {
			host.style.display = 'flex';
			host.style.flexDirection = 'column';
			return {
				createChild() {
					const res = document.createElement('div');
					res.style.marginBottom = '10px';
					host.appendChild(res);
					return res;
				}
			}
		}
	}

	const content: IContent<string> = {
		childView: Content,
		layout: new Layout()
	};
	createView(For, vm, root, content);
}
