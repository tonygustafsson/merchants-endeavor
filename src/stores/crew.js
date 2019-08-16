import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'crew';
const initValue = {
    members: 4,
    health: 100,
    mood: 100
};
const minValue = 0;
const maxValue = 20;

const crewStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        addCrewMembers: additionalCrewMembers => {
            update(crew => {
                if (crew.members + additionalCrewMembers > maxValue) return crew;
                return { ...crew, members: crew.members + additionalCrewMembers };
            });
        },
        removeCrewMembers: removedCrewMembers => {
            update(crew => {
                if (crew.members - removedCrewMembers < minValue) return crew;
                return { ...crew, members: crew.members - removedCrewMembers };
            });
        }
    };
};

export const crew = crewStore();

getStateFromDb(tableName)
    .then(value => {
        crew.updateAll(value);
    })
    .catch(err => {
        crew.updateAll(initValue);
    })
    .finally(() => {
        crew.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
