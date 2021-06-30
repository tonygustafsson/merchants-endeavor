import { writable } from 'svelte/store';
import {
	pauseTickerSpeed,
	normalTickerSpeed,
	fastTickerSpeed,
	rapidTickerSpeed
} from '../constants/time';

const tickerSpeedStore = () => {
	const { subscribe, set } = writable(normalTickerSpeed);

	return {
		subscribe,
		pause: () => {
			set(pauseTickerSpeed);
		},
		normal: () => {
			set(normalTickerSpeed);
		},
		fast: () => {
			set(fastTickerSpeed);
		},
		rapid: () => {
			set(rapidTickerSpeed);
		}
	};
};

export const tickerSpeed = tickerSpeedStore();
