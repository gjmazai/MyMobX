import { ObservableValue } from "./ObservableValue";
import { isFunction } from "./utils";


/**
 * @description Класс представляющий контейнер для наблюдаемых значений ObservableValues.
 */
export class ObservableObject {
 constructor( target ) {
   this._target = target;

   /**
    * создаем объект значений, это копия объекта,
    * приходящего извне, только все значения обернуты в ObservableValue
    */
   this._values = Object.fromEntries( Object.entries( target ).map(([ key, value ]) => 
												[ key, new ObservableValue( value ) ]));

 }

/**
 * @description Метод, который возвращает значение из ObservableValue.
 * @param target - наблюдаемый объект.
 * @param property - свойство этого объекта.
 * @returns возвращаемое значение из наблюдаемого объекта.
 */
 get( target, property ) {
   if ( !this._hasProperty( property ) ) return;
   /* если функция, то просто возвращаем функцию */
   if ( isFunction( target[ property ] ) ) return target[ property ];

   return this._values[ property ].get();
 }

/**
 * @description Метод, который устанавливает значения для ObservableValue и для внешнего объекта.
 * @param target - наблюдаемый объект.
 * @param property - свойство этого объекта.
 * @param value - значение для установки.
 * @returns true в случае успешной установки значения.
 */
 set( target, property, value ) {
   if ( this._hasProperty( property )) {
     /* если значение есть, то это observableValue и вызываем у нее метод set*/
     this._values[ property ].set( value );
     return true;
   }

   if (isFunction( target[ property ] )) {
     /* если функция, то просто устанавливаем функцию */
     target[ property ] = value;
     return true;
   }
   /* значения нет, создаем новое и оборачиваем в ObservableValue*/
   this._values[ property ] = new ObservableValue( value );
   target[ property ] = value;

   return true;
 }

 /**
  * @description Метод проверяет содержиться ли свойство в наблюдаемом объекте. 
  * @param property - свойство для проверки. 
  * @returns true если свойство содержиться.
  */
 _hasProperty( property ) {
   return property in this._target;
 }
}