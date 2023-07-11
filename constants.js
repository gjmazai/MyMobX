/** Ключ для идентификации наблюдаемых значений, нужен для проверок, являеется ли значение наблюдаемым. */
export const $$observable = Symbol('observable');

/** Ключ, в котором хранится класс реализующий логику наблюдаемых значений. */
export const $$observableAdmin  = Symbol('observableAdmin');