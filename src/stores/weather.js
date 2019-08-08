import { readable, writable } from 'svelte/store';
import { ticker } from './ticker.js';
import { getValue, setValue } from '../persistantState';

const max = 5;
const changeability = 0.1;

const getRandomWeather = () => {
    return Math.floor(Math.random() * Math.floor(max));
};

// Get initial weather from local storage if available
const startWeather = getValue('weather', getRandomWeather());

const createWeather = () => {
    const { subscribe, set } = writable(startWeather);

    return {
        subscribe,
        changeWeather: () => {
            const newWeather = getRandomWeather();

            set(newWeather);
            setValue('weather', newWeather);
        }
    };
};

export const weather = createWeather();

// Update the weather and follow the ticker
ticker.subscribe(value => {
    if (Math.random() < changeability) {
        weather.changeWeather();
    }
});
