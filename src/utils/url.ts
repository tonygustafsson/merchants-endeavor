import { base } from '$app/paths';

export const getUrl = (route: string): string => {
	return `${base}${route}`;
};
