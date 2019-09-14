import { writable, get } from 'svelte/store';
import { time } from './time.js';
import { duration } from '../constants/notifications';

const initValue = [];

const notificationsStore = () => {
    const { subscribe, update, set } = writable(initValue);

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
