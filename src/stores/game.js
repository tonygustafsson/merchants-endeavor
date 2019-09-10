import { writable, get } from 'svelte/store';
import { syncState } from '../utils/db';
import { getRouteFromPath } from '../utils/url';

const initValue = {
    route: {
        page: 'start',
        id: 0
    },
    loading: false,
    loaded: false,
    started: false
};

const acceptedRoutePages = ['logs', 'inventory', 'properties', 'staff', 'goods'];

const gameStore = () => {
    const { subscribe, set, update } = writable(initValue);

    return {
        subscribe,
        updateAll: data => {
            set(data);
        },
        setLoading: isLoading => {
            update(game => {
                return { ...game, loading: isLoading };
            });
        },
        startPlaying: () => {
            update(game => {
                return { ...game, started: true };
            });
        },
        changeRoute: (page, id = 0, pushState = true) => {
            if (!acceptedRoutePages.includes(page)) return { ...game };

            update(game => {
                return {
                    ...game,
                    route: {
                        page: page,
                        id: id
                    }
                };
            });

            if (!pushState) return;

            if (id !== 0) {
                window.history.pushState({}, page, `/${page}/${id}`);
            } else {
                window.history.pushState({}, page, `/${page}`);
            }
        }
    };
};

export const game = gameStore();

window.addEventListener('popstate', () => {
    // Listen for changed URL (back/forward in browser) and change route if needed
    const routeFromUrl = getRouteFromPath();
    game.changeRoute(routeFromUrl.page, routeFromUrl.id, false);
});

syncState('game', game, initValue, () => {
    return { loaded: true };
}).then($game => {
    // Store is loaded
    let newValue = { ...$game, loaded: true };

    const routeFromUrl = getRouteFromPath();

    if (newValue.route.page !== routeFromUrl.page || newValue.route.id !== routeFromUrl.id) {
        // If the URL doesn't match current route, change route (direct opening a link)
        newValue.route.page = routeFromUrl.page;
        newValue.route.id = routeFromUrl.id;
    }

    // On page load, loading should be resetted
    newValue.loading = false;

    game.updateAll(newValue);
});
