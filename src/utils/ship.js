import { getRandomLineFromFile } from './fileReader';

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

export const getRandomShip = () => {
    return getRandomLineFromFile('../lists/shipNames.txt')
        .then(shipName => {
            const ship = {
                id: getRandomShipId(32),
                name: shipName,
                type: getRandomShipType(),
                health: 100,
                onMission: false
            };

            return ship;
        })
        .catch(err => {
            alert('Could not create ship...');
        });
};
