import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { tickerSpeed } from './tickerSpeed';

const tableName = 'tick';
const defaultTickerSpeed = 1000;

const tickerStore = speed => {
    const { subscribe, set, update } = writable(0);

    let tickerInterval;

    const setTickerInterval = speed => {
        tickerInterval = setInterval(() => {
            update(tick => tick + 1);
        }, speed);
    };

    setTickerInterval(speed);

    return {
        subscribe,
        setTick: newTick => {
            set(newTick);
        },
        updateSpeed: speed => {
            clearInterval(tickerInterval);

            if (speed < 1) {
                return;
            }

            setTickerInterval(speed);
        }
    };
};

export const ticker = tickerStore(defaultTickerSpeed);

getStateFromDb(tableName)
    .then(value => {
        ticker.setTick(value);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        ticker.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });

tickerSpeed.subscribe(value => {
    ticker.updateSpeed(value);
});
