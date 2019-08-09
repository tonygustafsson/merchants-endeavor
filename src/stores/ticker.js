import { writable } from 'svelte/store';
import { getValue, setValue } from '../persistantState';
import { tickerSpeed } from './tickerSpeed';

const defaultTickerSpeed = 1000;
const startTick = getValue('tick', 0);

const createTicker = speed => {
    const { subscribe, update } = writable(startTick);

    let counter = 0;
    let tickerInterval;

    const setTickerInterval = speed => {
        counter = 0;

        tickerInterval = setInterval(() => {
            update(n => {
                let newValue = n + 1;

                if (counter === 10) {
                    // Save ticker every tenth second to localStorage
                    setValue('tick', newValue);
                    counter = 0;
                }

                return newValue;
            });

            counter++;
        }, speed);
    };

    setTickerInterval(speed);

    return {
        subscribe,
        updateSpeed: speed => {
            clearInterval(tickerInterval);

            if (speed < 1) {
                return;
            }

            setTickerInterval(speed);
        }
    };
};

export let ticker = createTicker(defaultTickerSpeed);

tickerSpeed.subscribe(value => {
    ticker.updateSpeed(value);
});
