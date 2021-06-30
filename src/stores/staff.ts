import { Writable, writable } from 'svelte/store';
import { ticker } from './ticker';
import { log } from './log';
import { maxStaff, hireTimeLength, hireNewStaff, hireStaffTickCheck } from '../constants/staff';
import { syncState } from '../utils/stateSync';
import type { Staff } from '../types/staff';

const initValue: Staff = {
	members: 4,
	health: 100,
	mood: 100,
	hireRequestActive: false
};

let currentTick = 0;

const staffStore = () => {
	const { subscribe, set, update }: Writable<Staff> = writable(initValue);

	return {
		subscribe,
		updateAll: data => {
			set(data);
		},
		add: additionalStaff => {
			update(staff => {
				if (staff.members + additionalStaff > maxStaff) return { ...staff };
				return { ...staff, members: staff.members + additionalStaff };
			});
		},
		remove: removedStaff => {
			update(staff => {
				if (staff.members - removedStaff < 0) return { ...staff };
				return { ...staff, members: staff.members - removedStaff };
			});
		},
		requestHire: () => {
			update(staff => {
				const hireTickFinished = currentTick + hireTimeLength;

				return { ...staff, hireRequestActive: hireTickFinished };
			});
		},
		checkForHireApprovals: () => {
			update(staff => {
				if (staff.hireRequestActive !== false && staff.hireRequestActive < currentTick) {
					// Hirering process finished
					const newStaffMembers = Math.floor(Math.random() * hireNewStaff);

					log.add(
						`The hiring process has finished and you've got ${newStaffMembers} new staff members.`
					);

					return { ...staff, hireRequestActive: false, members: staff.members + newStaffMembers };
				}

				return { ...staff };
			});
		},
		restoreMood: () => {
			update(staff => {
				if (staff.mood < 0) return { ...staff };
				return { ...staff, mood: 100 };
			});
		},
		decreaseMood: moodLoss => {
			update(staff => {
				if (staff.mood < 0) return { ...staff };
				return { ...staff, mood: staff.mood - moodLoss };
			});
		},
		restoreHealth: () => {
			update(staff => {
				if (staff.health < 0) return { ...staff };
				return { ...staff, health: 100 };
			});
		},
		decreaseHealth: healthLoss => {
			update(staff => {
				if (staff.health < 0) return { ...staff };
				return { ...staff, health: staff.health - healthLoss };
			});
		}
	};
};

export const staff = staffStore();

syncState('staff', staff, initValue).then(value => staff.updateAll(value));

let checkHireCounter = 0;

ticker.subscribe(value => {
	checkHireCounter++;

	if (checkHireCounter >= hireStaffTickCheck) {
		// Don't check to often
		currentTick = value;
		staff.checkForHireApprovals();
		checkHireCounter = 0;
	}
});
