import { ObservableObject } from "./observableObject";
import { $$observableAdmin } from "./constants";


/**
 * @description Функция, которая создает прокси.
 * @param target - наблюдаемый объект.
 * @returns созданный прокси объект.
 */
function observableObjectFactory( target ) {
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