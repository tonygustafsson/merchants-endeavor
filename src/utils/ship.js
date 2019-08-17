import { getRandomLineFromFile } from './fileReader';

export const shipTypes = {
    brig: {
        name: 'Brig',
        loadCapacity: 500,
        crewMin: 2,
        crewMax: 20,
        cannonsMax: 10,
        price: 1500,
        worth: 750
    },
    merchantman: {
        name: 'Merchantman',
        loadCapacity: 1000,
        crewMin: 1,
        crewMax: 10,
        cannonsMax: 0,
        price: 1000,
        worth: 500
    },
    galleon: {
        name: 'Galleon',
        loadCapacity: 300,
        crewMin: 4,
        crewMax: 50,
        cannonsMax: 25,
        price: 4000,
        worth: 2000
    },
    frigate: {
        name: 'Frigate',
        loadCapacity: 600,
        crewMin: 8,
        crewMax: 50,
        cannonsMax: 50,
        price: 10000,
        worth: 5000
    }
};

const getRandomShipId = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getRandomShip = shipType => {
    return getRandomLineFromFile('../lists/shipNames.txt')
        .then(shipName => {
            const ship = {
                id: getRandomShipId(32),
                name: shipName,
                type: shipType,
                health: 100,
                crewMembers: 0,
                cannons: 0,
                food: 0,
                water: 0,
                onMission: false,
                showModal: false
            };

            return ship;
        })
        .catch(err => {
            alert('Could not create ship...');
        });
};
