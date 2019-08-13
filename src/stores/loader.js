import { writable } from 'svelte/store';

const loaderStore = () => {
    const { subscribe, set } = writable(false);

    return {
        subscribe,
        setLoading: isLoading => {
            set(isLoading);
        }
    };
};

export const loader = loaderStore();
