/**
 * Класс глобального состояния.
 */
class GlobalState {
	/** Переменная для записи реакции (слушателя). */
	trackingDerivation = null;
}

export const globalState = new GlobalState();
