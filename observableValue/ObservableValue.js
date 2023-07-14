import { globalState } from '../GlobalState';
import { $$observable } from '../constants';
import { isPrimitive, isPureObject, isObservable, isArray } from "../utils.js"
import { observableArrayProxyFabric } from '../observableArray';
import { observableObjectProxyFactory } from '../observableObject';
import { Atom } from '../atom';


function enhancer( value ) {
	if ( isObservable( value ) ) return value;
	if ( isPrimitive( value ) ) return value;

	if ( isArray( value ) ) return observableArrayProxyFabric( value );
	if ( isPureObject( value ) ) return observableObjectProxyFactory( value );
	
	return value;
}

/** Клаcc представляющий собой наблюдаемое значение. */
export class ObservableValue extends Atom {
	constructor( value ) {
		this._observers = new Set();
		this._value = enhancer( value );

		this[ $$observable ] = true;
	}

	/**
	 * Метод возвращает значение и, если есть глобальный слушатель, то регистрирует его.
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
	 * Метод устанавливает новое значение и уведомляет слушателей.
	 * @param value - значение для установки.
	 */
	set( newValue ) {
		this._value = enhancer( newValue );
		this._notify();
	}

}
