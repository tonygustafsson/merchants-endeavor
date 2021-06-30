import { syncState } from '../utils/stateSync';
import { Writable, writable } from 'svelte/store';
import type { Game } from '../types/game';

const initValue: Game = {
	loading: false,
	loaded: false,
	started: false
};

const gameStore = () => {
	const { subscribe, set, update }: Writable<Game> = writable(initValue);

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
		}
	};
};

export const game = gameStore();

syncState('game', game, initValue, () => {
	return { loaded: true };
}).then(state => {
	// Store is loaded
	const newState = { ...state, loaded: true, loading: false };

	game.updateAll(newState);
});
