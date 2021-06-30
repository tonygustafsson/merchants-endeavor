import { Writable, writable } from 'svelte/store';
import { time } from './time';
import { notifications } from './notifications';
import { syncState } from '../utils/stateSync';
import { maxItems } from '../constants/logs';
import type { Logs } from '../types/log';

const initValue: Logs = [];

let currentTime;
let currentRealTime;

time.subscribe(value => {
	currentTime = value.now;
	currentRealTime = value.realTime;
});

const logStore = () => {
	const { subscribe, set, update }: Writable<Logs> = writable(initValue);

	return {
		subscribe,
		updateAll: data => {
			set(data);
		},
		add: (entry, notify = true) => {
			update(logs => {
				const newLogs = [...logs];
				const item = {
					time: currentTime,
					realTime: currentRealTime,
					entry: entry
				};
				newLogs.unshift(item);

				if (newLogs.length > maxItems) {
					newLogs.pop();
				}

				if (notify) {
					notifications.add(entry);
				}

				return newLogs;
			});
		}
	};
};

export const log = logStore();

syncState('log', log, initValue).then(value => log.updateAll(value));
