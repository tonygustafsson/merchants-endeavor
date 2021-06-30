import { Writable, writable } from 'svelte/store';
import { duration } from '../constants/notifications';
import type { Notifications } from '../types/notification';

const initValue: Notifications = [];

const notificationsStore = () => {
	const { subscribe, update, set }: Writable<Notifications> = writable(initValue);

	return {
		subscribe,
		add: notification => {
			update(notifications => {
				const newNotifications = [...notifications];
				newNotifications.push(notification);
				return newNotifications;
			});
		},
		clear: () => {
			set(initValue);
		}
	};
};

export const notifications = notificationsStore();

let timer = null;

notifications.subscribe(value => {
	// Do nothing for removal of notifications
	if (value.length < 1) return;

	clearTimeout(timer);

	timer = setTimeout(() => {
		notifications.clear();
	}, duration);
});
