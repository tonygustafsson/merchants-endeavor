import { Writable, writable } from 'svelte/store';
import { syncState } from '../utils/stateSync';
import { tickerSpeed } from './tickerSpeed';
import { normalTickerSpeed } from '../constants/time';
import type { Ticker } from '../types/ticker';

const initValue: Ticker = 0;

const tickerStore = () => {
	const { subscribe, set, update }: Writable<Ticker> = writable(initValue);

	let tickerInterval;

	const setTickerInterval = (speed = normalTickerSpeed) => {
		tickerInterval = setInterval(() => {
			update(tick => tick + 1);
		}, speed);
	};

	return {
		subscribe,
		updateAll: (newTick: number) => {
			set(newTick);
		},
		updateSpeed: (speed: number) => {
			clearInterval(tickerInterval);

			if (speed < 1) {
				return;
			}

			setTickerInterval(speed);
		}
	};
};

export const ticker = tickerStore();

syncState('ticker', ticker, initValue).then(state => ticker.updateAll(state));

tickerSpeed.subscribe(value => {
	ticker.updateSpeed(value);
});
