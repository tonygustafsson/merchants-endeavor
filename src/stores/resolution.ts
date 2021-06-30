import { Writable, writable } from 'svelte/store';
import { mobileMaxWidth } from '../constants/resolution';
import type { Resolution } from '../types/resolution';

const isMobile = screenWidth => screenWidth < mobileMaxWidth;

const initValue = {
	mobile: isMobile(typeof window !== 'undefined' ? window.innerWidth : false)
};

const resolutionStore = () => {
	const { subscribe, update }: Writable<Resolution> = writable(initValue);

	return {
		subscribe,
		changeMobile: isMobile => {
			update(resolution => ({ ...resolution, mobile: isMobile }));
		}
	};
};

export const resolution = resolutionStore();

if (typeof window !== 'undefined') {
	window.addEventListener('resize', (e: CustomEvent<Window>) => {
		const target = e.target as Window;
		resolution.changeMobile(isMobile(target.innerWidth));
	});
}
