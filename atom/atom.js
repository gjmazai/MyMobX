import { globalState } from "../GlobalState";

/** Класс реализующий подписки и уведомления для наблюдаемых значений. */
export class Atom {
	constructor() {
		this._observers = new Set([]);
	}
	
}