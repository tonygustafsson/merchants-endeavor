import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { goodsInfo } from '../utils/goods';
import { merchant } from './merchant';

const tableName = 'goods';
const initValue = {
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
            set(data);
        },
        add: (item, quantity) => {
            update(goods => {
                return { ...goods, [item]: goods[item] + quantity };
            });
        },
        remove: (item, quantity) => {
            update(goods => {
                return { ...goods, [item]: goods[item] - quantity };
            });
        },
        buy: (item, quantity) => {
            update(goods => {
                if (Object.hasOwnProperty.call(goodsInfo, item)) {
                    let price = goodsInfo[item].price;

                    if (price > merchant.doubloons) {
                        alert('Not enough money!');
                        return goods;
                    }

                    merchant.subtractDoubloons(price);
                    return { ...goods, [item]: goods[item] + quantity };
                }

                return { ...goods };
            });
        },
        sell: (item, quantity) => {
            update(goods => {
                if (quantity > goods[item]) {
                    return goods;
                    alert('Not enough ' + item);
                }

                if (Object.hasOwnProperty.call(goodsInfo, item)) {
                    let worth = goodsInfo[item].price;
                    merchant.addDoubloons(worth);
                    return { ...goods, [item]: goods[item] - quantity };
                }

                return { ...goods };
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
