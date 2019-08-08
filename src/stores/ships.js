import { writable } from 'svelte/store';
import { getValue, setValue } from '../persistantStorage';

const persistantStoreName = 'ships';
const initValue = 1;
const minValue = 0;
const maxValue = 10;

function shipsStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        addShips: additionalShips => {
            update(n => {
                let newValue = n + additionalShips <= maxValue ? n + additionalShips : maxValue;
                setValue(persistantStoreName, newValue);
                return newValue;
            });
        },
        removeShips: removedShips => {
            update(n => {
                let newValue = n - removedShips > minValue ? n - removedShips : minValue;
                setValue(persistantStoreName, newValue);
                return newValue;
            });
        }
    };
}

export const ships = shipsStore();
