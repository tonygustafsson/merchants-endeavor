import { writable } from 'svelte/store';

const defaultTickerSpeed = 1000;

const tickerSpeedStore = () => {
    const { subscribe, set, update } = writable(defaultTickerSpeed);

    return {
        subscribe,
        pause: () => {
            set(0);
        },
        normal: () => {
            set(1000);
        },
        fast: () => {
            set(300);
        },
        rapid: () => {
            set(100);
        }
    };
};

export const tickerSpeed = tickerSpeedStore();
