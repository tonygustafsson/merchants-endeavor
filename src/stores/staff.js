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
        addStaff: additionalStaff => {
            update(staff => {
                if (staff.members + additionalStaff > maxValue) return staff;
                return { ...staff, members: staff.members + additionalStaff };
            });
        },
        removeStaff: removedStaff => {
            update(staff => {
                if (staff.members - removedStaff < minValue) return staff;
                return { ...staff, members: staff.members - removedStaff };
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
