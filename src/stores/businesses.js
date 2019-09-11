import { writable, derived, get } from 'svelte/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { ticker } from './ticker';
import { goods } from './goods';
import { merchant } from './merchant';
import { staff } from './staff';
import { log } from './log';
import { getRandomBusiness } from '../utils/business';
import { syncState } from '../utils/stateSync';

const initValue = [];
const minValue = 0;
const maxValue = 10;

const businessesStore = () => {
    const { subscribe, set, update } = writable(initValue);

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        add: newBusiness => {
            update(businesses => {
                if (businesses.length + 1 > maxValue) return cloneDeep(businesses);

                let newBusinesses = cloneDeep(businesses);
                newBusinesses.push(newBusinesses);

                return newBusinesses;
            });
        },
        remove: id => {
            update(businesses => {
                if (businesses.length - 1 < minValue) return cloneDeep(businesses);

                let newBusinesses = cloneDeep(businesses);
                newBusinesses = newBusinesses.filter(bus => bus.id !== id);

                return newBusinesses;
            });
        },
        setName: (id, newName) => {
            update(businesses => {
                let newBusinesses = cloneDeep(businesses);

                let business = newBusinesses.find(bus => bus.id === id);
                business.name = newName;

                return newBusinesses;
            });
        }
    };
};

export const businesses = businessesStore();

syncState('businesses', businesses, initValue).then(value => businesses.updateAll(value));
