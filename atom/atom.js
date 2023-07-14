import { globalState } from "../GlobalState";

/** Класс реализующий подписки и уведомления для наблюдаемых значений. */
export class Atom {
	constructor() {
		this._observers = new Set([]);
	}

	/**
	 * Метод добавляет слушатель в массив слушателей. Добавление наблюдаемого значения в зависимости реакции.
	 * @param reaction - реакция/слушатель. 
	 */
	observe( reaction ) {
		this._observers.add( reaction );
	}
	
	/**
	 * Метод производит удаление слушателя из массива слушателей.
	 * @param reaction - реакция/слушатель.
	 */
	dispose( reaction ) {
		this._observers.delete( reaction );
	}

	/** Метод уведомляет слушателей об изменениях. */
	_notify() {
		this._observers.forEach( reaction => reaction() );
	}
	/** Метод перехватывает глобальный слушатель. */
	_reportObserved() {
		if( globalState.trackingDerivation ) {
			this.observe( globalState.trackingDerivation );
		}
	}
}