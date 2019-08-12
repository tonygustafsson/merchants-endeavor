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

function crewStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            update(crew => data);
        },
        addCrewMembers: additionalCrewMembers => {
            update(crew => {
                if (crew.members + additionalCrewMembers > maxValue) return crew;

                crew.members += additionalCrewMembers;
                return crew;
            });
        },
        removeCrewMembers: removedCrewMembers => {
            update(crew => {
                if (crew.members - removedCrewMembers < minValue) return crew;

                crew.members -= removedCrewMembers;
                return crew;
            });
        }
    };
}

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
