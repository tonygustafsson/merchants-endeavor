import { writable } from 'svelte/store';
import { ticker } from './ticker';
import { syncState } from '../utils/stateSync';
import { weathers, weatherChangeability } from '../constants/game';

const getRandomWeather = () => {
	return weathers[Math.floor(Math.random() * weathers.length)];
};

const initValue = getRandomWeather();

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

syncState('weather', weather, initValue).then(value => weather.updateAll(value));

// Update the weather and follow the ticker
ticker.subscribe(_ => {
	if (Math.random() < weatherChangeability) {
		weather.changeWeather();
	}
});
