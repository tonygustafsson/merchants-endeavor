import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { getRandomMerchant } from '../utils/merchant';

const tableName = 'merchant';

const merchantStore = () => {
    const { subscribe, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            update(merchant => data);
        },
        changeName: newName => {
            update(merchant => {
                merchant.name = newName;
                return merchant;
            });
        },
        addDoubloons: doubloons => {
            update(merchant => {
                merchant.doubloons += doubloons;
                return merchant;
            });
        },
        subtractDoubloons: doubloons => {
            update(merchant => {
                if (merchant.doubloons - doubloons < 0) return merchant;

                merchant.doubloons -= doubloons;
                return merchant;
            });
        }
    };
};

export const merchant = merchantStore();

getStateFromDb(tableName)
    .then(value => {
        merchant.updateAll(value);
    })
    .catch(err => {
        const randomMerchant = getRandomMerchant();
        merchant.updateAll(randomMerchant);
    })
    .finally(() => {
        merchant.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
