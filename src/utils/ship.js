import { getRandomLineFromFile } from './fileReader';
import { getRandomId } from './string';

export const shipTypes = {
    brig: {
        name: 'Brig',
        loadCapacity: 500,
        crewMin: 2,
        crewMax: 20,
        cannonsMin: 4,
        cannonsMax: 10,
        price: 1500
    },
    merchantman: {
        name: 'Merchantman',
        loadCapacity: 1000,
        crewMin: 1,
        crewMax: 10,
        cannonsMin: 2,
        cannonsMax: 0,
        price: 1000
    },
    galleon: {
        name: 'Galleon',
        loadCapacity: 300,
        crewMin: 4,
        crewMax: 50,
        cannonsMin: 8,
        cannonsMax: 25,
        price: 4000
    },
    frigate: {
        name: 'Frigate',
        loadCapacity: 600,
        crewMin: 8,
        crewMax: 50,
        cannonsMin: 25,
        cannonsMax: 50,
        price: 10000
    }
};

export const getRandomShip = shipType => {
    return getRandomLineFromFile('../lists/shipNames.txt')
        .then(shipName => {
            const ship = {
                id: getRandomId(32),
                name: shipName,
                type: shipType,
                health: 100,
                crewMembers: 0,
                cannons: 0,
                onMission: false
            };

            return ship;
        })
        .catch(err => {
            alert('Could not create ship...');
        });
};
