import { writable } from 'svelte/store';
import { mobileMaxWidth } from '../constants/resolution';

const isMobile = screenWidth => screenWidth < mobileMaxWidth;

const initValue = {
	mobile: isMobile(typeof window !== 'undefined' ? window.innerWidth : false)
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

if (typeof window !== 'undefined') {
	window.addEventListener('resize', (e: any) => {
		resolution.changeMobile(isMobile(e.target.innerWidth));
	});
}
