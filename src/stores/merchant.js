import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { getRandomMerchant } from '../utils/merchant';

const tableName = 'merchant';

const initValue = {
    name: '',
    gender: '',
    nationality: '',
    doubloons: 1000
};

const merchantStore = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        changeName: newName => {
            update(merchant => ({ ...merchant, name: newName }));
        },
        changeGender: newGender => {
            update(merchant => ({ ...merchant, gender: newGender }));
        },
        changeNationality: newNationality => {
            update(merchant => ({ ...merchant, nationality: newNationality }));
        },
        setDoubloons: doubloons => {
            update(merchant => ({ ...merchant, doubloons: doubloons }));
        },
        addDoubloons: doubloons => {
            update(merchant => ({ ...merchant, doubloons: merchant.doubloons + doubloons }));
        },
        subtractDoubloons: doubloons => {
            update(merchant => {
                if (merchant.doubloons - doubloons < 0) return { ...merchant };

                return { ...merchant, doubloons: merchant.doubloons - doubloons };
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
        const newValue = Object.assign(initValue, randomMerchant);
        merchant.updateAll(newValue);
    })
    .finally(() => {
        merchant.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
