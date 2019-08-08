import { readable, writable } from 'svelte/store';
import { ticker } from './ticker.js';

const max = 5;
const changeability = 0.5;

const getRandomWeather = () => {
    return Math.floor(Math.random() * Math.floor(max));
};

const startWeather = getRandomWeather();

const createWeather = () => {
    const { subscribe, set } = writable(startWeather);

    return {
        subscribe,
        changeWeather: () => {
            set(getRandomWeather());
        }
    };
};

export const weather = createWeather();

ticker.subscribe(value => {
    if (Math.random() < changeability) {
        weather.changeWeather();
    }
});
