import { Writable, writable, derived } from 'svelte/store';
import cloneDeep from 'lodash.clonedeep';
import { ticker } from './ticker';
import { log } from './log';
import { syncState } from '../utils/stateSync';
import type { Businesses } from '../types/business';
import {
	maxNumberOfBusinesses,
	chanceOfMakingProfit,
	profitValue,
	profitCheckFrequency
} from '../constants/businesses';

const initValue = [];

const businessesStore = () => {
	const { subscribe, set, update }: Writable<Businesses> = writable(initValue);

	return {
		subscribe,
		updateAll: data => {
			set(data);
		},
		add: newBusiness => {
			update(businesses => {
				if (businesses.length + 1 > maxNumberOfBusinesses) return businesses;

				const newBusinesses = cloneDeep(businesses);
				newBusinesses.push(newBusiness);

				return newBusinesses;
			});
		},
		remove: id => {
			update(businesses => {
				let newBusinesses = cloneDeep(businesses);
				newBusinesses = newBusinesses.filter(business => business.id !== id);

				return newBusinesses;
			});
		},
		setName: (id, newName) => {
			update(businesses => {
				const newBusinesses = cloneDeep(businesses);

				const business = newBusinesses.find(business => business.id === id);
				business.name = newName;

				return newBusinesses;
			});
		},
		changeStaff: (id, value) => {
			update(businesses => {
				const newBusinesses = cloneDeep(businesses);

				const business = newBusinesses.find(business => business.id === id);
				business.staff = value;

				return newBusinesses;
			});
		},
		checkProfit: () => {
			update(businesses => {
				if (businesses.length < 1) return businesses;

				const newBusiness = cloneDeep(businesses);

				newBusiness.map(business => {
					if (Math.random() > chanceOfMakingProfit) return;

					const profit = Math.floor(Math.random() * business.staff * profitValue);
					business.profit += profit;

					log.add(
						`Your ${business.type} ${business.name} just made ${profit} dbl in profit.`,
						false
					);
				});

				return newBusiness;
			});
		},
		takeProfit: id => {
			update(businesses => {
				const newBusinesses = cloneDeep(businesses);

				const business = newBusinesses.find(business => business.id === id);
				business.profit = 0;

				return newBusinesses;
			});
		}
	};
};

export const businesses = businessesStore();

export const businessTotals = derived(businesses, $businesses => {
	return {
		staff: $businesses.reduce((sum, business) => (sum += business.staff), 0)
	};
});

syncState('businesses', businesses, initValue).then(value => businesses.updateAll(value));

let checkProfitCounter = 0;

ticker.subscribe(() => {
	checkProfitCounter++;

	if (checkProfitCounter >= profitCheckFrequency) {
		// Dont' check to often
		businesses.checkProfit();
		checkProfitCounter = 0;
	}
});
