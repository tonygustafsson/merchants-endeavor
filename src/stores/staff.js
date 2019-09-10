import { writable } from 'svelte/store';
import { ticker } from './ticker';
import { log } from './log';
import { syncState } from '../utils/db';

const initValue = {
    members: 4,
    health: 100,
    mood: 100,
    hireRequestActive: false
};
const minValue = 0;
const maxValue = 20;

let currentTick = 0;
const hireTickTime = 10;

const staffStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        add: additionalStaff => {
            update(staff => {
                if (staff.members + additionalStaff > maxValue) return { ...staff };
                return { ...staff, members: staff.members + additionalStaff };
            });
        },
        remove: removedStaff => {
            update(staff => {
                if (staff.members - removedStaff < minValue) return { ...staff };
                return { ...staff, members: staff.members - removedStaff };
            });
        },
        requestHire: () => {
            update(staff => {
                const hireTickFinished = currentTick + hireTickTime;

                return { ...staff, hireRequestActive: hireTickFinished };
            });
        },
        checkForHireApprovals: () => {
            update(staff => {
                if (staff.hireRequestActive !== false && staff.hireRequestActive < currentTick) {
                    // Hirering process finished
                    const newStaffMembers = Math.floor(Math.random() * 10);

                    log.add(`The hiring process has finished and you've got ${newStaffMembers} new staff members.`);

                    return { ...staff, hireRequestActive: false, members: staff.members + newStaffMembers };
                }

                return { ...staff };
            });
        },
        restoreMood: moodBoost => {
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
        restoreHealth: healthBoost => {
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

syncState('staff', staff, initValue);

let checkHireCounter = 0;

ticker.subscribe(value => {
    checkHireCounter++;

    if (checkHireCounter >= 20) {
        // Don't check to often
        currentTick = value;
        staff.checkForHireApprovals();
        checkHireCounter = 0;
    }
});
