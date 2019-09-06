import { writable, get } from 'svelte/store';
import { time } from './time.js';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'logs';
const initValue = [];

const maxItems = 50;
let currentTime;
let currentRealTime;

time.subscribe(value => {
    currentTime = value.now;
    currentRealTime = value.realTime;
});

const logStore = () => {
    const { subscribe, set, update } = writable(initValue);

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        add: entry => {
            update(logs => {
                const newLogs = [...logs];
                const item = {
                    time: currentTime,
                    realTime: currentRealTime,
                    entry: entry
                };
                newLogs.unshift(item);

                if (newLogs.length > maxItems) {
                    newLogs.pop();
                }

                return newLogs;
            });
        }
    };
};

export const log = logStore();

getStateFromDb(tableName)
    .then(value => {
        log.updateAll(value);
    })
    .catch(err => {
        log.updateAll(initValue);
    })
    .finally(() => {
        log.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
