import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { goodsInfo } from '../utils/goods';

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

const goodsStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            update(goods => data);
        },
        add: (item, quantity) => {
            update(goods => {
                if (Object.hasOwnProperty.call(goodsInfo, item)) {
                    let price = goodsInfo[item].price;

                    if (price > goods.doubloons) {
                        alert('Not enough money!');
                        return goods;
                    }

                    goods.doubloons -= price;
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

                if (Object.hasOwnProperty.call(goodsInfo, item)) {
                    let worth = goodsInfo[item].worth;
                    goods.doubloons += worth;
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
