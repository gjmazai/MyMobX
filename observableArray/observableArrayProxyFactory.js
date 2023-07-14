import { $$observableAdmin } from "../constants";

/** 
 * Имплементация методов массива.
 * @description Объект адаптер для работы с наблюдаемыми массивами.
 */
const arrayMethods = {
	/**
	 * Метод переопределяет метод push для наблюдаемых массивов.
	 * @param items - элементы массива для вставки.
	 * @returns длина массива со вставленными элементами.
	 */
	push( ...items ) {
		const itenalReactiveInstance = this[ $$observableAdmin ];
		itenalReactiveInstance.spliceWithArray( itenalReactiveInstance.getValues().length, 0, ...items );
		return itenalReactiveInstance.getValues().length;
	}
}

/** Класс представляющий Proxy ловушки для массивов. */
export class ArrayHandlers {
	get( target, property, _ ) {
		const arrayMethods = arrayMethods[ property ];
		if( arrayMethods ) return arrayMethods.bind( target );

		return target[ $$observableAdmin ].get( target, property );
	}

	set( target, property, set ) {
		const reactiveField = this[ $$observableAdmin ];

		if( property === 'length' ) return reactiveField.setLength( value );

		return reactiveField.set( target, property, set );
	}
}

/**
 * Функция возвращает прокси наблюдаемого массива.
 * @param target - наблюдаемый массив.
 * @returns прокси наблюдаемого массива.
 */
function delegateProxy( target ) {
	return new Proxy( target, new ArrayHandlers() );
}

/**
 * Функция представляет фабрику прокси для наблюдаемых массив.
 * @param target - наблюдаемый массив.
 * @returns прокси наблюдаемого объекта.
 */
export function observableArrayProxyFabric ( target ) {
	Object.defineProperties( target, $$observableAdmin, {
		enumerable: false,
   		configurable: false,
   		writable: false,
   		value: new ObservableArray( target ),
	});

	return delegateProxy( target );
}