import { getRandomId } from './string';
import randomShipNames from '../lists/shipNames';
import type { Ship } from '../types/ship';

export const getRandomShip = (shipType: string): Ship => {
	const shipName = randomShipNames[Math.floor(Math.random() * randomShipNames.length)];

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
};
