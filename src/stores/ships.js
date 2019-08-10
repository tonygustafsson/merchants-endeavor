import { writable } from 'svelte/store';
import { ticker } from './ticker';
import { goods } from './goods';
import { getValue, setValue } from '../utils/persistantState';
import { getRandomShip } from '../utils/ship';

let currentTick = 0;
const missionLength = 10;

const persistantStoreName = 'ships';
const initValue = [getRandomShip()];
const minValue = 0;
const maxValue = 10;

function shipsStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        addShip: () => {
            update(n => {
                if (n.length + 1 > maxValue) return n;

                const newShip = getRandomShip();
                n.push(newShip);

                setValue(persistantStoreName, n);

                return n;
            });
        },
        removeShip: id => {
            update(n => {
                if (n.length - 1 < minValue) return n;
                n = n.filter(ship => ship.id !== id);

                setValue(persistantStoreName, n);

                return n;
            });
        },
        sendOnMission: id => {
            update(n => {
                let ship = n.find(ship => ship.id === id);
                ship.onMission = currentTick + missionLength;

                setValue(persistantStoreName, n);

                return n;
            });
        },
        checkMissions: () => {
            update(n => {
                n.map(ship => {
                    if (ship.onMission !== false && ship.onMission < currentTick) {
                        // Back from mission
                        ship.onMission = false;
                        goods.add('doubloons', 100);
                        setValue(persistantStoreName, n);
                    }
                });

                return n;
            });
        }
    };
}

export const ships = shipsStore();

ticker.subscribe(value => {
    currentTick = value;
    ships.checkMissions();
});
