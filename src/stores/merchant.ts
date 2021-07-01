import { Writable, writable, get } from 'svelte/store';
import { syncState } from '../utils/stateSync';
import { getRandomMerchant } from '../utils/merchant';
import { ticker } from './ticker';
import cloneDeep from 'lodash.clonedeep';
import { getRandomId } from '../utils/string';
import type { Merchant } from '../types/merchant';

const initValue: Merchant = {
	name: '',
	gender: '',
	nationality: '',
	town: '',
	doubloons: 1000,
	loans: []
};

const merchantStore = () => {
	const { subscribe, set, update }: Writable<Merchant> = writable(initValue);

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
		changeTown: newTown => {
			update(merchant => ({ ...merchant, town: newTown }));
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

syncState('merchant', merchant, initValue, () => {
	return getRandomMerchant();
}).then(value => merchant.updateAll(value));
