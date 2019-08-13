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
    return new Promise((resolve, reject) => {
        fetch('../lists/shipnames.txt')
            .then(data => {
                return data.text();
            })
            .then(shipList => {
                const shipNames = shipList.split('\n');
                const chosenShipName = shipNames[Math.floor(Math.random() * Math.floor(shipNames.length))];

                const ship = {
                    id: getRandomShipId(32),
                    name: chosenShipName,
                    type: getRandomShipType(),
                    health: 100,
                    onMission: false
                };

                resolve(ship);
            })
            .catch(err => {
                alert('Could not create ship...');
            });
    });
};
