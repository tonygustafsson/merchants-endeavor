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

export const syncState = (tableName, store, initValue, initValueAdder) => {
    return new Promise((resolve, reject) => {
        getStateFromDb(tableName)
            .then(value => {
                if (typeof value === 'object') {
                    value = cloneDeep(Object.assign(initValue, value));
                }

                store.updateAll(value);
            })
            .catch(err => {
                if (initValueAdder) {
                    const initValueExtras = initValueAdder();

                    Promise.resolve(initValueExtras).then(extras => {
                        // Resolves the extra data, add it to initValue and update store
                        initValue = Object.assign(initValue, extras);
                        store.updateAll(initValue);
                    });
                } else {
                    store.updateAll(initValue);
                }
            })
            .finally(() => {
                store.subscribe(value => {
                    saveStateToDb(tableName, value);
                    resolve(get(store));
                });
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
