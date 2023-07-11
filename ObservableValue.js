import { globalState } from './GlobalState';
import { $$observable } from './constants';
import { isPrimitive, isPureObject, isObservable } from "./utils.js"


function enhancer( value ) {
 if ( isObservable( value ) ) return value;
 if ( isPrimitive( value ) ) return value;

 if ( isPureObject( value ) ) return observableObject( value );

 return value;
}

/**
 * @description Клаcc представляющий собой наблюдаемое значение, при условии, что оно является примитивом.
 */
export class ObservableValue {
	constructor(value) {
		this._observers = new Set();
		this._value = enhancer( value );

		this[ $$observable ] = true;
	}

	/**
	 * @description Метод возвращает значение и, если есть глобальный слушатель, то регистрирует его.
	 * @returns наблюдаемое значение.
	 */
	get() {
		/** тут мы отлавливаем функцию, которая была записана в trackingDerivation при вызове autorun. */
		if ( globalState.trackingDerivation ) {
			this.observe( globalState.trackingDerivation );
		}

		return this._value;
	}

	/**
	 * @description Метод устанавливает новое значение и уведомляет слушателей.
	 * @param value - значение для установки.
	 */
	set( newValue ) {
		this._value = enhancer( newValue );
		this._notify();
	}

	/**
	 * @description Метод добавляет слушатель в массив слушателей. Добавляет наблюдаемое значение в зависимости реакции.
	 * @param reaction - слушатель, для добавления в массив.
	 */
	observe( reaction ) {
		this._observers.add( reaction );
	}

	/**
	 * @description Метод удаляет слушатель из массива слушателей. Удаляет наблюдаемое значение из зависимостей реакции.
	 * @param reaction - слушатель, для удаления из массива.
	 */
	dispose( reaction ) {
		this._observers.delete( reaction );
	}

	/**
	 * @description Метод уведомляет слушателей об изменениях.
	 */
	_notify() {
		this._observers.forEach( reaction => reaction() );
	}
}
