import type { Writable, Readable } from 'svelte/store';
import localforage from 'localforage';
import cloneDeep from 'lodash-ts/cloneDeep';

localforage.config({
	name: `Merchant's Endeavor`,
	storeName: 'game'
});

const saveStateToDb = async (table, state) => {
	if (typeof window !== 'undefined') {
		localforage
			.ready()
			.then(() => {
				localforage.setItem(table, state);
			})
			.catch(err => console.error(err));
	}
};

const getStateFromDb = async (table: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (typeof window !== 'undefined') {
			localforage
				.ready()
				.then(() => {
					localforage
						.getItem(table)
						.then((value: string) => {
							if (value) {
								resolve(value);
							}

							reject('Not stored');
						})
						.catch(err => {
							reject(err);
						});
				})
				.catch(err => reject(err));
		}
	});
};

const mixDefaultValueWithState = (defaultValue, stateValue) => {
	// Adds state values to the default one, can add new defaultValues if state is missing them
	if (typeof defaultValue === 'object') {
		return Object.assign(defaultValue, stateValue);
	}

	return stateValue;
};

const calcDefaultValues = (defaultValueAdder, defaultValue) => {
	// Sometimes the default values has to be calculated first time, but not if state exists
	if (defaultValueAdder && typeof defaultValueAdder === 'function') {
		return Promise.resolve(defaultValueAdder()).then(extras => {
			// Resolves the extra data, add it to defaultValue and update store
			return mixDefaultValueWithState(defaultValue, extras);
		});
	}

	return defaultValue;
};

export const syncState = (
	tableName: string,
	store: Writable<any> | Readable<any>,
	defaultValue: any,
	defaultValueAdder?: () => void
): Promise<Promise<any>> => {
	return new Promise(resolve => {
		getStateFromDb(tableName)
			.then(stateValue => {
				// Got state from localForage
				return mixDefaultValueWithState(defaultValue, stateValue);
			})
			.catch(() => {
				// No state saved, calculate new state
				return calcDefaultValues(defaultValueAdder, defaultValue);
			})
			.then(state => {
				// Create subscriber that saves state to DB
				store.subscribe(value => {
					saveStateToDb(tableName, value);
				});

				resolve(cloneDeep(state));
			});
	});
};

export const clearDatabase = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		localforage
			.clear()
			.then(() => {
				resolve(console.log('Cleared database'));
			})
			.catch(err => {
				reject(console.error(err));
			});
	});
};
