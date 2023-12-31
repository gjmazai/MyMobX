import { isObservable, isPrimitive } from "../utils";
import { $$observable } from "../constants";
import { ObservableValue } from "../observableValue";
import { Atom } from "../atom";


function arrayEnhancer( items ) {
 return items.map(( targetElement ) => {
    if ( isPrimitive( targetElement ) ) return targetElement;
    return new ObservableValue( targetElement );
 });
}

/** Класс представляет описание наблюдаемого массива. */
export class ObservableArray extends Atom {
  constructor( target ) {
    this._observers = new Set()

    this[ $$observable ] = true;

    this._target = target;

    this._values = arrayEnhancer( target );
  }

  /**
   * Отдает значение и, если есть глобальный слушатель, то регистрирует его.
   * @param target - массив.
   * @param property - значение массива ( слушатель ).  
   */
  get( target, property ) {
    if ( globalState.trackingDerivation ) {       
      this.observe( globalState.trackingDerivation ); 
    }
  
    const observableValue = this._getValue( property );
    if ( isObservable( observableValue )) return observableValue.get();
    return observableValue;
  }

  /**
  * Метод устанавливает значения по индексу.
  * @param target - массив для установки значений.
  * @param index - индекс для вставки.
  * @param value - значение для установки.
  */
  set( target, index, value ) {
    this.spliceWithArray( index, 0, value );
    return true;
  }

  /**
   * Метод возвращает значение по индексу из внутреннего объекта значений.
   * @param index - индекс по которому возвращается значение.
   * @returns значение из массива.
   */
  _getValue( index ) {
    return this._values[ index ];
  }

  /**
  * Метод оборачивает значения в observable и добавляет их в массив
  * за один раз, так как нативные методы массива могут вызывать геттеры и сеттеры несколько раз,
  * что будет провоцировать лишние вызовы слушателей.
  * @param start - стартовый индекс.
  * @param deleteCount - кол-во удаленных элементов.
  * @param items - значение для установки.
  * @returns новый массив с добавленными элементами.
  */
  spliceWithArray( start, deleteCount, ...items ) {
    this._values.splice( start, deleteCount || 0, ...arrayEnhancer( items ) );
    const splicesValues = this._target.splice( start, deleteCount || 0, ...items );
    this._notify();
    return splicesValues;
  }

  /**
  * Метод устанавливает длину массива и уведомляем слушателей.
  * @param newLength - новая длинна массива.
  */
  setLength( newLength ) {
   const isValuesSetSuccess = Reflect.set( this._values, "length", newLength );
   const isTargetSetSuccess = Reflect.set( this._target, "length", newLength );

   this._notify();

   return isValuesSetSuccess && isTargetSetSuccess;
  }

  /**
  * Метод возвращает наблюдаемый массив.
  * @returns наблюдамый массив.
  */
  getValues() {
    return this._values;
  }
  
}