import { getRandomLineFromFile } from './fileReader';
import { getRandomId } from './string';

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
                onMission: false,
                town: ''
            };

            return ship;
        })
        .catch(err => {
            alert('Could not create ship...');
        });
};
