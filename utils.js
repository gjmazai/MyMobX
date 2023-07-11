import { $$observable, $$observableAdmin } from "./constants";


/**
 * @description Функция проверяет, является ли значение наблюдаемым. 
 * @param arg - значение над которым происходит проверка.
 * @returns true если значение является наблюдаемым.
 */
export function isObservable(arg) {
  if (arg) return $$observable in arg;

  return false;
}

/**
 * @description Функция проверяет, предалежит ли объект/значение к определенному типу
 * @param Ctor - тип.
 * @param val - объект/значение.
 * @returns true если пренадлежит.
 */
export function is(Ctor, val) {
  return (val != null && val.constructor === Ctor) || val instanceof Ctor;
}

/**
 * @description Функция проверяет, является ли значение является функцией. 
 * @param arg - значение над которым происходит проверка. 
 * @returns true - если пренадлежит.
 */
export function isFunction(arg) {
  return is(Function, arg);
}

/**
 * @description Функция проверяет, является ли значение является массивом. 
 * @param arg - значение над которым происходит проверка. 
 * @returns true - если пренадлежит.
 */
export function isArray(arg) {
  return is(Array, arg);
}

/**
 * @description Функция проверяет, является ли значение является пустым объектом. 
 * @param arg - значение над которым происходит проверка. 
 * @returns true - если пренадлежит.
 */
export function isPureObject(arg) {
  return is(Object, arg) && !Array.isArray(arg);
}

/**
 * @description Функция проверяет, является ли значение является примитивом. 
 * @param arg - значение над которым происходит проверка. 
 * @returns true - если пренадлежит.
 */
export function isPrimitive(arg) {
  return !isPureObject(arg) && !isFunction(arg) && !isArray(arg);
}
