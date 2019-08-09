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

const pricing = {
    food: {
        buy: 15,
        sell: 10
    },
    water: {
        buy: 10,
        sell: 7
    }
};

function goodsStore() {
    const storageValue = getValue(persistantStoreName, initValue);

    const { subscribe, set, update } = writable(storageValue);

    return {
        subscribe,
        add: (item, quantity) => {
            update(n => {
                if (Object.hasOwnProperty.call(pricing, item)) {
                    let cost = pricing[item].buy;

                    if (cost > n.doubloons) {
                        return alert('Not enough money!');
                    }

                    n.doubloons -= cost;
                }

                n[item] = n[item] + quantity;
                setValue(persistantStoreName, n);
                return n;
            });
        },
        remove: (item, quantity) => {
            update(n => {
                if (quantity > n[item]) {
                    return alert('Not enough ' + item);
                }

                if (Object.hasOwnProperty.call(pricing, item)) {
                    let profit = pricing[item].sell;
                    n.doubloons += profit;
                }

                n[item] -= quantity;
                setValue(persistantStoreName, n);
                return n;
            });
        }
    };
}

export const goods = goodsStore();
