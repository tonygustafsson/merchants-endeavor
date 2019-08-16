import { writable } from 'svelte/store';
import { getStateFromDb, saveStateToDb } from '../utils/db';

const tableName = 'game';

const initValue = {
    route: 'start',
    loading: false,
    loaded: false
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
