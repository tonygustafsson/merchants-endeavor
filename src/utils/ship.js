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

export const getRandomShip = () => {
    return {
        id: getRandomShipId(32),
        name: getRandomShipName(),
        type: getRandomShipType(),
        health: 100,
        onMission: false
    };
};
