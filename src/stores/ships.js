import { writable } from 'svelte/store';
import { ticker } from './ticker';
import { goods } from './goods';
import { getValue, setValue } from '../persistantState';

let currentTick = 0;
const missionLength = 10;

const shipNames = [
    'Horrid Rift',
    'Howling Serpent',
    'Captains Tortuga',
    'Evil Rambler',
    'Howl of the Buccaneers',
    'The Sea Doubloon',
    'Murderous Storm',
    'Howling Plunderer',
    'Rude James',
    'Angry Night'
];
const getRandomShipName = () => shipNames[Math.floor(Math.random() * shipNames.length)];

const shipTypes = ['Sloop', 'Brig', 'Merchantman', 'Galleon', 'Frigate'];
const getRandomShipType = () => shipTypes[Math.floor(Math.random() * shipTypes.length)];

const getRandomShipId = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const getRandomShip = () => {
    return {
        id: getRandomShipId(32),
        name: getRandomShipName(),
        type: getRandomShipType(),
        health: 100,
        onMission: false
    };
};

const persistantStoreName = 'ships';
const initValue = {
    ships: [getRandomShip()]
};
const minValue = 0;
const maxValue = 10;

function shipsStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        addShip: () => {
            update(n => {
                if (n.ships.length + 1 > maxValue) return n;

                const newShip = getRandomShip();
                n.ships.push(newShip);

                setValue(persistantStoreName, n);

                return n;
            });
        },
        removeShip: id => {
            update(n => {
                if (n.ships.length - 1 < minValue) return n;
                n.ships = n.ships.filter(ship => ship.id !== id);

                setValue(persistantStoreName, n);

                return n;
            });
        },
        sendOnMission: id => {
            update(n => {
                let ship = n.ships.find(ship => ship.id === id);
                ship.onMission = currentTick + missionLength;

                setValue(persistantStoreName, n);

                return n;
            });
        },
        checkMissions: () => {
            update(n => {
                n.ships.map(ship => {
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
