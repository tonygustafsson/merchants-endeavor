import { getRandomLineFromFile } from './fileReader';
import { getRandomId } from './string';
import type { Ship } from '../types/ship';

export const getRandomShip = (shipType: string): Promise<Ship> => {
	return getRandomLineFromFile('../lists/shipNames.json').then((shipName: string) => {
		const ship: Ship = {
			id: getRandomId(32),
			name: shipName,
			type: shipType,
			health: 100,
			crewMembers: 0,
			cannons: 0,
			onMission: false
		};

		return ship;
	});
};
