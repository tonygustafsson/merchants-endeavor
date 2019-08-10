import { writable } from 'svelte/store';
import { getValue, setValue } from '../utils/persistantState';

const persistantStoreName = 'crew';
const initValue = {
    members: 4,
    health: 100,
    mood: 100
};
const minValue = 0;
const maxValue = 20;

function crewStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        addCrewMembers: additionalCrewMembers => {
            update(n => {
                if (n.members + additionalCrewMembers > maxValue) return n;

                n.members += additionalCrewMembers;
                setValue(persistantStoreName, n);
                return n;
            });
        },
        removeCrewMembers: removedCrewMembers => {
            update(n => {
                if (n.members - removedCrewMembers < minValue) return n;

                n.members -= removedCrewMembers;
                setValue(persistantStoreName, n);
                return n;
            });
        }
    };
}

export const crew = crewStore();
