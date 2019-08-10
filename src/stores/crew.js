import { writable } from 'svelte/store';
import { getValue, setValue } from '../utils/persistantState';

const persistantStoreName = 'crew';
const initValue = 4;
const minValue = 0;
const maxValue = 20;

function crewStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        addCrewMembers: additionalCrewMembers => {
            update(n => {
                let newValue = n + additionalCrewMembers <= maxValue ? n + additionalCrewMembers : maxValue;
                setValue(persistantStoreName, newValue);
                return newValue;
            });
        },
        removeCrewMembers: removedCrewMembers => {
            update(n => {
                let newValue = n - removedCrewMembers > minValue ? n - removedCrewMembers : minValue;
                setValue(persistantStoreName, newValue);
                return newValue;
            });
        }
    };
}

export const crew = crewStore();
