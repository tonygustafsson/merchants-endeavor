import { writable } from 'svelte/store';
import { syncState } from '../utils/stateSync';
import { types } from '../constants/goods';
import { merchant } from './merchant';

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
                if (Object.hasOwnProperty.call(types, item)) {
                    let price = types[item].price;

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

                if (Object.hasOwnProperty.call(types, item)) {
                    let worth = types[item].price;
                    merchant.addDoubloons(worth);
                    return { ...goods, [item]: goods[item] - quantity };
                }

                return { ...goods };
            });
        }
    };
};

export const goods = goodsStore();

syncState('goods', goods, initValue).then(value => goods.updateAll(value));
