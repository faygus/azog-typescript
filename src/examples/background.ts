import { Background } from "../views/background";
import { ViewFunction } from "../utils/view-function";

export const background: ViewFunction = (host) => {
	const view = new Background({});
	return view.init(host);
}
