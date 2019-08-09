import { writable } from 'svelte/store';
import { getValue, setValue } from '../persistantState';

const persistantStoreName = 'goods';
const initValue = {
    doubloons: 100,
    food: 50,
    water: 100,
    spices: 0,
    porcelain: 0
};

function goodsStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        add: (item, quantity) => {
            update(n => {
                n[item] = n[item] + quantity;
                setValue(persistantStoreName, n);
                return n;
            });
        },
        remove: (item, quantity) => {
            update(n => {
                n[item] = n[item] - quantity > 0 ? n[item] - quantity : 0;
                setValue(persistantStoreName, n);
                return n;
            });
        }
    };
}

export const goods = goodsStore();
