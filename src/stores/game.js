import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'game';

const initValue = {
    route: 'start',
    loading: false
};

const acceptedRoutes = ['stats', 'properties', 'goods'];

const gameStore = () => {
    const { subscribe, update } = writable(initValue);

    return {
        subscribe,
        updateAll: data => {
            update(game => data);
        },
        setLoading: isLoading => {
            update(game => {
                game.loading = isLoading;
                return game;
            });
        },
        changeRoute: route => {
            if (!acceptedRoutes.includes(route)) return game;

            update(game => {
                game.route = route;
                return game;
            });
        }
    };
};

export const game = gameStore();

getStateFromDb(tableName)
    .then(value => {
        game.updateAll(value);
    })
    .catch(err => {
        game.updateAll(initValue);
    })
    .finally(() => {
        game.subscribe(value => {
            saveStateToDb(tableName, value);
        });
    });
