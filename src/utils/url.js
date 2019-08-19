const defaultRoutePage = 'general';

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
