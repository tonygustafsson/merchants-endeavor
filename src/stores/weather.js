import { readable, writable } from 'svelte/store';
import { ticker } from './ticker.js';
import { syncState } from '../utils/stateSync';

const initValue = 5;
const max = 5;
const changeability = 0.02;

const getRandomWeather = () => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
};

const weatherStore = () => {
    const { subscribe, set } = writable(initValue);

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        changeWeather: () => {
            const newWeather = getRandomWeather();
            set(newWeather);
        }
    };
};

export const weather = weatherStore();

syncState('weather', weather, initValue);

// Update the weather and follow the ticker
ticker.subscribe(value => {
    if (Math.random() < changeability) {
        weather.changeWeather();
    }
});
