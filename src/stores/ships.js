import { writable, derived, get } from 'svelte/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { ticker } from './ticker';
import { goods } from './goods';
import { merchant } from './merchant';
import { staff } from './staff';
import { log } from './log';
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
                if (ships.length + 1 > maxValue) return cloneDeep(ships);

                let newShips = cloneDeep(ships);
                newShips.push(newShip);

                return newShips;
            });
        },
        removeShip: id => {
            update(ships => {
                if (ships.length - 1 < minValue) return cloneDeep(ships);

                let newShips = cloneDeep(ships);
                newShips = newShips.filter(ship => ship.id !== id);

                return newShips;
            });
        },
        setName: (id, newName) => {
            update(ships => {
                let newShips = cloneDeep(ships);

                let ship = newShips.find(ship => ship.id === id);
                ship.name = newName;

                return newShips;
            });
        },
        changeItemsOnboard: (id, item, value) => {
            const approvedItems = ['crewMembers', 'food', 'water', 'cannons'];
            if (!approvedItems.includes(item)) return;

            update(ships => {
                let newShips = cloneDeep(ships);

                let ship = newShips.find(ship => ship.id === id);
                ship[item] = value;

                return newShips;
            });
        },
        sendOnMission: id => {
            update(ships => {
                let newShips = cloneDeep(ships);

                let ship = newShips.find(ship => ship.id === id);
                ship.onMission = currentTick + missionLength;

                log.add(`You sent your ${ship.type} ${ship.name} on a mission.`);

                return newShips;
            });
        },
        checkMissions: () => {
            update(ships => {
                if (ships.length < 1) return cloneDeep(ships);

                let newShips = cloneDeep(ships);

                newShips.map(ship => {
                    if (ship.onMission !== false && ship.onMission < currentTick) {
                        // Back from mission
                        ship.onMission = false;

                        // Get rewards
                        const doubloons = Math.floor(Math.random() * 1000);
                        const shipFood = ship.food - ship.crewMembers * 4;
                        const shipWater = ship.water - ship.crewMembers * 8;
                        const shipHealth = ship.health - Math.floor(Math.random() * 25);
                        const staffMoodLoss = Math.floor(Math.random() * 15);
                        const staffHealthLoss = Math.floor(Math.random() * 15);

                        merchant.addDoubloons(doubloons);
                        staff.decreaseMood(staffMoodLoss);
                        staff.decreaseHealth(staffHealthLoss);

                        ship.food = shipFood;
                        ship.water = shipWater;
                        ship.health = shipHealth;

                        log.add(
                            `Your ${ship.type} ${ship.name} returned from her mission. You collected ${doubloons} dbl.`
                        );
                    }
                });

                return newShips;
            });
        }
    };
};

export const ships = shipsStore();

export const shipTotals = derived(ships, $ships => {
    return {
        crewMembers: $ships.reduce((sum, ship) => (sum += ship.crewMembers), 0),
        cannons: $ships.reduce((sum, ship) => (sum += ship.cannons), 0),
        doubloons: $ships.reduce((sum, ship) => (sum += ship.doubloons), 0),
        food: $ships.reduce((sum, ship) => (sum += ship.food), 0),
        water: $ships.reduce((sum, ship) => (sum += ship.water), 0),
        spices: 0,
        porcelain: 0,
        tobacco: 0,
        rum: 0
    };
});

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

let checkMissionsCounter = 0;

ticker.subscribe(value => {
    checkMissionsCounter++;

    if (checkMissionsCounter >= 20) {
        // Dont' check to often
        currentTick = value;
        ships.checkMissions();
        checkMissionsCounter = 0;
    }
});
