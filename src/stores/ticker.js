import { writable } from 'svelte/store';
import { syncState } from '../utils/stateSync';
import { tickerSpeed } from './tickerSpeed';

const initValue = 0;
const defaultTickerSpeed = 1000;

const tickerStore = speed => {
    const { subscribe, set, update } = writable(initValue);

    let tickerInterval;

    const setTickerInterval = speed => {
        tickerInterval = setInterval(() => {
            update(tick => tick + 1);
        }, speed);
    };

    return {
        subscribe,
        updateAll: newTick => {
            set(newTick);
        },
        updateSpeed: speed => {
            clearInterval(tickerInterval);

            if (speed < 1) {
                return;
            }

            setTickerInterval(speed);
        }
    };
};

export const ticker = tickerStore(defaultTickerSpeed);

syncState('ticker', ticker, initValue);

tickerSpeed.subscribe(value => {
    ticker.updateSpeed(value);
});
