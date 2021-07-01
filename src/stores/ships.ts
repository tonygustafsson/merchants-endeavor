import { Writable, writable, derived, get } from 'svelte/store';
import cloneDeep from 'lodash.clonedeep';
import { ticker } from './ticker';
import { goods } from './goods';
import { merchant } from './merchant';
import { staff } from './staff';
import { log } from './log';
import { getRandomShip } from '../utils/ships';
import type { Ships } from '../types/ship';
import {
	maxShips,
	missionLength,
	missionDoubloonsReward,
	missionWaterReward,
	missionPorcelainReward,
	missionSpicesReward,
	missionTobaccoReward,
	missionRumReward,
	missionCrewJoinReward,
	missionShipHealthLoss,
	missionCrewMoodLoss,
	missionCrewHealthLoss,
	missionFoodReward,
	missionTickCheck
} from '../constants/ships';
import { syncState } from '../utils/stateSync';

const initValue: Ships = [];

const shipsStore = () => {
	const { subscribe, set, update }: Writable<Ships> = writable(initValue);

	return {
		subscribe,
		updateAll: data => {
			set(data);
		},
		addShip: newShip => {
			update(ships => {
				if (ships.length + 1 > maxShips) return cloneDeep(ships);

				const newShips = cloneDeep(ships);
				newShips.push(newShip);

				return newShips;
			});
		},
		removeShip: id => {
			update(ships => {
				if (ships.length - 1 < 0) return cloneDeep(ships);

				let newShips = cloneDeep(ships);
				newShips = newShips.filter(ship => ship.id !== id);

				return newShips;
			});
		},
		setName: (id, newName) => {
			update(ships => {
				const newShips = cloneDeep(ships);

				const ship = newShips.find(ship => ship.id === id);
				ship.name = newName;

				return newShips;
			});
		},
		repair: id => {
			update(ships => {
				const newShips = cloneDeep(ships);

				const ship = newShips.find(ship => ship.id === id);
				ship.health = 100;

				return newShips;
			});
		},
		changeItemsOnboard: (id, item, value) => {
			const approvedItems = ['crewMembers', 'cannons'];
			if (!approvedItems.includes(item)) return;

			update(ships => {
				const newShips = cloneDeep(ships);

				const ship = newShips.find(ship => ship.id === id);
				ship[item] = value;

				return newShips;
			});
		},
		sendOnMission: id => {
			update(ships => {
				const newShips = cloneDeep(ships);

				const $ticker = get(ticker);

				const ship = newShips.find(ship => ship.id === id);
				ship.onMission = $ticker + missionLength;

				return newShips;
			});
		},
		checkMissions: () => {
			update(ships => {
				if (ships.length < 1) return cloneDeep(ships);

				const newShips = cloneDeep(ships);

				newShips.map(ship => {
					const $ticker = get(ticker);

					if (ship.onMission !== false && ship.onMission < $ticker) {
						// Back from mission
						ship.onMission = false;

						// Get rewards
						const doubloons = Math.floor(Math.random() * missionDoubloonsReward);
						const shipHealth = ship.health - Math.floor(Math.random() * missionShipHealthLoss);
						const staffMoodLoss = Math.floor(Math.random() * missionCrewMoodLoss);
						const staffHealthLoss = Math.floor(Math.random() * missionCrewHealthLoss);

						let logMsg = `Your ${ship.type} ${ship.name} returned from her mission. You collected ${doubloons} dbl.`;

						merchant.addDoubloons(doubloons);

						if (Math.random() < 0.5) {
							const food = Math.floor(Math.random() * missionFoodReward);
							goods.add('food', food);
							logMsg += ` ${food} cartons of food.`;
						}
						if (Math.random() < 0.5) {
							const water = Math.floor(Math.random() * missionWaterReward);
							goods.add('water', water);
							logMsg += ` ${water} barrels of water.`;
						}
						if (Math.random() < 0.2) {
							const spices = Math.floor(Math.random() * missionSpicesReward);
							goods.add('spices', spices);
							logMsg += ` ${spices} cartons of spices.`;
						}
						if (Math.random() < 0.2) {
							const porcelain = Math.floor(Math.random() * missionPorcelainReward);
							goods.add('porcelain', porcelain);
							logMsg += ` ${porcelain} cartons of porcelain.`;
						}
						if (Math.random() < 0.2) {
							const tobacco = Math.floor(Math.random() * missionTobaccoReward);
							goods.add('tobacco', tobacco);
							logMsg += ` ${tobacco} cartons of tobacco.`;
						}
						if (Math.random() < 0.2) {
							const rum = Math.floor(Math.random() * missionRumReward);
							goods.add('rum', rum);
							logMsg += ` ${rum} barrels of water.`;
						}

						if (Math.random() < 0.5) {
							const newCrew = Math.floor(Math.random() * missionCrewJoinReward);
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

ticker.subscribe(() => {
	checkMissionsCounter++;

	if (checkMissionsCounter >= missionTickCheck) {
		// Dont' check to often
		ships.checkMissions();
		checkMissionsCounter = 0;
	}
});
