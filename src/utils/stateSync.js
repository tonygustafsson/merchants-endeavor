import { get } from 'svelte/store';
import localforage from 'localforage';
import cloneDeep from 'lodash-es/cloneDeep';

localforage.config({
    name: `Merchant's Endeavor`,
    storeName: 'game'
});

const saveStateToDb = (table, state) => {
    localforage.setItem(table, state);
};

const getStateFromDb = table => {
    return new Promise((resolve, reject) => {
        localforage
            .getItem(table)
            .then(value => {
                if (value) {
                    resolve(value);
                }

                reject('Not stored');
            })
            .catch(err => {
                reject(err);
            });
    });
};

const mixDefaultValueWithState = (defaultValue, stateValue) => {
    // Adds state values to the default one, can add new defaultValues if state is missing them
    if (typeof defaultValue === 'object') {
        return Object.assign(defaultValue, stateValue);
    }

    return stateValue;
};

const calcDefaultValues = (defaultValueAdder, defaultValue) => {
    // Sometimes the default values has to be calculated first time, but not if state exists
    if (defaultValueAdder && typeof defaultValueAdder === 'function') {
        return Promise.resolve(defaultValueAdder()).then(extras => {
            // Resolves the extra data, add it to defaultValue and update store
            return mixDefaultValueWithState(defaultValue, extras);
        });
    }

    return defaultValue;
};

export const syncState = (tableName, store, defaultValue, defaultValueAdder) => {
    return new Promise((resolve, reject) => {
        getStateFromDb(tableName)
            .then(stateValue => {
                // Got state from localForage
                return mixDefaultValueWithState(defaultValue, stateValue);
            })
            .catch(err => {
                // No state saved, calculate new state
                return calcDefaultValues(defaultValueAdder, defaultValue);
            })
            .then(state => {
                // Create subscriber that saves state to DB
                store.subscribe(value => {
                    saveStateToDb(tableName, value);
                });

                resolve(cloneDeep(state));
            });
    });
};

export const clearDatabase = () => {
    return new Promise((resolve, reject) => {
        localforage
            .clear()
            .then(() => {
                resolve(console.log('Cleared database'));
            })
            .catch(err => {
                reject(console.error(err));
            });
    });
};
