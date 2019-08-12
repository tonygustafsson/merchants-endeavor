import { writable } from 'svelte/store';

const defaultTickerSpeed = 1000;

const tickerSpeedStore = () => {
    const { subscribe, update } = writable(defaultTickerSpeed);

    return {
        subscribe,
        pause: () => {
            update(n => 0);
        },
        normal: () => {
            update(n => 1000);
        },
        fast: () => {
            update(n => 300);
        },
        rapid: () => {
            update(n => 100);
        }
    };
};

export const tickerSpeed = tickerSpeedStore();
