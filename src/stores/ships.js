import { writable, derived, get } from 'svelte/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { ticker } from './ticker';
import { goods } from './goods';
import { merchant } from './merchant';
import { staff } from './staff';
import { log } from './log';
import { getRandomShip } from '../utils/ship';
import { syncState } from '../utils/stateSync';

const missionLength = 10;
const initValue = [];
const minValue = 0;
const maxValue = 10;

const shipsStore = () => {
    const { subscribe, set, update } = writable(initValue);

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
            const approvedItems = ['crewMembers', 'cannons'];
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

                const $ticker = get(ticker);

                let ship = newShips.find(ship => ship.id === id);
                ship.onMission = $ticker + missionLength;

                return newShips;
            });
        },
        checkMissions: () => {
            update(ships => {
                if (ships.length < 1) return cloneDeep(ships);

                let newShips = cloneDeep(ships);

                newShips.map(ship => {
                    const $ticker = get(ticker);

                    if (ship.onMission !== false && ship.onMission < $ticker) {
                        // Back from mission
                        ship.onMission = false;

                        // Get rewards
                        const doubloons = Math.floor(Math.random() * 1000);
                        const shipHealth = ship.health - Math.floor(Math.random() * 25);
                        const staffMoodLoss = Math.floor(Math.random() * 15);
                        const staffHealthLoss = Math.floor(Math.random() * 15);

                        let logMsg = `Your ${ship.type} ${ship.name} returned from her mission. You collected ${doubloons} dbl.`;

                        merchant.addDoubloons(doubloons);

                        if (Math.random() < 0.5) {
                            const food = Math.floor(Math.random() * 40);
                            goods.add('food', food);
                            logMsg += ` ${food} cartons of food.`;
                        }
                        if (Math.random() < 0.5) {
                            const water = Math.floor(Math.random() * 80);
                            goods.add('water', water);
                            logMsg += ` ${water} barrels of water.`;
                        }
                        if (Math.random() < 0.2) {
                            const spices = Math.floor(Math.random() * 10);
                            goods.add('spices', spices);
                            logMsg += ` ${spices} cartons of spices.`;
                        }
                        if (Math.random() < 0.2) {
                            const porcelain = Math.floor(Math.random() * 10);
                            goods.add('porcelain', porcelain);
                            logMsg += ` ${porcelain} cartons of porcelain.`;
                        }
                        if (Math.random() < 0.2) {
                            const tobacco = Math.floor(Math.random() * 5);
                            goods.add('tobacco', tobacco);
                            logMsg += ` ${tobacco} cartons of tobacco.`;
                        }
                        if (Math.random() < 0.2) {
                            const rum = Math.floor(Math.random() * 5);
                            goods.add('rum', rum);
                            logMsg += ` ${water} barrels of water.`;
                        }

                        if (Math.random() < 0.5) {
                            const newCrew = Math.floor(Math.random() * 10);
                            staff.add(newCrew);
                            logMsg += ` ${newCrew} crew members joined you.`;
                        }

                        staff.decreaseMood(staffMoodLoss);
                        staff.decreaseHealth(staffHealthLoss);

                        ship.health = shipHealth;

                        log.add(logMsg);
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
        cannons: $ships.reduce((sum, ship) => (sum += ship.cannons), 0)
    };
});

syncState('ships', ships, initValue, () => {
    return getRandomShip('brig').then(newShip => {
        return [newShip];
    });
}).then(value => ships.updateAll(value));

let checkMissionsCounter = 0;

ticker.subscribe(value => {
    checkMissionsCounter++;

    if (checkMissionsCounter >= 20) {
        // Dont' check to often
        ships.checkMissions();
        checkMissionsCounter = 0;
    }
});
