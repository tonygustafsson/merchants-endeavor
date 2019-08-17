import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'game';

const initValue = {
    route: {
        page: 'start',
        id: 0
    },
    loading: false,
    loaded: false
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
        changeRoute: (page, id = 0) => {
            if (!acceptedRoutePages.includes(page)) return game;

            update(game => {
                return {
                    ...game,
                    route: {
                        page: page,
                        id: id
                    }
                };
            });

            if (id !== 0) {
                window.history.pushState({}, page, `/${page}/${id}`);
            } else {
                window.history.pushState({}, page, `/${page}`);
            }
        }
    };
};

export const game = gameStore();

getStateFromDb(tableName)
    .then(value => {
        let newValue = { ...value, loaded: true };
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
