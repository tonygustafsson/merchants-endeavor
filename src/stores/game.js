import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'game';

const initValue = {
    route: 'start',
    loading: false
};

const acceptedRoutes = ['stats', 'properties', 'goods'];

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
        changeRoute: route => {
            if (!acceptedRoutes.includes(route)) return game;

            update(game => {
                return { ...game, route: route };
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
