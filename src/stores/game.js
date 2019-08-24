import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';
import { getRouteFromPath } from '../utils/url';

const tableName = 'game';

const initValue = {
    route: {
        page: 'start',
        id: 0
    },
    loading: false,
    loaded: false,
    started: false
};

const acceptedRoutePages = ['general', 'properties', 'staff', 'goods'];

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

getStateFromDb(tableName)
    .then(value => {
        // Successfully got game state from persistant store
        let newValue = { ...value, loaded: true };

        const routeFromUrl = getRouteFromPath();

        if (value.route.page !== routeFromUrl.page || value.route.id !== routeFromUrl.id) {
            // If the URL doesn't match current route, change route (direct opening a link)
            value.route.page = routeFromUrl.page;
            value.route.id = routeFromUrl.id;
        }

        game.updateAll(newValue);
    })
    .catch(err => {
        let newValue = { ...initValue, loaded: true };
        game.updateAll(newValue);
    })
    .finally(() => {
        game.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
