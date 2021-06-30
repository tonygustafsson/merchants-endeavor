import { Writable, writable } from 'svelte/store';
import {
	pauseTickerSpeed,
	normalTickerSpeed,
	fastTickerSpeed,
	rapidTickerSpeed
} from '../constants/time';
import type { TickerSpeed } from '../types/tickerSpeed';

const tickerSpeedStore = () => {
	const { subscribe, set }: Writable<TickerSpeed> = writable(normalTickerSpeed);

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
