import { writable } from 'svelte/store';
import { getValue, setValue } from '../persistantState';

const tickerSpeed = 1000;
const startTick = getValue('tick', 0);

function createTicker() {
    const { subscribe, update } = writable(startTick);

    let counter = 0;

    setInterval(() => {
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
    }, tickerSpeed);

    return {
        subscribe
    };
}

export const ticker = createTicker();
