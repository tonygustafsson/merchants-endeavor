import { get } from 'svelte/store';
import { resolution } from '../stores/resolution';

const $resolution = get(resolution);

const defaultRoutePage = $resolution.mobile ? 'inventory' : 'properties';

const getPathSegments = () => {
    const path = window.location.pathname.substr(1);
    return path === '' ? [defaultRoutePage] : path.split('/');
};

export const getRouteFromPath = () => {
    const pathSegments = getPathSegments();

    return {
        page: pathSegments[0],
        id: pathSegments.length > 1 && pathSegments[1] !== '' ? pathSegments[1] : 0
    };
};
