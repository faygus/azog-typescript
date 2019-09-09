import { View } from "../utils/view";

export interface IViewModel {
}

export class Background extends View<IViewModel> {

	init(host: HTMLElement) {
		const initialBackground = host.style.background;
		host.style.background = 'red'; // TODO use view model
		return {
			remove() {
				host.style.background = initialBackground;
			}
		};
	}
}
