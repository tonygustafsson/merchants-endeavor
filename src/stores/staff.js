import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'staff';
const initValue = {
    members: 4,
    health: 100,
    mood: 100
};
const minValue = 0;
const maxValue = 20;

const staffStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        add: additionalStaff => {
            update(staff => {
                if (staff.members + additionalStaff > maxValue) return { ...staff };
                return { ...staff, members: staff.members + additionalStaff };
            });
        },
        remove: removedStaff => {
            update(staff => {
                if (staff.members - removedStaff < minValue) return { ...staff };
                return { ...staff, members: staff.members - removedStaff };
            });
        },
        increaseMood: moodBoost => {
            update(staff => {
                if (staff.mood < 0) return { ...staff };
                return { ...staff, mood: staff.mood + moodBoost };
            });
        },
        decreaseMood: moodLoss => {
            update(staff => {
                if (staff.mood < 0) return { ...staff };
                return { ...staff, mood: staff.mood - moodLoss };
            });
        },
        increaseHealth: healthBoost => {
            update(staff => {
                if (staff.health < 0) return { ...staff };
                return { ...staff, health: staff.health + healthBoost };
            });
        },
        decreaseHealth: healthLoss => {
            update(staff => {
                if (staff.health < 0) return { ...staff };
                return { ...staff, health: staff.health - healthLoss };
            });
        }
    };
};

export const staff = staffStore();

getStateFromDb(tableName)
    .then(value => {
        staff.updateAll(value);
    })
    .catch(err => {
        staff.updateAll(initValue);
    })
    .finally(() => {
        staff.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
