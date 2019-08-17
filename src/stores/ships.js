import { writable } from 'svelte/store';
import { ticker } from './ticker';
import { goods } from './goods';
import { merchant } from './merchant';
import { getRandomShip } from '../utils/ship';
import { getStateFromDb, saveStateToDb } from '../utils/db';

let currentTick = 0;
const missionLength = 10;

const tableName = 'ships';
const minValue = 0;
const maxValue = 10;

const shipsStore = () => {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        addShip: newShip => {
            update(ships => {
                if (ships.length + 1 > maxValue) return ships;

                let newShips = [...ships];
                newShips.push(newShip);

                return newShips;
            });
        },
        removeShip: id => {
            update(ships => {
                if (ships.length - 1 < minValue) return ships;

                let newShips = [...ships];
                newShips = newShips.filter(ship => ship.id !== id);

                return newShips;
            });
        },
        setName: (id, newName) => {
            update(ships => {
                let newShips = [...ships];

                let ship = newShips.find(ship => ship.id === id);
                ship.name = newName;

                return newShips;
            });
        },
        sendOnMission: id => {
            update(ships => {
                let newShips = [...ships];

                let ship = newShips.find(ship => ship.id === id);
                ship.onMission = currentTick + missionLength;

                return newShips;
            });
        },
        checkMissions: () => {
            update(ships => {
                if (ships.length < 1) return [...ships];

                let newShips = [...ships];

                newShips.map(ship => {
                    if (ship.onMission !== false && ship.onMission < currentTick) {
                        // Back from mission
                        ship.onMission = false;
                        merchant.addDoubloons(1000);
                    }
                });

                return newShips;
            });
        }
    };
};

export const ships = shipsStore();

getStateFromDb(tableName)
    .then(value => {
        ships.updateAll(value);
    })
    .catch(err => {
        getRandomShip('brig').then(newShip => {
            ships.updateAll([newShip]);
        });
    })
    .finally(() => {
        ships.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });

ticker.subscribe(value => {
    currentTick = value;
    ships.checkMissions();
});
