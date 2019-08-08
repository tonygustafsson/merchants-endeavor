import { writable } from 'svelte/store';

const tickerSpeed = 1000;

function createTicker() {
    const { subscribe, update } = writable(0);

    setInterval(() => {
        update(n => n + 1);
    }, tickerSpeed);

    return {
        subscribe
    };
}

export const ticker = createTicker();
