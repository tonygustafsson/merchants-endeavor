import { readable, writable } from 'svelte/store';
import { ticker } from './ticker.js';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'weather';
const max = 5;
const changeability = 0.1;

const getRandomWeather = () => {
    return Math.floor(Math.random() * Math.floor(max));
};

const weatherStore = () => {
    const { subscribe, set } = writable(5);

    return {
        subscribe,
        changeWeather: () => {
            const newWeather = getRandomWeather();
            set(newWeather);
        }
    };
};

export const weather = weatherStore();

getStateFromDb(tableName)
    .then(value => {
        weather.changeWeather(value);
    })
    .catch(err => {
        weather.changeWeather(getRandomWeather());
    })
    .finally(() => {
        weather.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });

// Update the weather and follow the ticker
ticker.subscribe(value => {
    if (Math.random() < changeability) {
        weather.changeWeather();
    }
});
