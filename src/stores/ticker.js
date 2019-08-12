import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { tickerSpeed } from './tickerSpeed';

const tableName = 'tick';
const defaultTickerSpeed = 1000;

const tickerStore = speed => {
    const { subscribe, update } = writable(0);

    let counter = 0;
    let tickerInterval;

    const setTickerInterval = speed => {
        counter = 0;

        tickerInterval = setInterval(() => {
            update(tick => {
                if (counter === 10) {
                    // Save ticker every tenth second to localStorage
                    counter = 0;
                }

                return tick + 1;
            });

            counter++;
        }, speed);
    };

    setTickerInterval(speed);

    return {
        subscribe,
        setTick: newTick => {
            update(tick => newTick);
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
        ticker.setTick(0);
    })
    .finally(() => {
        ticker.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });

tickerSpeed.subscribe(value => {
    ticker.updateSpeed(value);
});
