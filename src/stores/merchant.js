import { writable, get } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { getRandomMerchant } from '../utils/merchant';
import { ticker } from './ticker';
import cloneDeep from 'lodash-es/cloneDeep';
import { getRandomId } from '../utils/string';

const tableName = 'merchant';

const initValue = {
    name: '',
    gender: '',
    nationality: '',
    doubloons: 1000,
    loans: []
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
        },
        takeLoan: sum => {
            update(merchant => {
                const newMerchant = cloneDeep(merchant);
                const $ticker = get(ticker);

                const newLoan = {
                    id: getRandomId(32),
                    tick: $ticker,
                    sum: sum
                };

                newMerchant.loans.push(newLoan);
                newMerchant.doubloons += sum;

                return newMerchant;
            });
        },
        repayLoan: id => {
            update(merchant => {
                const newMerchant = cloneDeep(merchant);
                const loan = newMerchant.loans.find(loan => loan.id === id);

                if (!loan) return newMerchant;

                const $ticker = get(ticker);
                const ticksSinceLoan = $ticker - loan.tick;
                const interest = Math.floor(loan.sum * (ticksSinceLoan * 0.00005));
                const totalSum = loan.sum + interest;

                newMerchant.loans = newMerchant.loans.filter(loan => loan.id !== id);
                newMerchant.doubloons -= totalSum;

                return newMerchant;
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
