import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'goods';
const initValue = {
    doubloons: 100,
    cannons: 4,
    food: 50,
    water: 100,
    spices: 0,
    porcelain: 0,
    tobacco: 0,
    rum: 0
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

const goodsStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            update(goods => data);
        },
        add: (item, quantity) => {
            update(goods => {
                if (Object.hasOwnProperty.call(pricing, item)) {
                    let cost = pricing[item].buy;

                    if (cost > goods.doubloons) {
                        alert('Not enough money!');
                        return goods;
                    }

                    goods.doubloons -= cost;
                }

                goods[item] = goods[item] + quantity;
                return goods;
            });
        },
        remove: (item, quantity) => {
            update(goods => {
                if (quantity > goods[item]) {
                    return goods;
                    alert('Not enough ' + item);
                }

                if (Object.hasOwnProperty.call(pricing, item)) {
                    let profit = pricing[item].sell;
                    goods.doubloons += profit;
                }

                goods[item] -= quantity;
                return goods;
            });
        }
    };
};

export const goods = goodsStore();

getStateFromDb(tableName)
    .then(value => {
        goods.updateAll(value);
    })
    .catch(err => {
        goods.updateAll(initValue);
    })
    .finally(() => {
        goods.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
