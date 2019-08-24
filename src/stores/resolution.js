import { writable } from 'svelte/store';

const isMobile = screenWidth => screenWidth < 1000;

const initValue = {
    mobile: isMobile(window.innerWidth)
};

const resolutionStore = () => {
    const { subscribe, update } = writable(initValue);

    return {
        subscribe,
        changeMobile: isMobile => {
            update(resolution => ({ ...resolution, mobile: isMobile }));
        }
    };
};

export const resolution = resolutionStore();

window.addEventListener('resize', e => {
    resolution.changeMobile(isMobile(e.target.innerWidth));
});
