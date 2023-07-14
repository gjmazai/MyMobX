import { ObservableObject } from "./ObservableObject";

import { $$observableAdmin } from "../constants";


/**
 * Функция, которая создает прокси наблюдаемого объекта.
 * @param target - наблюдаемый объект.
 * @returns созданный прокси объект.
 */
export function observableObjectProxyFactory( target ) {
	Object.defineProperty( target, $$observableAdmin, {
   		enumerable: false,
   		configurable: false,
   		writable: false,
   		value: new ObservableObject( target )
 	});

	return new Proxy( target, {
   		get( ...args ) {
   		  return target[ $$observableAdmin ].get( ...args );
   		},
   		set(...args) {
   		  return target[ $$observableAdmin ].set( ...args );
   		}
 	});
}