import { globalState } from './GlobalState';


export function autorun(callback) {
	const prevTrackingDerivation = globalState.trackingDerivation;

	globalState.trackingDerivation = callback;
	callback();
	globalState.trackingDerivation = prevTrackingDerivation;
}
